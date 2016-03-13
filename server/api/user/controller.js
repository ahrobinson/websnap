var User = require('./user');
var jwt = require('jsonwebtoken');
var config = require('../../config/config');


exports.show = function(req,res){
  User.find({}, function(err, users){
    if(err){
      console.log('error finding users')
    }
    res.json(users);
  })
}

exports.showOne = function(req,res){
  User.findById(req.params.id, function(err, user){
    if(!err){
      res.json(user);
    }
  })

}
exports.create = function(req,res){
  console.log('ahahhaha')
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
            expiresIn: 86400
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

exports.login =  function(req, res){
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
      //password doesn't match
      if(user.password !== pass){
        res.json({ success: false, message: 'Authentication failed. Incorrect password.' });
      } else {
        // if user is found and password is right
        // create a token
        var token = jwt.sign(user, config.secret, {
          expiresIn: 86400
        });

        res.cookie('jwt-tok', token, { expires: new Date(Date.now() + 36000), httpOnly: true });
        res.json({
          success: true,
          message: 'User saved! Take your token!'
        });
      }
    }
  }).then(function(err){
    console.log(err)
  })
}

exports.update = function(req,res){

}
exports.delete = function(req,res){

}
