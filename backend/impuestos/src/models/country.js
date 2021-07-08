const mongoose = require('mongoose');

const country_Schema = new mongoose.Schema({
    pais: {
        type: String,
        required: [true, 'El pais es necesario']
    },
    porcentaje: {
        type: String,
        required: [true, 'El porcentaje es necesario']
    }
}, { collection: 'Pais' });

module.exports = mongoose.model("Pais", country_Schema);