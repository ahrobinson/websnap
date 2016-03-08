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

exports.create = function (req, res) {
  Chat.find({id: req.body._id}, function (err, chat) {
    if(!chat){
      var newChat = new Chat({
        user: req.body.user,
        body: req.body.chat
      });
      newChat.save();
    } else {
      console.log('err: ', err);
    }
  });
};
// exports.update = function (req, res) {
//
// }
exports.delete = function (req, res) {

};
