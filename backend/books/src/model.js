const mongoose = require('mongoose');

const schema_libro = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        default: "Desconocido"
    },
    description: {
        type: String,
        default: "Desconocido",
        required: true,
    },
    editorial: {
        type: String,
        default: "Desconocido",
        required: true,
    },
    image: {
        type: String,
        default: "Desconocido",
        required: true,
    },
    published: {
        type: String,
        default: "Desconocido",
        required: true,
    },
    author: {
        type: String,
        default: "Desconocido",
        required: true,
    },
    price: {
        type: Number,
        default: 0,
        required: true,
    },
    stock: {
        type: Number,
        default: 0,
        required: true,
    },
    categories : [{
        type: String,
        default: "Desconocido",
        required: true,
    }]
    
});

module.exports = mongoose.model("book", schema_libro);