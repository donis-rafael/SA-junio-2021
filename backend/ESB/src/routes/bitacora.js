const express = require('express');
const router = express.Router();

const bitacora_controller = require('../controller/bitacoraController');

router.get('/getBitacoras', bitacora_controller.get_bitacoras);
router.post('/removeByUser', bitacora_controller.eliminarByUser);
router.post('/removeAll', bitacora_controller.eliminarAll);
router.post('/search', bitacora_controller.buscar);
router.post('/save', bitacora_controller.guardar);

module.exports = router;