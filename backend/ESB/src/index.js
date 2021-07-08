const express = require('express');
const path = require('path');
require('dotenv').config();
var cors = require('cors');
var logger = require('morgan');

const app = express();

//body parser
app.use(logger('dev'));
app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({limit: '50mb', extended: true }));
app.use(cors());

// routes
var countrys = require('./routes/impuestos');
var server = require('./routes/servidor');
var books = require('./routes/books');
var requestB = require('./routes/request');
var bitacora = require('./routes/bitacora');
var orders = require('./routes/orders');

app.use('/calc', countrys);
app.use('/auth', server);
app.use('/book', books);
app.use('/request', requestB);
app.use('/log', bitacora);
app.use('/orders', orders);

const port = process.env.PORT || 4091;

app.listen(port, console.log('Servidor corriendo en puerto '+port));