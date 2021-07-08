const express = require('express');
const router = express.Router();

const server_controller = require('../controller/serverController');

router.get('/read', server_controller.get_orders);
router.post('/buy', server_controller.crearOrden);
router.get('/states', server_controller.get_estados);
router.post('/newState', server_controller.registrarEstado);
router.post('/updateState', server_controller.actualizaEstado);

module.exports = router;