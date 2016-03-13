var router = require('express').Router();
var auth = require('./controller')


router.post('/', auth.verify, auth.login);


module.exports = router;
