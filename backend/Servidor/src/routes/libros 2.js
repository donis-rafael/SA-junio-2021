var express = require('express');
var router = express.Router();

const libros_controller = require('../controllers/libros_controller');

router.get('/create', libros_controller.crear);
//router.post('/register', libros_controller.editar);
//router.post('/register', libros_controller.eliminar);
//router.post('/register', libros_controller.consultar);

module.exports = router;