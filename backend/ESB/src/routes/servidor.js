const express = require('express');
const router = express.Router();

const server_controller = require('../controller/serverController');

router.get('/getUsers', server_controller.get_users);
router.post('/login', server_controller.login);
router.put('/registro', server_controller.registrar);
router.post('/accept', server_controller.aceptar);
router.post('/delete', server_controller.eliminar);

module.exports = router;