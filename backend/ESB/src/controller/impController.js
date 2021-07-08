const controller = {};
const con = require('../config/connection');

const impuestos = 'http://'+process.env.IMPUESTOS+':3005';
const api = con(impuestos);

controller.get_paises = (req, res) => {
    console.log(impuestos+'/calc/todosCountry');
    api.get('/calc/todosCountry')
        .then(resp => {
            res.status(200).json(resp.data);

        }).catch(err => {
            console.log("ERROR: "+err);
            res.status(500).json({
                message: err
            });
        });
}

controller.resultado = (req, res) => {
    //const { cou, to } = req.query;

    const url = '/calc/impuesto';
    api.post(url, req.body).then(resp => {
        if (resp.status == 200) {
            res.status(200).json(resp.data);

        } else {
            res.status(500).json({
                message: resp.message
            });
        }

    }).catch(err => {
        console.log(err);
        res.status(500).json({
            message: err
        });
    });
}

/*controller.inicioS = (req, res) => {
    const { primoSelecto } = req.body;
    if(primoSelecto != "" && primoSelecto != null){
        res.redirect('/sort/sorteo?primo=' + primoSelecto + '&pert=0&vec=3&to=0');
    }else{
        res.redirect('/');
    }
}

controller.sorteo = (req, res) => {
    const { primo, pert, vec, to } = req.query;

    const url = '/findprimo?primo=' + primo;
    api.get(url)
        .then(resp => {
            //console.log("*********************************************Esto sale: " + resp.data[0].nombre);
            const nombre = resp.data[0].nombre;
            const perten = resp.data[0].pertenece;
            const id1 = resp.data[0].primoId;
            //const nombre = json.nombre;
            var sorteo = false;

            if (pert != 0) {
                sorteo = true;
                const url2 = '/primossorteo?perten=' + pert;
                api.get(url2)
                    .then(primazo => {
                        const id2 = primazo.data[0].primoId;;
                        const nombre2 = primazo.data[0].nombre;

                        if (vec >= 0) {
                            res.render('sorteo', {
                                primo: nombre,
                                primo2: nombre2,
                                progresos: "width: 1%",
                                sort: sorteo,
                                pertenece: perten,
                                pr1: id1,
                                pr2: id2,
                                vecc: vec
                            });
                        } else {
                            res.redirect('/sort/resultado?cou=' + id1 + '&to=' + to);
                        }
                    })
                    .catch(err => {
                        console.log(err);
                        res.render('login', {
                            err
                        });
                    });
            } else {
                if (vec >= 0) {
                    res.render('sorteo', {
                        primo: nombre,
                        primo2: '',
                        progresos: "width: 1%",
                        sort: sorteo,
                        pertenece: perten,
                        pr1: id1,
                        pr2: 0,
                        vecc: vec
                    });
                } else if (to != 0) {
                    res.redirect('/sort/resultado?cou=' + id1 + '&to=' + to);
                } else {
                    console.log('error');
                    res.render('login', {
                        err: 'error'
                    });
                }
            }

        }).catch(err => {

            console.log(err);
            res.render('login', {
                err
            });
        });
}

controller.resultado = (req, res) => {
    const { cou, to } = req.query;

    const url = '/primosrelacionar';
    api.post(url, {
        "cou": cou,
        "to": to
    }).then(resp => {
        if (resp.data.statusCode == 200) {
            let primo1;
            let primo2;
            const url2 = '/findprimo?primo=' + cou;
            api.get(url2)
                .then(resp => {
                    primo1 = resp.data[0].nombre;

                    const url3 = '/findprimo?primo=' + to;
                    api.get(url3)
                        .then(prim => {
                            primo2 = prim.data[0].nombre;


                            res.render('result', {
                                primo1: primo1,
                                primo2: primo2
                            });

                        }).catch(err => {
                            console.log(err);
                            res.render('login', {
                                err
                            });
                        });

                }).catch(err => {
                    console.log(err);
                    res.render('login', {
                        err
                    });
                });

        } else {
            res.render('login', {
                errors
            });
        }

    }).catch(err => {
        console.log(err);
        errors.push(err.message);
        res.render('login', {
            errors
        });
    });
}*/

module.exports = controller;