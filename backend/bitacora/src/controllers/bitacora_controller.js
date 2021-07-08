// << db setup >>
const bitacora = require('../models/bitacora');

const deleteAll = (req, res) => {
    bitacora.deleteMany({})
        .exec()
        .then(result => {
            res.status(200).json({ mensaje: "Registros eliminados correctamente" });
        })
        .catch(err => {
            res.status(400).json({ mensaje: "Solicitud no procesada" });
        });
}

const deleteOne = (req, res) => {
    bitacora.deleteMany({
        email: req.body.email
    })
        .exec()
        .then(result => {
            bitacora.find()
                .exec()
                .then(result => {
                    res.status(200).json({ data: result, mensaje: "Registros eliminados correctamente" });
                })
                .catch(err => {
                    res.status(400).json({ mensaje: "Solicitd no procesada" });
                });
        })
        .catch(err => {
            res.status(400).json({ mensaje: "Solicitud no procesada" });
        });
}

const all = (req, res) => {
    bitacora.find()
        .exec()
        .then(result => {
            res.status(200).json({ data: result });
        })
        .catch(err => {
            res.status(400).json({ mensaje: "Solicitud no procesada" });
        });
}

const search = (req, res) => {
    bitacora.find({ email: req.body.email })
        .exec()
        .then(result => {
            res.status(200).json({ data: result });
        })
        .catch(err => {
            res.status(400).json({ mensaje: "Solicitud no procesada" });
        });
}

const save = (req, res) => {
    const newLog = new bitacora({
        username: req.body.username,
        email: req.body.email,
        fecha: req.body.fecha,
        mensaje: req.body.mensaje
    });
    newLog
        .save()
        .then(result => {
            res.status(200).json({ mensaje: "Registro guardado" });
        })
        .catch(err => {
            res.status(400).json({ mensaje: "Peticion incorrecta" });
        });
}

module.exports = {
    deleteAll: deleteAll,
    deleteOne: deleteOne,
    all, all,
    search: search,
    save: save
}