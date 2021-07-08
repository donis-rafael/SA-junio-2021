const controller = {};
const con = require('../config/connection');

const bitacora = 'http://'+process.env.BITACORA+':3004';
const api = con(bitacora);

controller.get_bitacoras = (req, res) => {
    api.get('/log/all')
        .then(resp => {
            res.status(200).json(resp.data);

        }).catch(err => {
            console.log("ERROR: "+err);
            res.status(400).json({
                message: err
            });
        });
}

controller.eliminarByUser = (req, res) => {
    const url = '/log/deletebyuser';
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

controller.eliminarAll = (req, res) => {
    const url = '/log/delete';
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

controller.buscar = (req, res) => {
    const url = '/log/search';
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

controller.guardar = (req, res) => {
    const url = '/log/save';
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

module.exports = controller;