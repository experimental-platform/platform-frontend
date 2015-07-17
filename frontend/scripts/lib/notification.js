angular.module("protonet.platform")
  .factory("Notification", function() {

    return {
      success: function(text) {
        this._show(text, "success");
      },
      error: function(text) {
        this._show(text, "error");
      },
      _show: function(text, className) {
        $(".notification").remove();

        var $notification = $("<div>", { "class": ("notification " + className), text: text });
        $notification.hide().appendTo("body");
        $notification.fadeIn("fast");
        $notification.click(function() {
          $notification.remove();
        });

        setTimeout(function() {
          $notification.fadeOut("fast", function() {
            $notification.remove();
          });
        }, 4000);
      }
    };
  });