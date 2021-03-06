var socket = io();

function video (vid) {
  console.log('vid: ', vid);
  var video = $('video')[0];
  video.src = window.URL.createObjectURL(vid);
  video.onloadedmetadata = function(e) {
    // Do something with the video here.
    console.log(video)
  };
}

$('#vidBtn').click(function () {
  navigator.webkitGetUserMedia({
    'audio': true,
    'video': true
  },video,
  function (err) {
    console.log('Error: ', err);
  });
});








  /*
  *
  *
  *
  *       SEND CHAT MSG
  *
  *
  *
  */

function previewFile () {
  var preview = $('img')[0];
  var file    = $('#files')[0].files[0];
  var reader  = new FileReader();

  reader.onload = function () {
    sendChat(reader.result);
  }

  if (file) {
    reader.readAsDataURL(file);
  }
}

function sendChat (val) {
  socket.emit('chat msg', val);
}


$('form').on('submit', function () {
  sendChat($('#m').val());
  $('#m').val('');
  return false;
});

socket.on('connect', function (id) {
  console.log('connected!');
})
socket.on('chat msg', function (msg) {
  if(msg.body.match('image')){
    console.log(msg)
    $('#messages').append($('<li>').html('<img src="'+msg.body+'"/>').attr('id', msg._id));
  } else {
    $('#messages').append($('<li>').text(msg.body).attr('id', msg._id));
  }
  setTimeout(function () {
    socket.emit('deletion', msg._id);
  }, 5000);
});

socket.on('deletion', function (id) {
  $('#' + id).remove();
});


//ADD/REMOVE TO LIST OF users
socket.on('first connect', function (users) {
  console.log('users: ', users)
  Object.keys(users).forEach(function (user) {
    $('#users').append($('<li>').html('<span>' + user.username + '</span>').attr('id', user.username));
    console.log('hi')
  });
});

socket.on('user connect', function (user) {
  console.log('user: ', user)
  $('#users').append($('<li>').html('<span>' + user + '</span>').attr('id', user));
});

socket.on('user disconnect', function (user) {
  $('#' + user).remove();
})
