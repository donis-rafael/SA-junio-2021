const usuario = require('../models/user');

const get_users = (req, res) => {
    usuario.find()
        .exec()
        .then(result => {
            res.status(200).json({ data: result });
        })
        .catch(err => {
            res.status(500).json({
                message: err
            });
        });
}

const registrar = (req, res) => {
    //{ nombre:string, apellido:string, correo:string, pwd:string, telefono:number }
    usuario.find({ email: req.body.email })
        .exec()
        .then(result => {
            res.status(202).json({ message: "El usuario " + result[0].email + " ya existe." });
        })
        .catch(err => {
            const newUser = new usuario({
                type: req.body.type,
                accepted: req.body.accepted,
                name: req.body.name,
                lastname: req.body.lastname,
                email: req.body.email,
                password: req.body.password,
                phone: req.body.phone,
                location: req.body.location
            });
            newUser
                .save()
                .then(result => {
                    res.status(201).json(result);
                })
                .catch(err => {
                    res.status(400).json({ message: "Error al ingresar el usuario" });
                });
        });
}

const registrarInterno = (req, res) => {
    //{ nombre:string, apellido:string, correo:string, pwd:string, telefono:number }
    usuario.find({ email: req.body.correo })
        .exec()
        .then(result => {
            res.status(400).json({ message: "El usuario " + result[0].email + " ya existe." });
        })
        .catch(err => {
            const newUser = new usuario({
                type: '4',
                accepted: 'true',
                name: req.body.nombre,
                lastname: req.body.apellido,
                email: req.body.correo,
                password: req.body.pwd,
                phone: req.body.telefono,
                location: 'Guatemala'
            });
            newUser
                .save()
                .then(result => {
                    res.status(201).json(result);
                })
                .catch(err => {
                    res.status(400).json({ message: "Error al ingresar el usuario" });
                });
        });
}

const login = (req, res) => {
    usuario.find({ email: req.body.email, password: req.body.password })
        .exec()
        .then(result => {
            res.status(200).json({ data: { nombre: result[0].name, id: result[0]._id, tipo: result[0].type, email: result[0].email, accepted: result[0].accepted } });
        })
        .catch(err => {
            res.status(404).json({ message: "El usuario no existe" });
        });
}

const remove = (req, res) => {
    usuario.deleteOne({
        _id: req.body._id
    })
        .exec()
        .then(result => {
            res.status(200).json({ message: 'Usuario eliminado con exito' });
        })
        .catch(err => {
            res.status(400).json({ message: 'No se pudo eliminar el usuario' });
        });
}

const accepted = (req, res) => {
    usuario.findByIdAndUpdate(
        req.body._id,
        { accepted: req.body.accepted }
    )
        .exec()
        .then(result => {
            res.status(200).json({ message: 'El usuario ha sido aceptado.' });
        })
        .catch(err => {
            res.status(400).json({ message: 'El usuario no ha sido aceptado.' });
        });
}


module.exports = {
    get_users: get_users,
    registrar: registrar,
    login: login,
    remove: remove,
    accepted: accepted
}