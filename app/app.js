var socket = io();

$('form').on('submit', function () {
  socket.emit('chat msg', $('#m').val());
  $('#m').val('');
  return false;
});

socket.on('chat msg', function (msg) {
  $('#messages').append($('<li>').text(msg.body).attr('id', msg._id));
  setTimeout(function () {
    socket.emit('deletion', msg._id);
  }, 5000);
});

socket.on('deletion', function (id) {
  $('#' + id).remove();
});
