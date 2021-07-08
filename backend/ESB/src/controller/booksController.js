const controller = {};
const con = require('../config/connection');

const books = 'http://' + process.env.BOOKS + ':3002';
const api = con(books);

controller.get_books = (req, res) => {
    api.get('/books')
        .then(resp => {
            var arrayLibros = [];

            for (var i in resp.data.data) {
                arrayLibros.push({
                    id_libro: resp.data.data[i]._id,
                    nombre: resp.data.data[i].name,
                    generos: resp.data.data[i].categories,
                    stock: resp.data.data[i].stock,
                    autor: resp.data.data[i].author,
                    id_editorial: resp.data.data[i].editorial,
                    foto: resp.data.data[i].image,
                    precio: resp.data.data[i].price
                });
            }
            res.status(200).json(arrayLibros);

        }).catch(err => {
            console.log("ERROR: " + err);
            res.status(500).json({
                message: "No se obtuvieron los libros"
            });
        });
}

controller.get_categories = (req, res) => {
    api.get('/categories')
        .then(resp => {
            res.status(200).json(resp.data);

        }).catch(err => {
            console.log("ERROR: " + err);
            res.status(400).json({
                message: err
            });
        });
}

controller.add = (req, res) => {
    const url = '/books';
    const body = {
        name: req.body.nombre,
        description: "algun libro",
        editorial: req.body.id_editorial,
        image: req.body.foto,
        published: "1999",
        author: req.body.autor,
        price: req.body.precio,
        stock: req.body.stock,
        categories: req.body.generos
    }
    api.post(url, body).then(resp => {
        if (resp.status == 200) {
            res.status(200).json({
                message: "ok"
            });

        } else {
            res.status(500).json({
                message: resp.message
            });
        }

    }).catch(err => {
        console.log(err);
        res.status(500).json({
            message: "No se guardo el registro de libro"
        });
    });
}

controller.by_category = (req, res) => {
    const url = '/books-by-category';
    api.post(url, req.body).then(resp => {
        if (resp.status == 201) {
            res.status(201).json(resp.data);

        } else {
            res.status(400).json({
                message: resp.message
            });
        }

    }).catch(err => {
        console.log(err);
        res.status(400).json({
            message: err
        });
    });
}

controller.by_editorial = (req, res) => {
    const url = '/books-by-editorial';
    api.post(url, req.body).then(resp => {
        if (resp.status == 200) {
            res.status(200).json(resp.data);

        } else {
            res.status(400).json({
                message: resp.message
            });
        }

    }).catch(err => {
        console.log(err);
        res.status(400).json({
            message: err
        });
    });
}

controller.eliminar = (req, res) => {
    const url = '/books/delete';
    api.post(url, req.body).then(resp => {
        if (resp.status == 200) {
            res.status(200).json(resp.data);

        } else {
            res.status(400).json({
                message: resp.message
            });
        }

    }).catch(err => {
        console.log(err);
        res.status(400).json({
            message: err
        });
    });
}

controller.by_id = (req, res) => {
    let id = req.params.idBook;
    const url = '/books/' + id;
    api.get(url)
        .then(resp => {
            res.status(200).json(resp.data);

        }).catch(err => {
            console.log("ERROR: " + err);
            res.status(400).json({
                message: err
            });
        });
}

controller.actualiza = (req, res) => {
    const url = '/books';
    api.put(url, req.body).then(resp => {
        if (resp.status == 200) {
            res.status(200).json(resp.data);

        } else {
            res.status(400).json({
                message: resp.message
            });
        }

    }).catch(err => {
        console.log(err);
        res.status(400).json({
            message: err
        });
    });
}

controller.stock = (req, res) => {
    const url = '/books-check-stock';
    api.post(url, req.body).then(resp => {
        if (resp.status == 200) {
            res.status(200).json(resp.data);

        } else {
            res.status(400).json({
                message: resp.message
            });
        }

    }).catch(err => {
        console.log(err);
        res.status(400).json({
            message: err
        });
    });
}

controller.by_edit_store = (req, res) => {
    const url = '/books-by-editorial_store';
    api.post(url, req.body).then(resp => {
        if (resp.status == 200) {
            res.status(200).json(resp.data);

        } else {
            res.status(400).json({
                message: resp.message
            });
        }

    }).catch(err => {
        console.log(err);
        res.status(400).json({
            message: err
        });
    });
}

module.exports = controller;