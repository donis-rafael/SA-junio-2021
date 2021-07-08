const nodemailer = require('nodemailer');
const orden = require('../models/order');
const estado = require('../models/state');
const usuario = require('../models/user');

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'grupo4SAVac@gmail.com',
        pass: 'grupo41234'
    }
});


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
        pago: req.body.pago,
        total: req.body.total,
        direccion: req.body.dir
    });
    newOrder
        .save()
        .then(result => {
            res.status(200).json(result);

            const correo = req.body.email || req.body.correo;
            if (correo) {
                const mailOptions = {
                    from: 'grupo4SAVac@gmail.com',
                    to: correo,
                    subject: 'Factura BookSA',
                    text: 'Gracias por comprar con BookSA!\n\nFactura generada\n\nLibros: ' + req.body.books.length + '\n\nTotal: ' + req.body.total
                };

                transporter.sendMail(mailOptions, function (error, info) {
                    if (error) {
                        console.log(error);
                    } else {
                        console.log('Email sent: ' + info.response);
                    }
                });
            }

        })
        .catch(err => {
            res.status(400).json({ message: "Error al ingresar la orden - " + err.message });
        });

}

const reg_state = (req, res) => {
    const newState = new estado({
        id_compra: req.body.id_compra,
        total: req.body.total,
        estado: req.body.estado
    });
    newState
        .save()
        .then(result => {
            res.status(200).json(result);
        })
        .catch(err => {
            res.status(400).json({ message: "Peticion incorrecta" });
        });
}

const upd_state = (req, res) => {
    estado.findOneAndUpdate({ id_compra: req.body.id_compra }, { estado: req.body.estado }, function (err, state) {
        if (err || !state) {
            res.status(400).json({ message: "Peticion incorrecta" });
        }
        else {
            res.status(200).json({});
        }
    })
}

const get_states = (req, res) => {
    estado.find()
        .exec()
        .then(result => {
            res.status(200).json({ data: result });
        })
        .catch(err => {
            res.status(400).json({ mensaje: "Petición incorrecta" });
        });
}

module.exports = {
    get_orders: get_orders,
    reg_order: reg_order,
    reg_state: reg_state,
    upd_state: upd_state,
    get_states: get_states
}