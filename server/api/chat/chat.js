var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var chats = new Schema({
  user: String,
  body: String,
  created_at: {
    type: Date,
    default: Date.now
  }
});

var Chat = mongoose.model('Chat', chats)

module.exports = Chat;
