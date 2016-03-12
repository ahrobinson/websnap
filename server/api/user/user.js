var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var users = new Schema({
  username: {
    type: String,
    unique: true
  },
  password: String
});

var Chat = mongoose.model('User', users);

module.exports = Chat;
