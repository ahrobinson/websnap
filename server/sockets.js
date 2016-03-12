var controller = require('./api/chat/controller');

module.exports = function (server) {

  var io = require('socket.io')(server);

  io.sockets.on('connection', function (socket) {
    // console.log(socket)
    console.log('a user connected: ', socket.id);
    socket.on('chat msg', function (msg) {
      controller.create(msg, function (message) {
        io.emit('chat msg', message);
      });
    });

    socket.on('deletion', function(id){
      console.log('delete id: ', socket.id);
      controller.delete(id, function () {
        console.log('it is finished');
        io.emit('deletion', id);
      });
    })
  });
}
