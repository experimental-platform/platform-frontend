angular.module("protonet.platform")
  .factory("Model", function($timeout, API) {
    return function(url) {
      var Model = function(properties) {
        _.extend(this, properties);
      };

      Model.records = [];
      Model.loaded = false;

      var emitter = $("<div>"); // use jquery's event system for now
      _.each(["on", "one", "off", "trigger"], function(functionName) {
        Model[functionName] = function() {
          emitter[functionName].apply(emitter, arguments);
          return this;
        };
      });

      Model.startFetcher = function() {
        this._started = true;
        this.fetchNext();
      };

      Model.fetchNext = function() {
        this.fetch().finally(function() {
          if (!this._started) {
            return;
          }
          this._timeout = $timeout(this.fetchNext.bind(this), 2000);
        }.bind(this));
      };

      Model.stopFetcher = function() {
        this._started = false;
        $timeout.cancel(this._timeout);
      };

      Model.fetch = function() {
        return API.get(url).then(this.bulkAddOrRemove.bind(this));
      };

      Model.bulkAddOrRemove = function(arr) {
        _.each(arr, function(data) {
          var app = Model.find(data.name);
          if (app) {
            _.extend(app, data);
          } else {
            this.add(data)
          }
        }.bind(this));

        _.each(this.records, function(record) {
          if (record && !_.findWhere(arr, { name: record.name })) {
            this.remove(record.name);
          }
        }.bind(this));

        Model.loaded = true;
      };

      Model.find = function(name) {
        return _.findWhere(this.records, { name: name });
      };

      Model.add = function(record) {
        var app = new Model(record);
        this.records.push(app);
        this.trigger("add", [app]);
      };

      Model.remove = function(name) {
        var index = _.findIndex(this.records, function(record) {
          return record.name === name;
        });
        if (index !== -1) {
          var app = this.records.splice(index, 1);
          this.trigger("remove", [app]);
        }
      };

      return Model;
    };
    

  });