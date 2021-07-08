const book = require('./model');

var uuid = require('uuid');
const AWS = require('aws-sdk');
const aws_keys = require('./creds');
const s3 = new AWS.S3(aws_keys.s3);
const bucket = 'https://sa-g4-proyecto.s3.us-east-2.amazonaws.com/';


const home = (req, res) => {
    res.send('<h2>Hola Mundo 2- SA - Proyecto - G2</h2')
}
const home2 = (req, res) => {
    res.send('<h2>Hola Mundo 2*2- SA - Proyecto - G2</h2')
}


const book_add = (req, res) => {

    let cover = req.body.image;

    let infoBook = req.body;

    if (!cover.includes(bucket)) {
        cover = cover.split(',')[1];
        var idFoto = uuid();
        let pathFoto = "Fotos_Libros/" + idFoto + ".jpg";
        let buffer = new Buffer.from(cover, 'base64');


        const params = {
            Bucket: "sa-g4-proyecto",
            Key: pathFoto,
            Body: buffer,
            ContentType: "image",
            ACL: 'public-read'
        };
        const putResult = s3.putObject(params, function (err, data) {
            if (err) {
                console.error("Error al guardar imágen. Error JSON:", JSON.stringify(err, null, 2));
                res.send({ 'message': 'Error Subiendo Foto' });
            } else {
                console.log("Imagen subida con éxito.");
            }
        });

        infoBook.image = bucket + pathFoto;
    }

    const newBook = new book(infoBook);

    newBook
        .save()
        .then(result => {
            res.status(200).json({ status: "200", message: 'Libro guardado con éxito' });
        })
        .catch(err => {
            res.status(400).json({ message: err });
        });
}

const get_books = (req, res) => {
    book.find({ stock: { $gt: 0 } }, function (err, books) {
        if (err) {
            res.status(400).json({ message: err });
        }
        else {
            res.status(200).json({ status: 200, data: books });
        }
    })
}

const get_books_by_category = (req, res) => {
    let thename = req.body.category;
    book.find({ categories: { $regex: new RegExp(thename, "i") }, stock: { $gt: 0 } }, function (err, books) {
        if (err) {
            res.status(400).json({ message: err });
        }
        else {
            res.status(200).json({ status: 200, data: books });
        }
    })
}

const get_books_by_editorial_store = (req, res) => {
    let thename = req.body.editorial;
    book.find({ editorial:  thename, stock: { $gt: 0 }  }, function (err, books) {
        if (err) {
            res.status(400).json({ message: err });
        }
        else {
            res.status(200).json({ status: 200, data: books });
        }
    })
}

const get_books_by_editorial = (req, res) => {
    let thename = req.body.editorial;
    book.find({ editorial: thename }, function (err, books) {
        if (err) {
            res.status(400).json({ message: err });
        }
        else {
            res.status(200).json({ status: 200, data: books });
        }
    })
}

const get_book = (req, res) => {
    let id = req.params.idBook;
    book.find({ _id: id }, function (err, books) {
        if (err || !books) {
            res.status(400).json({ message: "Libro no econtrado" });
        } else {
            res.status(200).json({ status: 200, data: books[0] });
        }
    })
}

const delete_books = (req, res) => {

    book.deleteOne({ _id: req.body.idBook }, function (err, books) {
        if (err) {
            res.status(400).json({ message: "Delete Book Error: " + err });
        }
        else {
            res.status(200).json({ status: 200, message: "Libro eliminado" });
        }
    });
}

const update_books = (req, res) => {

    if (req.body.newImage) {
        let cover = req.body.image;

        cover = cover.split(',')[1];
        var idFoto = uuid();
        let pathFoto = "Fotos_Libros/" + idFoto + ".jpg";
        let buffer = new Buffer.from(cover, 'base64');


        const params = {
            Bucket: "sa-g4-proyecto",
            Key: pathFoto,
            Body: buffer,
            ContentType: "image",
            ACL: 'public-read'
        };
        const putResult = s3.putObject(params, function (err, data) {
            if (err) {
                console.error("Error al guardar imágen. Error JSON:", JSON.stringify(err, null, 2));
                res.send({ 'message': 'Error Subiendo Foto' }); return;
            } else {
                console.log("Imagen subida con éxito.");
            }
        });
        req.body.image = bucket + pathFoto;
    }


    const query = { _id: req.body.idBook };
    book.findOneAndUpdate(query, req.body, function (err, books) {
        if (err || !books) {
            res.status(400).json({ message: "Update Book Error: " + err });
        }
        else {
            res.status(200).json({ status: 200, message: "Libro modificado" });
        }
    })
}

const get_categories = (req, res) => {
    book.find().distinct('categories', function (err, books) {
        if (err) {
            res.status(400).json({ message: "Get Cagetories Error: " + err });
        } else {
            res.status(200).json({ status: 200, data: books });
        }
    })
}

const book_check_stock = (req, res) => {
    let id = req.body.idBook;
    let amount = req.body.amount;
    book.find({ _id: id }, function (err, books) {
        if (err || !books) {
            res.status(400).json({ message: "Libro no econtrado" });
        } else {
            let stock = books[0].stock;
            if (stock >= amount) {
                book.findOneAndUpdate({ _id: id }, { stock: stock-amount }, function (err, books) {
                    if (err || !books) {
                        res.status(400).json({ message: "No se logro modificar el stock: " + err });
                    } else {
                        res.status(200).json({ stock: stock, message: true });
                    }
                });
            } else {
                res.status(200).json({ stock: stock, message: false });
            }
        }
    })
}

module.exports = {
    home,
    home2,
    book_add,
    get_books,
    get_book,
    get_categories,
    delete_books,
    update_books,
    get_books_by_category,
    get_books_by_editorial,
    get_books_by_editorial_store,
    book_check_stock
}