/**
 * Created by atulr on 05/07/15.
 */
var express = require('express');
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');


var routes = require('./app/index');

var app = express();


app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
//app.engine('html', engines.ejs);
console.log("__dirname ",__dirname);
app.use(express.static(path.join(__dirname, './public')));
//app.use(express.static(path.join(__dirname, './views')));

app.set('views', path.join(__dirname, 'views'));
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');


//var configDB = require('./config/database.js');
var configDB = '127.0.0.1:27017/' + process.env.OPENSHIFT_APP_NAME;
// if OPENSHIFT env variables are present, use the available connection info:
if (process.env.OPENSHIFT_MONGODB_DB_URL) {
    //console.log("mongodb connect url check")
    configDB = process.env.OPENSHIFT_MONGODB_DB_URL +
    process.env.OPENSHIFT_APP_NAME;
}
console.log("database =", configDB);
//mongoose.connect(configDB);
// Connect to mongodb
var connect = function () {
    mongoose.connect(configDB);
};
connect();

var db = mongoose.connection;

db.on('error', function(error){
    console.log("Error loading the db - "+ error);
});

db.on('disconnected', connect);

app.use('/', routes);



// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers
//================
// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.send('error'+ err.message );
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.send('error'+ err.message );
});


module.exports = app;