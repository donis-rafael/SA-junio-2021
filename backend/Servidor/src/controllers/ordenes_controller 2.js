const orden = require('../models/order');

const get_orders = (req, res) => {
    orden.find()
        .exec()
        .then(result => {
            res.status(200).json(result);
        })
        .catch(err => {
            res.status(400).json({
                message: err
            });
        });
}

const reg_order = (req, res) => {
    const newOrder = new orden({
        id: req.body.id,
        books: req.body.books,
        pago: req.body.pago
    });
    newOrder
        .save()
        .then(result => {
            res.status(200).json(result);
        })
        .catch(err => {
            res.status(400).json({ message: "Error al ingresar la orden - "+err.message });
        });
}

/*const login = (req, res) => {
    usuario.find({ email: req.body.email, password: req.body.password })
        .exec()
        .then(result => {
            res.status(200).json({ data: { nombre: result[0].name, id: result[0]._id, tipo: result[0].type } });
        })
        .catch(err => {
            res.status(404).json({ message: "El usuario no existe" });
        });
}

const remove = (req, res) => {
    usuario.deleteOne({
        usuario: req.body.usuario,
        nombre: req.body.nombre,
        type: req.body.type
    })
        .exec()
        .then(result => {
            res.status(200).json(result);
        })
        .catch(err => {
            res.status(500).json({
                message: err
            });
        });
}*/

module.exports = {
    get_orders: get_orders,
    reg_order: reg_order
}