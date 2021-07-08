const express = require('express');
const router = express.Router();

const imp_controller = require('../controller/impController');

router.get('/getPaises', imp_controller.get_paises);
router.post('/impuesto', imp_controller.resultado);

module.exports = router;