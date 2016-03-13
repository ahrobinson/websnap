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
      console.log('resp: ',resp);
      // window.localStorage.setItem('jwt', resp.token);
      // $.ajax({
      //   url: '/',
      //   type: 'GET',
      //   // headers: { "x-access-token": window.localStorage.jwt },
      // }).success(function () {
      // })
      window.location.pathname = '/';
    })
  },
  login: function () {
    var userLogin = {
      username: $('#usernameLogin').val(),
      password: $('#passwordLogin').val()
    };

    return $.post('/api/users/register', JSON.stringify(userLogin), function (resp) {
      window.localStorage.setItem('jwt', resp.token);
      window.location.pathname = '/';
    })
  },
  logout: function () {
    window.localStorage.removeItem('jwt');
    window.location.pathname = '/login';
  },
  isAuth: function () {
    return !!window.localStorage.getItem('jwt');
  }
};

$('#signupBtn').click(function () {
  Auth.signup();
});

$('#loginBtn').click(function () {
  Auth.login();
});
