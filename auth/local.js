var router = require('express').Router();
var auth = require('./controller')


router.post('/', auth.verify, auth.login);
router.post('/logout', auth.logout);


module.exports = router;
