var error_helper = require('../helper/error').errorHelper;
var exec = require('child_process').exec;
var HttpStatus = require('http-status-codes');


module.exports = {
  run_cmd: function (cmd_line, res, next) {
    return exec(cmd_line,
      function (error, stdout, stderr) {
        if (error === null) {
          res.json(stdout);
        } else {
          console.log("STDERR: " + stderr);
          console.log("ERROR/START: \n" + error);
          console.log("ERROR/END");
          next(error_helper(HttpStatus.BAD_REQUEST));
        }
      });
  }
};