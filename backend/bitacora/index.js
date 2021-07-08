'use strict'

require('dotenv').config();

var logger = require('morgan');
const express = require('express');
const mongoose = require('mongoose');
var cors = require('cors')

const app = express();
const port = process.env.PORT || 3004;

app.use(logger('dev'));

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors())

var logs = require('./src/routes/bitacora_route');

app.use('/log', logs);

//const host = process.env.HOST || '35.192.185.7';
const host = '35.192.185.7';
const db = process.env.DB || 'BackendSAGrupo4';
const puerto = process.env.PORTdb || 27017;

const dbConnectionUrl = `mongodb://${host}:${puerto}/${db}`;

// Connect to Database
mongoose.connect(dbConnectionUrl,
    { useNewUrlParser: true, useUnifiedTopology: true },
    () => console.log("Conectado Correctamente")
).then(() => {
    app.listen(port);
    console.log('Servidor corriende en el puerto: ' + port);
});

module.exports = app;