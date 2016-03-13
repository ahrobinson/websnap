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

exports.update = function(req,res){

}
exports.delete = function(req,res){

}
