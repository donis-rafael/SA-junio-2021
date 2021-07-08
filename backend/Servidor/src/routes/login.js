var express = require('express');
var router = express.Router();

const login_controller = require('../controllers/login_controller');

router.post('/login', login_controller.login);
router.post('/register', login_controller.registrar);
router.get('/userlist', login_controller.get_users);
router.post('/remove', login_controller.remove);
router.post('/accept', login_controller.accepted);

module.exports = router;