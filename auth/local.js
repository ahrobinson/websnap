var router = require('express').Router();
var auth = require('./controller')


router.post('/logout', auth.logout);
router.post('/login', auth.login);
router.post('/register', auth.signup);

module.exports = router;
