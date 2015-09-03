angular.module("protonet.platform")
  .factory("App", function($timeout, API) {


    var App = function(properties) {
      _.extend(this, properties);
    };

    App.records = [];
    App.loaded = false;

    var emitter = $("<div>"); // use jquery's event system for now
    _.each(["on", "one", "off", "trigger"], function(functionName) {
      App[functionName] = function() {
        emitter[functionName].apply(emitter, arguments);
        return this;
      };
    });

    App.startFetcher = function() {
      this._started = true;
      this.fetchNext();
    };

    App.fetchNext = function() {
      this.fetch().then(function() {
        if (!this._started) {
          return;
        }
        this._timeout = $timeout(this.fetchNext.bind(this), 2000);
      }.bind(this));
    };

    App.stopFetcher = function() {
      this._started = false;
      $timeout.cancel(this._timeout);
    };

    App.fetch = function() {
      return API.get("/admin/api/apps").then(this.bulkAddOrRemove.bind(this));
    };

    App.bulkAddOrRemove = function(arr) {
      _.each(arr, function(data) {
        var app = App.find(data.name);
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

      App.loaded = true;
    };

    App.find = function(name) {
      return _.findWhere(this.records, { name: name });
    };

    App.add = function(record) {
      var app = new App(record);
      this.records.push(app);
      this.trigger("add", [app]);
    };

    App.remove = function(name) {
      var index = _.findIndex(this.records, function(record) {
        return record.name === name;
      });
      if (index !== -1) {
        var app = this.records.splice(index, 1);
        this.trigger("remove", [app]);
      }
    };

    return App;

  });