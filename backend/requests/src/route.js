var express = require('express');
var router = express.Router();

const controller = require('./controller');

router.get('/', controller.home);

router.post('/book-request/add', controller.book_add);
router.get('/books-requests', controller.get_books);
router.post('/book-request/delete', controller.delete_books);

module.exports = router;