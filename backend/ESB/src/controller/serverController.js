const controller = {};
const con = require('../config/connection');

const servidor = 'http://' + process.env.SERVIDOR + ':3000';
const api = con(servidor);

controller.get_users = (req, res) => {
    api.get('/auth/userlist')
        .then(resp => {
            res.status(200).json(resp.data);

        }).catch(err => {
            console.log("ERROR: " + err);
            res.status(500).json({
                message: err
            });
        });
}

controller.login = (req, res) => {
    const url = '/auth/login';
    const body = {
        email: req.body.email,
        password: req.body.passwd
    }

    api.post(url, body).then(resp => {
        if (resp.status == 200) {
            let tipoo = parseInt(resp.data.data.tipo, 10);
            const respuesta = {
                data: {
                    id: resp.data.data.id,
                    nombre: resp.data.data.nombre,
                    tipo: tipoo
                }
            }
            console.log(respuesta);
            res.status(200).json(respuesta);

        } else {
            res.status(400).json({
                message: resp.message
            });
        }

    }).catch(err => {
        console.log(err);
        res.status(400).json({
            message: "El usuario no existe"
        });
    });
}

controller.registrar = (req, res) => {
    const url = '/auth/register';
    const body = {
        type: '4',
        accepted: 'true',
        name: req.body.nombre,
        lastname: req.body.apellido,
        email: req.body.correo,
        password: req.body.pwd,
        phone: req.body.telefono,
        location: 'Guatemala'
    }
    api.post(url, body).then(resp => {
        if (resp.status == 201) {
            res.status(200).json({
                message: "Usuario creado con éxito"
            });

        } else if (resp.status == 202) {
            res.status(400).json({
                message: "el Usuario ya existe"
            });

        } else {
            res.status(400).json({
                message: resp.message
            });
        }

    }).catch(err => {
        console.log(err);
        res.status(400).json({
            message: 'Ocurrió un error al insertar el usuario'
        });
    });
}

controller.aceptar = (req, res) => {
    const url = '/auth/accept';
    api.post(url, req.body).then(resp => {
        if (resp.status == 200) {
            res.status(200).json(resp.data);

        } else {
            res.status(400).json({
                message: resp.message
            });
        }

    }).catch(err => {
        console.log(err);
        res.status(400).json({
            message: err
        });
    });
}

controller.eliminar = (req, res) => {
    const url = '/auth/remove';
    api.post(url, req.body).then(resp => {
        if (resp.status == 200) {
            res.status(200).json(resp.data);

        } else {
            res.status(400).json({
                message: resp.message
            });
        }

    }).catch(err => {
        console.log(err);
        res.status(400).json({
            message: err
        });
    });
}

controller.crearOrden = (req, res) => {
    const url = '/orders/create';
    var arrayBooks = [];
    let mail = '';
    if (req.body.email) {
        mail = req.body.email
    }

    for (var i in req.body.books) {
        arrayBooks.push({
            id: req.body.books[i].id_libro,
            name: req.body.books[i].nombre,
            description: "muy buen libro",
            stock: req.body.books[i].stock,
            autor: req.body.books[i].autor,
            editorial: req.body.books[i].id_editorial,
            image: req.body.books[i].foto,
            price: req.body.books[i].precio,
            quantity: req.body.books[i].cantidad,
            categories: req.body.books[i].generos
        });
    }
    
    const body = {
        id: req.body.id_cliente,
        books: arrayBooks,
        pago: "tmp",
        total: req.body.total,
        dir: req.body.direccion,
        email: mail
    }
    api.post(url, body).then(resp => {
        if (resp.status == 200) {
            res.status(200).json({
                message: "Compra agregada satisfactoriamente",
                id_compra: resp.data._id
            });

        } else {
            res.status(400).json({
                message: resp.message
            });
        }

    }).catch(err => {
        console.log(err);
        res.status(400).json({
            message: "La compra no se realizó, verifique nuevamente su orden"
        });
    });
}

controller.get_orders = (req, res) => {
    api.get('/orders/all')
        .then(resp => {
            var arrayPedidos = [];

            for (var i in resp.data) {
                var arrayBooks = [];

                for (var j in resp.data[i].books) {
                    arrayBooks.push({
                        id_libro: resp.data[i].books[j].id,
                        nombre: resp.data[i].books[j].name,
                        generos: resp.data[i].books[j].categories,
                        stock: parseInt(resp.data[i].books[j].stock, 10),
                        autor: resp.data[i].books[j].autor,
                        id_editorial: resp.data[i].books[j].editorial,
                        foto: resp.data[i].books[j].image,
                        precio: parseInt(resp.data[i].books[j].price, 10),
                        cantidad: parseInt(resp.data[i].books[j].quantity, 10)
                    });
                }

                arrayPedidos.push({
                    id_compra: resp.data[i]._id,
                    id_cliente: resp.data[i].id,
                    total: parseInt(resp.data[i].total, 10),
                    direccion: resp.data[i].direccion,
                    books: arrayBooks
                });
            }

            res.status(200).json(arrayPedidos);

        }).catch(err => {
            console.log("ERROR: " + err);
            res.status(500).json({
                message: "No se obtuvieron las compras"
            });
        });
}

/**
 * Estados órdenes
 */
 controller.registrarEstado = (req, res) => {
    const url = '/orders/registrar-estado';
    api.post(url, req.body).then(resp => {
        if (resp.status == 200) {
            res.status(200).json(resp.data);

        } else {
            res.status(400).json({
                message: resp.message
            });
        }

    }).catch(err => {
        console.log(err);
        res.status(400).json({
            message: "Peticion incorrecta"
        });
    });
}

controller.actualizaEstado = (req, res) => {
    const url = '/orders/cambiar-estados';
    api.post(url, req.body).then(resp => {
        if (resp.status == 200) {
            res.status(200).json(resp.data);

        } else {
            res.status(400).json({
                message: resp.message
            });
        }

    }).catch(err => {
        console.log(err);
        res.status(400).json({
            message: "Peticion incorrecta"
        });
    });
}

 controller.get_estados = (req, res) => {
    api.get('/orders/estados')
        .then(resp => {
            res.status(200).json(resp.data);

        }).catch(err => {
            console.log("ERROR: " + err);
            res.status(400).json({
                mensaje: "Petición incorrecta"
            });
        });
}
module.exports = controller;