var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var FileStore = require('session-file-store')(session);
var HttpStatus = require('http-status-codes');
var cors = require('cors');

var api_router = express.Router();
require('./routes/sessions')(api_router);
require('./routes/ptw')(api_router);
require('./routes/ssh')(api_router);
require('./routes/apps')(api_router);

var app = express();
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());

if (process.env.NODE_ENV == "development") {
  console.log("Warning: Enabling cors because of dev environment.");
  app.use(cors({
    credentials: true,
    origin: true,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE'
  }));
}

app.use(session({
  store: new FileStore({}),
  resave: false,
  saveUninitialized: false,
  secret: "yo-secret-dawg!Banana" // genereate Key on start
}));

app.use('/protonet', express.static(path.join(__dirname, 'public')));

app.use('/protonet/api', api_router);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  var err = new Error('Not Found');
  err.status = HttpStatus.NOT_FOUND;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function (err, req, res, next) {
    res.status(err.status || HttpStatus.INTERNAL_SERVER_ERROR);
    res.json({
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function (err, req, res, next) {
  res.status(err.status || HttpStatus.INTERNAL_SERVER_ERROR);
  res.json({
    message: err.message,
    error: {}
  });
});


module.exports = app;
