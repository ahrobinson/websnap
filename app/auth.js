$.ajaxSetup({
  headers: {
    'x-access-token': window.localStorage.jwt
  }
});

var Auth = {
  signup: function () {
    console.log('signuppp');
    var userSignup = {
      username: $('#usernameSignup').val(),
      password: $('#passwordSignup').val()
    };
    console.log(userSignup)
    return $.post('/api/users/register', userSignup, function (resp) {
      window.location.pathname = '/';
    })
  },
  login: function () {
    var userLogin = {
      username: $('#usernameLogin').val(),
      password: $('#passwordLogin').val()
    };

    return $.post('/api/users/register', JSON.stringify(userLogin), function (resp) {
      window.location.pathname = '/';
    })
  },
  logout: function () {
    $.post('/api/auth/logout', function (resp) {
      window.location.pathname = '/login';
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
