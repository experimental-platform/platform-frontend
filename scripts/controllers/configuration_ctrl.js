angular.module("protonet.platform").controller("ConfigurationCtrl", function($scope, API, Notification) {
  function updateKeys() {
    API.get("/admin/api/ssh").then(function(data) {
      $scope.keys = data.keys;
    });
  }

  $scope.setPublishToWeb = function() {
    if (!$scope.nodename) {
      return;
    }

    if (!$scope.nodename.match(/^[a-z0-9\-]+$/i)) {
      Notification.error("The address cannot contain special characters or white spaces.");
      return;
    }

    $scope.loading = true;
    API.post("/admin/api/ptw/nodename", {
      nodename: $scope.nodename
    }).then(function() {
      Notification.success("Successfully updated the internet address.");
      $scope.$emit("ptw.change");
    }).catch(function() {
      Notification.error("An error occured while setting the internet address. Please try again.");
    }).finally(function() {
      $scope.loading = false;
    });
  };

  $scope.setPassword = function() {
    if (!$scope.currentPassword) {
      Notification.error("Please enter your current password.");
      return;
    }

    if (!$scope.newPassword) {
      Notification.error("Please enter your new password.");
      return;
    }

    if ($scope.newPassword !== $scope.newPasswordConfirmation) {
      Notification.error("The passwords you entered are not the same.");
      return;
    }

    $scope.loading = true;
    API.post("/admin/api/password", {
      current_password: $scope.currentPassword,
      password: $scope.newPassword
    }).then(function() {
      Notification.success("Your password has been successfully changed.");
    }).catch(function() {
      Notification.error("Your current password is incorrect.");
    }).finally(function() {
      $scope.loading = false;
    });
  };

  $scope.addKey = function() {
    if (!$scope.key) {
      return;
    }

    $scope.loading = true;
    API.post("/admin/api/ssh/add", {
      key: $.trim($scope.key)
    }).then(function() {
      $scope.key = "";
      Notification.success("You successfully added a new ssh key.");
      updateKeys();
    }).catch(function() {
      Notification.error("An error occured while adding the public key. Please try again.");
    }).finally(function() {
      $scope.loading = false;
    });
  };

  $scope.removeKey = function(key) {
    API.post("/admin/api/ssh/delete", {
      id: key.id
    }).then(function() {
      Notification.success("You successfully removed this key.");
      updateKeys();
    }).catch(function() {
      Notification.error("An error occurred while removing the key. Please try again.");
    });
  };

  updateKeys();
});