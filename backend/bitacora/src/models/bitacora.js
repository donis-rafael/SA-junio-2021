const mongoose = require('mongoose');

const country_Schema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, 'El username es necesario']
    },
    email: {
        type: String,
        required: [true, 'El email es necesario']
    },
    fecha: {
        type: String,
        required: [true, 'La fecha es necesario']
    },
    mensaje: {
        type: String,
        required: [true, 'La bitacora es necesaria']
    }
}, { collection: 'Bitacora' });

module.exports = mongoose.model("bitacora", country_Schema);