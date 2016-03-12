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
      window.localStorage.setItem('jwt', resp.token);
      window.location.pathname = '/index.html';
    })
  },
  signin: function () {
    var userLogin = {
      username: $('#usernameLogin').val(),
      password: $('#passwordLogin').val()
    };

    return $.post('/api/users/register', JSON.stringify(userLogin), function (resp) {
      window.localStorage.setItem('jwt', resp.data.token);
      window.location.pathname = '/home';
    })
  },
  logout: function () {
    window.localStorage.removeItem('jwt');
    window.location.pathname = '/signin';
  },
  isAuth: function () {
    return !!window.localStorage.getItem('jwt');
  }
};

$('#signupBtn').click(function () {
  Auth.signup();
});
