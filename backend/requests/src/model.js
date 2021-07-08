const mongoose = require('mongoose');

const schema_books_requests = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        default: "Desconocido"
    },
    author: {
        type: String,
        default: "Desconocido",
        required: true,
    },
    published: {
        type: String,
        default: "Desconocido",
        required: true,
    },
    image: {
        type: String,
        default: "Desconocido",
        required: true,
    }
});

module.exports = mongoose.model("books_resquests", schema_books_requests);