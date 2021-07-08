const mongoose = require('mongoose');

const user_Schema = new mongoose.Schema({
    type: {
        type: String,
        required: [true, 'El tipo es necesario']
    },
    accepted: {
        type: String,
        required: [true, 'El tipo de cliente es necesario']
    },
    name: {
        type: String,
        required: [true, 'El nombre es necesario']
    },
    lastname: {
        type: String,
        required: [true, 'El apellido es necesario']
    },
    email: {
        type: String,
        required: [true, 'El email es necesario']
    },
    password: {
        type: String,
        required: [true, 'La contraseña es necesaria']
    },
    phone: {
        type: Number,
        required: [true, 'El telefono es necesario']
    },
    location: {
        type: String,
        required: [true, 'La direccion es necesaria']
    }
}, { collection: 'Usuario' });

module.exports = mongoose.model("Usuario", user_Schema);