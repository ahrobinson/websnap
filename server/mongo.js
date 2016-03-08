var Chat = require('./api/chat/chat');

var db = {
  Chat: Chat,
  url: 'mongodb://localhost/websnap'
}


module.exports = db
