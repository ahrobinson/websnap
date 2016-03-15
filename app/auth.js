// $.ajaxSetup({
//   headers: {
//     'x-access-token': window.localStorage.jwt
//   }
// });

var socket = io();

var Auth = {
  signup: function () {
    var userSignup = {
      username: $('#usernameSignup').val(),
      password: $('#passwordSignup').val()
    };

    return $.post('/api/auth/register', userSignup, function (resp) {
      window.location.pathname = '/';
      socket.emit('signup', userSignup.username)
    })
  },
  login: function () {
    var userLogin = {
      username: $('#usernameLogin').val(),
      password: $('#passwordLogin').val()
    };

    return $.post('/api/auth/login', userLogin, function (resp) {
      window.localStorage['jwt-token'] = resp.token
      window.location.pathname = '/';
      socket.emit('login', userLogin.username);
    })
  },
  logout: function () {
    $.post('/api/auth/logout', function (resp) {
      window.location.pathname = '/login';
      socket.emit('logout', userLogin.username)
    });
  }
};

$('#signupBtn').click(function () {
  Auth.signup();
});

$('#loginBtn').click(function () {
  Auth.login();
});

$('#logoutBtn').click(function () {
  Auth.logout();
});
