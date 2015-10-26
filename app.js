var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var Twit = require('twit');
var http = require('http');

//username: guest
//password: guest
//For the consideration of security, we make the "guest" account read-only
mongoose.connect('mongodb://guest:guest@ds043200.mongolab.com:43200/twit');


var routes = require('./routes/index');
var users = require('./routes/users');

var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var port = process.env.PORT || 8081;
server.listen(port);
console.log("listening on port " + port);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/users', users);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});



var T = new Twit({
	consumer_key: "mxm749NomiBIZViowOuXMzwM7",
	consumer_secret: "Pj65ozDpzi5SETW1IDEDJcFoWSYp5yWiGMPyUjLctGfMlmeyfW",
	access_token: "3923310994-J3YpCqPFg7kAequBOd1LLTQ4JGhYeKeFzgb471D",
	access_token_secret: "OoEWEVe0Cyozs3eMiqKxDK1u54otVcvEjLb040htdEQ54"
});

var filter= {track: 'music,travel,sports,food', locations: '-74,40,-73,41'};// New York

var stream = T.stream('statuses/filter',filter);
io.on('connection', function(socket) {
	console.log('new connection established');
	stream.on('tweet', function (tweet) {
		socket.emit('Twit', tweet);
	});
});




module.exports = app;
