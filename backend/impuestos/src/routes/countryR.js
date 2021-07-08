var express = require('express');
var router = express.Router();

const country_controller = require('../controllers/country_controller');

router.get('/todosCountry', country_controller.get_paises);
router.post('/saveCountry', country_controller.save_country);
router.post('/impuesto', country_controller.calc_impuesto);
router.post('/remove', country_controller.remove);

module.exports = router;