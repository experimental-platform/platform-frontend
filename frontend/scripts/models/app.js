angular.module("protonet.platform")
  .factory("App", function(Model) {

    return new Model("/admin/api/apps");

  });