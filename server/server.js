var express = require('express');
var app = express();
var server = require('http').Server(app);
var bodyParser = require('body-parser');
var morgan = require('morgan');
var mongoose = require('mongoose');
var db = require('./config/config');
var io = require('./sockets')(server);

mongoose.connect(db.url);

var port = process.env.PORT || 3000

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// use morgan to log requests to the console
app.use(morgan('dev'));

app.use('/api/chat', require('./api/chat/routes'));
app.use('/api/users', require('./api/user/routes'));
app.use('/api/auth/local', require('../auth/local'));

app.use(express.static('app'));
app.use('/node_modules', express.static('node_modules'));

server.listen(port, function () {
  console.log('Let there be light!');
});
