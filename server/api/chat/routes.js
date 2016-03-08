var router = require('express').Router();
var controller = require('./controller');

router.get('/', controller.show);

module.exports = router;
