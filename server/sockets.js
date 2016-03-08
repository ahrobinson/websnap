module.exports = function (server) {

  var io = require('socket.io')(server);

  io.on('connection', function (socket) {
    console.log('a user connected');
    socket.on('chat msg', function (msg) {
      io.emit('chat msg', msg);
    });
  });
}
