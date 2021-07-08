const controller = {};
const con = require('../config/connection');

const requestBooks = 'http://'+process.env.REQUEST+':3003';
const api = con(requestBooks);

controller.get_solicitudes = (req, res) => {
    api.get('/books-requests')
        .then(resp => {
            res.status(200).json(resp.data);

        }).catch(err => {
            console.log("ERROR: "+err);
            res.status(400).json({
                message: err
            });
        });
}

controller.add = (req, res) => {
    const url = '/book-request/add';
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
    const url = '/book-request/delete';
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