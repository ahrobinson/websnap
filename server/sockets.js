var controller = require('./api/chat/controller');

module.exports = function (server) {
  var connected = {};
  var io = require('socket.io')(server);

  io.sockets.on('connection', function (socket) {

    socket.on('login', function (username) {
      console.log(connected)
      if(!connected[username]){
        io.emit('user connect', username);
      } else {
        io.emit('first connect', connected);
      }
      connected[username] = {
        username: username,
        id: socket.id
      }
    });

    socket.on('signup', function (username) {
      connected[username] = {
        username: username,
        id: socket.id
      }
      io.emit('user connect', username);
    });

    socket.on('logout', function (username) {
      delete connected[username];

      io.emit('user disconnect', username);
    })

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
