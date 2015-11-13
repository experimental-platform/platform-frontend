angular.module("protonet.platform").controller("DevicesCtrl", function($scope, $state, API, Device) {
  // @Hinnerk comment this in as soon as you have a json api at /admin/api/devices
  // Device.startFetcher();
  // $scope.devices = Device.records;
  // $scope.$on("$destroy", function() {
  //   Device.stopFetcher();
  // });
  
  // @Hinnerk, this is demo data:
  $scope.devices = [{
    path: "/dev/video0",
    name: "D-Link Webcam",
    manufacturer: "D-Link",
    type: "video_input"
  }, {
    path: "/dev/snd/xxx",
    name: "Foobar Mic",
    manufacturer: "Foobar",
    type: "audio_input"
  }, {
    path: "/dev/snd/xxx",
    name: "Logitech Speakers",
    manufacturer: "Logitech",
    type: "audio_output"
  }, {
    path: "/dev/tty0",
    name: "Unknown Serial Device",
    manufacturer: "Unknown",
    type: "usb_serial"
  }];

  var icons = {
    video_input: "images/hardware-icons/video_output.svg",
    audio_output: "images/hardware-icons/audio_output.svg",
    audio_input: "images/hardware-icons/audio_input.svg",
    usb_serial: "images/hardware-icons/usb_serial.svg"
  };

  var examples = {
    video_input: "https://github.com/experimental-platform/example-webcam",
    audio_output: "https://github.com/experimental-platform/example-speaker",
    audio_input: "https://github.com/experimental-platform/example-voice-recognition",
    usb_serial: "https://github.com/experimental-platform/radio-test"
  };

  $scope.getIcon = function(device) {
    return icons[device.type];
  };

  $scope.getExample = function(device) {
    return examples[device.type];
  };
});