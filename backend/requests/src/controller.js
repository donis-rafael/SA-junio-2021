const request = require('./model');

var uuid = require('uuid');
const AWS = require('aws-sdk');
const aws_keys = require('./creds');
const s3 = new AWS.S3(aws_keys.s3);
const bucket = 'https://sa-g4-proyecto.s3.us-east-2.amazonaws.com/';


const home = (req, res) => {
    res.send('<h2>Hola Mundo Books Requests- SA - Proyecto - G2</h2')
}


const request_add = (req, res) => {

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
            res.send({ 'message': 'Error Subiendo Foto' });
        } else {
            console.log("Imagen subida con éxito.");
        }
    });

    let infoRequest = req.body;
    infoRequest.image = bucket + pathFoto;

    const newRequest = new request(infoRequest);

    newRequest
        .save()
        .then(result => {
            res.status(200).json({ status: "200", message: 'Pedido guardado con éxito' });
        })
        .catch(err => {
            res.status(400).json({ message: err });
        });
}

const get_books = (req, res) => {
    request.find({}, function (err, requests) {
        if (err) {
            res.status(400).json({ message: err });
        }
        else {
            res.status(200).json({ status: 200, data: requests });
        }
    })
}

const delete_books = (req, res) => {

    request.deleteOne({ _id: req.body.idRequest }, function (err, books) {
        if (err) {
            res.status(400).json({ message: "Request Book Error: " + err });
        }
        else {
            res.status(200).json({ status: 200, message: "Petición eliminado" });
        }
    });
}

module.exports = {
    home,
    book_add: request_add,
    get_books,
    delete_books
}

// docker-compose -f "docker-compose.yml" up -d --build 
// docker-compose -f "docker-compose.yml" up --build 
// docker-compose up --build 
// docker-compose -f "docker-compose.yml" down