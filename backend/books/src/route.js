var express = require('express');
var router = express.Router();

const controller = require('./controller');

router.get('/', controller.home);
router.get('/2', controller.home2);

router.post('/books', controller.book_add);
router.put('/books', controller.update_books);
router.get('/books', controller.get_books);
router.get('/books/:idBook', controller.get_book);
router.post('/books-by-category', controller.get_books_by_category);
router.post('/books-check-stock', controller.book_check_stock);
router.post('/books-by-editorial', controller.get_books_by_editorial);
router.post('/books-by-editorial_store', controller.get_books_by_editorial_store);
router.post('/books/delete', controller.delete_books);

router.get('/categories', controller.get_categories);

module.exports = router;