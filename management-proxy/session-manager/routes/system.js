var request = require('request').defaults({json: true});
var HttpStatus = require('http-status-codes');
var async = require('async');
var auth = require('../helper/auth');
var api = require('../helper/api').skvsApiUrl;
var hubApi = require('../helper/api').dockerHubApiUrl;
var error_helper = require('../helper/error').errorHelper;
var request_handler = require('../helper/error').requestHandler;

module.exports = function (router) {
  // TODO: return system data: IP, hostname, hardware revision, software revision, etc.
  router.get('/system', auth, function (req, res, next) {
    res.json({status: "okay"});
  });

  router.get('/system/update', function (req, res, next) {
    /*
     ┌────────────────────────────┐
     │      Frontend Request      │
     │GET /admin/api/system/update│
     └────────────────────────────┘
     │
     ▼
     ┌──────────────────────────┐
     │ skvs GET /system/channel │
     └──────────────────────────┘
     │ eg. 'development'
     ▼
     ┌──────────────────────────┐
     │ skvs GET /system/images  │
     └──────────────────────────┘
     │     Keys: key1...keyN
     ┌──────────────────────────────┐    │    ┌──────────────────────────────┐
     ┌──│skvs GET /system/images/<key1>│◀───┼───▶│hub GET /<key1>/tag/<channel> │──┐
     │  └──────────────────────────────┘    │    └──────────────────────────────┘  │
     │                   .                  │                     .                │
     │                   .          Parallel Requests             .                │
     │                   .                  │                     .                │
     │  ┌──────────────────────────────┐    │    ┌──────────────────────────────┐  │
     ├──│skvs GET /system/images/<keyN>│◀───┴───▶│hub GET /<keyN>/tag/<channel> │──┤
     │  └──────────────────────────────┘         └──────────────────────────────┘  │
     │                                                                             │
     │   Local image1...imageN           ┌─────┐          Remote image1...imageN   │
     └──────────────────────────────────▶│MERGE│◀──────────────────────────────────┘
     └─────┘
     │
     ▼
     ┌──────────────────┐
     │Frontend Response │
     └──────────────────┘
     */
    // get the currently configured channel to use
    request(api('/system/channel'), request_handler(function (response, result) {
      if (response.statusCode == HttpStatus.OK) {
        var channel = result.value.trim();
        // get a list of all installed images
        request(api('/system/images'), request_handler(function (response, result) {
          if (response.statusCode == HttpStatus.OK && result.namespace) {
            var get_image_id_for_key = result.keys.reduce(function (obj, key) {
              // only compare images belonging to the current channel
              // this takes care of images like ibuildthecloud/..., too
              if (key === channel) {
                obj[key] = function (callback) {
                  // Get all Image Ids via skvs/dockerhub
                  async.parallel({
                    local: function (c) {
                      request(api('/system/images/' + key), request_handler(function (response, result) {
                        if (result.value == undefined || result.value == null) {
                          result.value = ""; // always return empty string.
                        }
                        c(null, result.value.trim());
                      }), function () {
                        c(null, ""); // empty string if something went wrong
                      });
                    },
                    remote: function (c) {
                      var key_splitted = key.split(":");
                      var name = key_splitted[0];
                      var tag = key_splitted[1];
                      request(hubApi(name + '/tags/' + tag), request_handler(function (response, result) {
                        var latest_layer = result[0] || {id: ""};
                        c(null, latest_layer.id);
                      }), function () {
                        c(null, ""); // empty string if something went wrong
                      });
                    }
                  }, function (err, results) {
                    results = results || {}; // no error handling here, if something went wrong, handle it outside.
                    callback(null, results);
                  });
                };
              }
              return obj;
            }, {});
            async.parallel(get_image_id_for_key, function (err, images) {
              images = images || {};
              var result = {};
              result['images'] = images;
              result['channel'] = channel;
              // TODO: # TODO: handle images w/ slashes like ibuildthecloud/systemd-docker:latest
              // TODO: race condition in trigger-update-protonet.{service, path}
              var image_keys = Object.keys(images);
              if (image_keys.length == 0) {
                result.up_to_date = false; // No Images => update needed!
                console.log('Found no images, update required.');
              } else {
                result.up_to_date = image_keys.every(function (currentKey, i, arr) {
                  var currentImage = images[currentKey];
                  var result = currentImage.local.indexOf(currentImage.remote) === 0;
                  if (!result) {
                    console.log('Remote "' + currentImage.remote + '" differs from local and will trigger an update.');
                  }
                  return result;
                });
              }
              res.json(result);
            });
          } else {
            next(error_helper(HttpStatus.INTERNAL_SERVER_ERROR, "No image states found."));
          }
        }, next));
      } else {
        next(error_helper(HttpStatus.INTERNAL_SERVER_ERROR, "No channel found!"));
      }
    }, next));
  });

  router.post('/system/update', auth, function (req, res, next) {
    var channel = req.body['channel'];
    if (channel == undefined || channel == null || channel == "") {
      next(error_helper(HttpStatus.BAD_REQUEST, "No channel given!"));
    } else {
      var options = {
        url: api('/system/channel'),
        method: 'PUT',
        form: {
          value: channel
        }
      };
      request(options, request_handler(function (response, result) {
        if (response.statusCode == HttpStatus.OK) {
          res.json({status: "okay", channel: channel});
        } else {
          next(error_helper(HttpStatus.INTERNAL_SERVER_ERROR));
        }
      }), next);
    }
  });
};
