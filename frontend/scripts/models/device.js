angular.module("protonet.platform")
  .factory("Device", function(Model) {

    return new Model("/admin/api/devices");

  });