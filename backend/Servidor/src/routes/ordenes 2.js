var express = require('express');
var router = express.Router();

const ordenes_controller = require('../controllers/ordenes_controller');

router.post('/create', ordenes_controller.reg_order);
router.get('/all', ordenes_controller.get_orders);
//router.post('/register', ordenes_controller.eliminar);
//router.post('/register', ordenes_controller.consultar);

module.exports = router;