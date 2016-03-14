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

exports.update = function(req,res){

}
exports.delete = function(req,res){

}
