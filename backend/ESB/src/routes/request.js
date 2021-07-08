const express = require('express');
const router = express.Router();

const request_controller = require('../controller/requestController');

router.get('/getSolicitudes', request_controller.get_solicitudes);
router.post('/solicitud', request_controller.add);
router.post('/remove', request_controller.eliminar);

module.exports = router;