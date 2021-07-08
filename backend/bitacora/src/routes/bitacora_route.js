var express = require('express');
var router = express.Router();

const log_controller = require('../controllers/bitacora_controller');

router.post('/delete', log_controller.deleteAll);
router.post('/deletebyuser', log_controller.deleteOne);
router.get('/all', log_controller.all);
router.post('/search', log_controller.search);
router.post('/save', log_controller.save);

module.exports = router;