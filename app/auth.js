$.ajaxSetup({
  headers: {
    'x-access-token': window.localStorage.jwt
  }
});

var Auth = {
  signup: function () {
    var userSignup = {
      username: $('#usernameSignup').val(),
      password: $('#passwordSignup').val()
    };

    return $.post('/api/auth/register', userSignup, function (resp) {
      window.location.pathname = '/';
    })
  },
  login: function () {
    var userLogin = {
      username: $('#usernameLogin').val(),
      password: $('#passwordLogin').val()
    };
    
    return $.post('/api/auth/login', userLogin, function (resp) {
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
  console.log('login')
  Auth.login();
});

$('#logoutBtn').click(function () {
  Auth.logout();
});
