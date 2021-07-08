const mongoose = require('mongoose');

const estado_Schema = new mongoose.Schema({
    id_compra: {
        type: String,
        required: [true, 'El id de la compra es necesaria']
    },
    total: {
        type: String,
        required: [true, 'El total es necesario']
    },
    estado: {
        type: String,
        required: [true, 'El estado es necesario']
    }
}, { collection: 'Estado' });

module.exports = mongoose.model("Estado", estado_Schema);