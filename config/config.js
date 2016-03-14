var Chat = require('./api/chat/chat');

var db = {
  Chat: Chat,
  url: 'mongodb://localhost/websnap',
  secret : 'letfreedomreign'
}


module.exports = db
