var express = require('express');
var router = express.Router();

const ordenes_controller = require('../controllers/ordenes_controller');

router.post('/create', ordenes_controller.reg_order);
router.get('/all', ordenes_controller.get_orders);
router.post('/registrar-estado', ordenes_controller.reg_state);
router.post('/cambiar-estados', ordenes_controller.upd_state);
router.get('/estados', ordenes_controller.get_states);

module.exports = router;