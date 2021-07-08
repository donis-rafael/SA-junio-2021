const express = require('express');
const router = express.Router();

const books_controller = require('../controller/booksController');

router.get('/read', books_controller.get_books);
router.get('/getCategories', books_controller.get_categories);
router.post('/create', books_controller.add);
router.post('/byCategorie', books_controller.by_category);
router.post('/byEditorial', books_controller.by_editorial);
router.post('/delete', books_controller.eliminar);
router.get('/byId/:idBook', books_controller.by_id);
router.put('/update', books_controller.actualiza);
router.post('/checkStock', books_controller.stock);
router.post('/byEditorialStore', books_controller.by_edit_store);

module.exports = router;



//const express = require('express');
//const router = express.Router();

//const books_controller = require('../controller/booksController');

//router.get('/getBooks', books_controller.get_books);
//router.post('/add', books_controller.add);
//router.get('/getCategories', books_controller.get_categories);

//router.post('/byCategorie', books_controller.by_category);
//router.post('/byEditorial', books_controller.by_editorial);
//router.post('/delete', books_controller.eliminar);
//router.get('/byId/:idBook', books_controller.by_id);
//router.put('/update', books_controller.actualiza);
//router.post('/checkStock', books_controller.stock);

// router.post('/byEditorialStore', books_controller.by_edit_store);

// module.exports = router;