const mongoose = require('mongoose');

const order_Schema = new mongoose.Schema({
    id: {
        type: String,
        required: [true, 'El id del usuario es necesario']
    },
    books: [{
        id: String,
        name: String,
        description: String,
        editorial: String,
        stock: String,
        autor: String,
        image: String,
        price: String,
        quantity: String,
        categories: [String]
    }],
    pago: {
        titular: String,
        numero: String,
        fechaExp: {
            mm: String,
            yy: String
        },
        cvc: String
    },
    total: {
        type: String,
        required: [true, 'El total es necesario']
    },
    direccion: {
        type: String,
        required: [true, 'La direccion es necesaria']
    }
}, { collection: 'Orden' });

module.exports = mongoose.model("Orden", order_Schema);