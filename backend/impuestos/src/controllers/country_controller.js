// << db setup >>
const pais = require('../models/country');

const get_paises = (req, res) => {
    pais.find({}, '-_id pais')
        .exec()
        .then(result => {
            console.log("RESPUESTA: " + result);
            var arrayPaises = [];

            for (var i in result) {
                arrayPaises.push(result[i].pais);
            }

            const rr = {
                paises: arrayPaises
            }


            res.status(200).json(rr);
        })
        .catch(err => {
            res.status(500).json({
                message: err.message
            });
        });
}

const save_country = (req, res) => {
    pais.find({ pais: req.body.pais })
        .exec()
        .then(result => {
            res.status(500).json({ message: "El pais " + result[0].pais + " ya existe." });
        })
        .catch(err => {
            const newCountry = new pais({
                pais: req.body.pais,
                porcentaje: req.body.porcentaje
            });

            newCountry
                .save()
                .then(result => {
                    res.status(200).json(result);
                })
                .catch(err2 => {
                    res.status(500).json({ message: err2 });
                });
        });
}

const calc_impuesto = (req, res) => {
    pais.find({ pais: req.body.pais }, '-_id')
        .exec()
        .then(result => {
            var precio = parseInt(req.body.precio, 10);
            var porcentaje = parseInt(result[0].porcentaje, 10);
            var impuesto = porcentaje / 100;
            var total = precio + (precio * impuesto);

            const rrr = {
                porcentaje: result[0].porcentaje,
                calculo: total
            }

            res.status(200).json(rrr);
        })
        .catch(err => {
            res.status(500).json({
                message: err.message
            });
        });
}

const remove = (req, res) => {
    pais.deleteOne({
        pais: req.body.pais
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
}

module.exports = {
    get_paises: get_paises,
    save_country: save_country,
    calc_impuesto: calc_impuesto,
    remove: remove
}