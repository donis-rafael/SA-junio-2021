'use strict'

require('dotenv').config();

var logger = require('morgan');
const express = require('express');
const mongoose = require('mongoose');
var cors = require('cors')

const app = express();
const port = process.env.PORT || 3000;

app.use(logger('dev'));

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors())

var login = require('./src/routes/login');
//var libros = require('./src/routes/libros');
var ordenes = require('./src/routes/ordenes');

app.use('/auth', login);
//app.use('/books', libros);
app.use('/orders', ordenes);

//const host = process.env.HOST || '35.192.185.7';
const host = '35.192.185.7';
const db = process.env.DB || 'BackendSAGrupo4';
const puerto = process.env.PORTdb || 27017;

const dbConnectionUrl = `mongodb://${host}:${puerto}/${db}`;
// const uri = "mongodb+srv://admin:admin@saproyecto.dymv8.mongodb.net/saproyecto?retryWrites=true&w=majority";
// Connect to Database
mongoose.connect(dbConnectionUrl,
    { useNewUrlParser: true, useUnifiedTopology: true },
    () => console.log("Conectado Correctamente")
).then(() => {
    app.listen(port);
    console.log('Servidor corriende en el puerto: ' + port);
});