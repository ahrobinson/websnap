var Chat = require('./chat');

exports.show = function (req, res) {
  Chat.find({}, function (err, chats) {
    if(err){
      console.log('error finding chats');
    }
    res.json(chats);
  });
};

// exports.showOne = function (req, res) {
//   Chat.findById(req.body.id, function(err, chat){
//     if(!err){
//       res.json(chat);
//     }
//   })
// };

exports.create = function (msg, cb) {
  var newChat = new Chat({
    user: 'anon',
    body: msg
  });
  newChat.save(function (err, msg) {
    if(!err){
      console.log('saved!');
      cb(msg);
    }
  });
};
// exports.update = function (req, res) {
//
// }
exports.delete = function (id, cb) {
  console.log(id);
  Chat.findOne({_id: id}, function (err, chat) {
    if(!err && chat){
      chat.remove(function (err) {
        if(!err) {
          console.log('item destroyed');
          cb();
        }
      });
    } else if(err) {
      console.log('err: ', err);
    }
  });
};
