angular.module("protonet.platform").controller("DevicesCtrl", function ($scope, $state, API, Device) {
  Device.startFetcher();
  $scope.devices = Device.records;
  $scope.$on("$destroy", function () {
    Device.stopFetcher();
  });

  var icons = {
    video_input: "images/hardware-icons/video_output.svg",
    video4linux: "images/hardware-icons/video_output.svg",
    audio_output: "images/hardware-icons/audio_output.svg",
    audio_input: "images/hardware-icons/audio_input.svg",
    sound: "images/hardware-icons/audio_output.svg",
    usb_serial: "images/hardware-icons/usb_serial.svg",
    tty: "images/hardware-icons/usb_serial.svg"
  };

  var examples = {
    video_input: "https://github.com/experimental-platform/example-webcam",
    video4linux: "https://github.com/experimental-platform/example-webcam",
    audio_output: "https://github.com/experimental-platform/example-speaker",
    audio_input: "https://github.com/experimental-platform/example-voice-recognition",
    sound: "https://github.com/experimental-platform/example-voice-recognition",
    'usb-serial': "https://github.com/experimental-platform/radio-test",
    tty: "https://github.com/experimental-platform/radio-test"
  };

  var generic_description = {
    tty: "Serial interface"
  };

  var getLastItem = function (liste) {
    if (Object.prototype.toString.call(liste) === '[object Array]') {
      return liste[liste.length - 1];
    }
    return liste;
  };

  $scope.getIcon = function (device) {
    return icons[getLastItem(device.SUBSYSTEM)];
  };

  $scope.getName = function (device) {
    var product = getLastItem(device.product),
      serial = getLastItem(device.serial),
      manufacturer = getLastItem(device.manufacturer),
      devtype = getLastItem(device.SUBSYSTEM),
      name = getLastItem(device.name),
      result = '';
    if (name) {
      return name;
    }
    result += product ? product : '';
    result += serial ? ' (SERIAL: ' + serial + ')' : '';
    result += manufacturer ? ' by ' + manufacturer : '';
    result = result ? result : generic_description[devtype];
    return result;
  };

  $scope.getPath = function (device) {
    return getLastItem(device.DEVNAME);
  };

  $scope.getExample = function (device) {
    return examples[getLastItem(device.SUBSYSTEM)];
  };
});