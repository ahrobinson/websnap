var express = require('express');
var app = express();
var server = require('http').Server(app);
var bodyParser = require('body-parser');
var morgan = require('morgan');
var mongoose = require('mongoose');
var db = require('./config/config');
var io = require('./sockets')(server);
var path = require('path');
var auth = require('../auth/controller');
var cookieParser = require('cookie-parser');


mongoose.connect(db.url);

var port = process.env.PORT || 3000

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());
// use morgan to log requests to the console
app.use(morgan('dev'));

app.use('/api/chat', require('./api/chat/routes'));
app.use('/api/users', require('./api/user/routes'));
app.use('/api/auth/', require('../auth/local'));

// app.use(express.static('app'));
//serving all files in app creates weird problems with cookies
app.use('/node_modules', express.static('node_modules'));
app.use('/auth.js', express.static('app/auth.js'));
app.use('/app.js', express.static('app/app.js'));
app.use('/style.css', express.static('app/style.css'));

//ROUTES

app.get('/', auth.verify, function (req, res) {
  res.sendFile(path.join(__dirname, '../app', 'index.html'));
});

app.get('/signup', function (req, res) {
  res.sendFile(path.join(__dirname, '../app', 'signup.html'));
});

app.get('/login', function (req, res) {
  res.sendFile(path.join(__dirname, '../app', 'login.html'));
});

//this catch-all redirects to home page, which redirects to login if unatuthorized
app.all('*', function (req, res) {
  res.redirect('/');
});

server.listen(port, function () {
  console.log('Let there be light!');
});
