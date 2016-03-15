var jwt = require('jsonwebtoken');
var config = require('../server/config/config');
var User = require('../server/api/user/user');

exports.login =  function (req, res) {
  var usersName = req.body.username;
  var pass = req.body.password;
  console.log(req.body.username)
  User.findOne({
    username: req.body.username
  }).then(function(user){
    console.log('user: ', user)
    if(!user){
      res.json({ success: false, message: 'Authentication failed. User not found.' });
    } else if(user){
      console.log('user found!')
      user.comparePasswords(pass)
      .then(function (match) {
        if(match){
          // if user is found and password is right
          // create a token
          var token = jwt.sign(user, config.secret, {
            expiresIn: 86400
          });

          res.cookie('jwt-tok', token, { expires: new Date(Date.now() + 86400), httpOnly: true });
          res.json({
            success: true,
            message: 'User saved! Take your token!'
          });
        } else {
          //password doesn't match
          res.json({ success: false, message: 'Authentication failed. Incorrect password.' });
        }
      });
    }
  }).then(function(err){
    console.log(err)
  })
}

exports.signup = function (req, res) {
  User.findOne({username: req.body.username}, function(err, user){
    console.log(user)
    if(!user){
      var newUser = new User({
        username: req.body.username,
        password: req.body.password,
      })
      newUser.save(function(err){
        if(err){
          res.send(err)
        } else {
          var token = jwt.sign(user, config.secret, {
            expiresIn: 86400000
          });
          //must store jwt in cookie because there is no way to pass jwt in header
          //when using window.location.pathname, since the browser is making the
          //request. By setting a cookie, it gets automatically sent with every
          //browser request.
          res.cookie('jwt-tok', token, { expires: new Date(Date.now() + 36000), httpOnly: true });
          res.json({
            success: true,
            message: 'User saved! Take your token!'
          });
        }
      })
    } else {
      res.send(err);
    }
  })
}

exports.logout = function (req, res) {
  console.log('req.decoded: ', req.decoded);
  res.clearCookie('jwt-tok');
  res.end();
}

exports.verify = function (req, res, next) {
  var token = req.cookies['jwt-tok'];
  if(token){
    jwt.verify(token, config.secret, function(err, decoded){
      if(err){
        res.send(err);
        res.clearCookie('jwt-tok');
        res.redirect('/login');
      } else {
        req.decoded = decoded;
        next()
      }
    })
  } else {
    res.status(403);
    res.redirect('/signup');
  }

}
