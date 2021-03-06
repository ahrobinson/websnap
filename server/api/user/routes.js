var router = require('express').Router();
var controller = require('./controller');
var auth = require('../../../auth/controller')

router.get('/', controller.show);
router.get('/:id', controller.showOne);
router.put('/:id', controller.update);
router.delete('/:id', controller.delete);

module.exports = router;
