const express = require('express');
const router = express.Router();

const mysqlConnection = require('../connections/connection');


router.post('/registrarcompraLista', (req, res) => {
    const { COMPRA, OFERTA, PIZZA, BEBIDA, ENTRANTES, POSTRES } = req.body;
    OFERTA.forEach(element => {
        mysqlConnection.query('INSERT INTO compra_lista(COMPRA, OFERTA) VALUE (?, ?);',
            [COMPRA, element],
            (err) => {
                if (err) { console.log(err); }
            });
    });

    PIZZA.forEach(element => {
        mysqlConnection.query('INSERT INTO compra_lista(COMPRA, PIZZA) VALUE (?, ?);',
            [COMPRA, element],
            (err) => {
                if (err) { console.log(err); }
            });
    });

    BEBIDA.forEach(element => {
        mysqlConnection.query('INSERT INTO compra_lista(COMPRA, BEBIDA) VALUE (?, ?);',
            [COMPRA, element],
            (err) => {
                if (err) { console.log(err); }
            });
    });

    ENTRANTES.forEach(element => {
        mysqlConnection.query('INSERT INTO compra_lista(COMPRA, ENTRANTES) VALUE (?, ?);',
            [COMPRA, element],
            (err) => {
                if (err) { console.log(err); }
            });
    });

    POSTRES.forEach(element => {
        mysqlConnection.query('INSERT INTO compra_lista(COMPRA, POSTRES) VALUE (?, ?);',
            [COMPRA, element],
            (err) => {
                if (err) { console.log(err); }
            });
    });
    res.json('listaCompra guardada');
});

//test
/*
router.post('/test', (req, res) => {
    //console.log(req);
    const {CLIENTE} = req.body;
    
    mysqlConnection.query('SELECT * FROM compra WHERE CLIENTE = ?;',
        [CLIENTE],
        (err,rows) => {
            if (!err) {
                res.json(rows);
            }
         else {
            console.log(err);
        }
        });
    });
*/

router.post('/registrarCompra', (req, res) => {
    const { CLIENTE } = req.body;
    mysqlConnection.query('INSERT INTO compra (CLIENTE) VALUES (?);',
        [CLIENTE],
        (err, rows) => {
            if (!err) { //res.json(rows);
                mysqlConnection.query('SELECT ID_COMPRA  FROM compra WHERE CLIENTE = ? AND FECHA_HORA = (SELECT MAX(C.FECHA_HORA) FROM compra C WHERE C.CLIENTE = ?);',
                    [CLIENTE, CLIENTE],
                    (err2, rows) => {
                        if (!err2) {
                            res.json(rows);
                        } else {
                            console.log(err2);
                        }
                    });
            } else {
                console.log(err);
            }
        });
});


router.get('/getIdCliente', (req, res) => {
    mysqlConnection.query('SELECT MAX(ID_COMPRA) AS ID FROM compra;', (err, rows, field) => {
        if (!err) {
            res.json(rows);
        }
        else { console.log(err); }
    });
});


router.post('/registrarModificacion', (req, res) => {
    var num = 0;
    const { COMPRA, arr_extra } = req.body;
    arr_extra.forEach(element => {
        switch (element.producto) {
            case "PIZZA": {
                if (element.comentario != '') {
                    mysqlConnection.query('INSERT INTO modificado (NUM_MOD, COMPRA, PIZZA, COMENTARIO) VALUES (?, ?, ?, ?);',
                        [num, COMPRA, element.id, element.comentario],
                        (err) => {
                            if (err) {
                                console.log(err);
                            }
                        });
                }
                element.extra.forEach(element2 => {
                    mysqlConnection.query('INSERT INTO modificado (NUM_MOD, COMPRA, PIZZA, EXTRAS) VALUES (?, ?, ?, (SELECT ID_EXTRA FROM extras where INGREDIENTE = ?));',
                        [num, COMPRA, element.id, element2],
                        (err) => {
                            if (err) {
                                console.log(err);
                            }
                        });
                });
                num++;
                break;
            }
            case "ENTRANTES": {
                if (element.comentario != '') {
                    mysqlConnection.query('INSERT INTO modificado (NUM_MOD, COMPRA, ENTRANTES, COMENTARIO) VALUES (?, ?, ?, ?);',
                        [num, COMPRA, element.id, element.comentario],
                        (err) => {
                            if (err) {
                                console.log(err);
                            }
                        });
                }
                element.extra.forEach(element2 => {
                    mysqlConnection.query('INSERT INTO modificado (NUM_MOD, COMPRA, ENTRANTES, EXTRAS) VALUES (?, ?, ?, (SELECT ID_EXTRA FROM extras where INGREDIENTE = ?));',
                        [num, COMPRA, element.id, element2],
                        (err) => {
                            if (err) {
                                console.log(err);
                            }
                        });
                });
                num++;
                break;
            }
            case "OFERTA": {
                if (element.pizzaOferta != 0) {
                    if (element.comentario != '') {
                        mysqlConnection.query('INSERT INTO modificado (NUM_MOD, COMPRA, OFERTA, PIZZA, COMENTARIO) VALUES (?, ?, ?, ?, ?);',
                            [num, COMPRA, element.id, element.pizzaOferta, element.comentario],
                            (err) => {
                                if (err) {
                                    console.log(err);
                                }
                            });
                    }
                    element.extra.forEach(element2 => {
                        mysqlConnection.query('INSERT INTO modificado (NUM_MOD, COMPRA, OFERTA, PIZZA, EXTRAS) VALUES (?, ?, ?, ?, (SELECT ID_EXTRA FROM extras where INGREDIENTE = ?));',
                            [num, COMPRA, element.id, element.pizzaOferta, element2],
                            (err) => {
                                if (err) {
                                    console.log(err);
                                }
                            });
                    });
                    num++;
                }
                else if (element.entranteOferta != 0) {
                    if (element.comentario != '') {
                        mysqlConnection.query('INSERT INTO modificado (NUM_MOD, COMPRA, OFERTA, ENTRANTES, COMENTARIO) VALUES (?, ?, ?, ?, ?);',
                            [num, COMPRA, element.id, element.entranteOferta, element.comentario],
                            (err) => {
                                if (err) {
                                    console.log(err);
                                }
                            });
                    }
                    element.extra.forEach(element2 => {
                        mysqlConnection.query('INSERT INTO modificado (NUM_MOD, COMPRA, OFERTA, ENTRANTES, EXTRAS) VALUES (?, ?, ?, ?, (SELECT ID_EXTRA FROM extras where INGREDIENTE = ?));',
                            [num, COMPRA, element.id, element.entranteOferta, element2],
                            (err) => {
                                if (err) {
                                    console.log(err);
                                }
                            });
                    });
                    num++;
                }
                break;
            }
        }
    });

    res.json('extras guardadas');

});


router.post('/getcompraOferta', (req, res) => {
    const { ID } = req.body;
    mysqlConnection.query('(SELECT P.ID_PIZZA AS ID, P.NOMBRE, P.PRECIO, P.TAMAÑO AS SIZE, P.DESCRIPCION, P.IMAGEN FROM oferta_lista OL, pizza P WHERE OL.OFERTA = 34 AND OL.PIZZA = P.ID_PIZZA) UNION ALL (SELECT E.* FROM oferta_lista OL, entrantes E WHERE OL.OFERTA = 34 AND OL.ENTRANTES = E.ID_ENTRANTES);',
        [ID],
        (err, rows, field) => {
            if (!err) {
                res.json(rows);
            } else {
                console.log(err);
            }
        })
});

//pestaña pago
router.post('/guardarPago', (req, res) => {
    const { COMPRA, TARJETA, EFECTIVO, RECOGIDA } = req.body;
    mysqlConnection.query('INSERT INTO pago(COMPRA, TARJETA, EFECTIVO, RECOGIDA, TOTAL_PAGO) VALUES(?, ?, ?, ?, (SELECT '+
        'IFNULL((SELECT SUM(E.PRECIO) FROM extras AS E '+ 
        'INNER JOIN(SELECT EXTRAS FROM modificado WHERE COMPRA = ? AND EXTRAS IS NOT NULL) AS Q '+
        'ON E.ID_EXTRA = Q.EXTRAS), 0) + '+
        'IFNULL((SELECT SUM(P.PRECIO) FROM pizza AS P '+
        'INNER JOIN(SELECT PIZZA FROM compra_lista WHERE COMPRA = ? AND PIZZA IS NOT NULL) AS Q '+
        'ON P.ID_PIZZA = Q.PIZZA), 0) + '+
        'IFNULL((SELECT SUM(EN.PRECIO) FROM entrantes AS EN '+
        'INNER JOIN(SELECT ENTRANTES FROM compra_lista WHERE COMPRA = ? AND ENTRANTES IS NOT NULL) AS Q '+
        'ON EN.ID_ENTRANTES = Q.ENTRANTES), 0) + '+
        'IFNULL((SELECT SUM(B.PRECIO) FROM bebida AS B '+
        'INNER JOIN(SELECT BEBIDA FROM compra_lista WHERE COMPRA = ? AND BEBIDA IS NOT NULL) AS Q '+
        'ON B.ID_BEBIDA = Q.BEBIDA), 0) + '+
        'IFNULL((SELECT SUM(PO.PRECIO) FROM postres AS PO '+
        'INNER JOIN(SELECT POSTRES FROM compra_lista WHERE COMPRA = ? AND POSTRES IS NOT NULL) AS Q '+
        'ON PO.ID_POSTRES = Q.POSTRES), 0) + '+
        'IFNULL((SELECT SUM(O.PRECIO) FROM oferta AS O '+
        'INNER JOIN(SELECT OFERTA FROM compra_lista WHERE COMPRA = ? AND OFERTA IS NOT NULL) AS Q '+
        'ON O.ID_OFERTA = Q.OFERTA), 0)));',
    [COMPRA, TARJETA, EFECTIVO, RECOGIDA, COMPRA, COMPRA, COMPRA, COMPRA, COMPRA, COMPRA],
    (err, rows) => {
        if (!err) {
            res.json(rows);
        } else {
            console.log(err);
        }
    });
});

router.post('/getCompra', (req, res) => {
    const { ID } = req.body;
    mysqlConnection.query("(SELECT 'O' AS QUE, COUNT(*) AS CANTIDAD, O.ID_OFERTA AS ID, O.NOMBRE, O.IMAGEN, O.PRECIO, NULL AS SIZE FROM oferta AS O "+
    "INNER JOIN (SELECT OFERTA FROM compra_lista WHERE OFERTA IS NOT NULL AND COMPRA = ?) AS Q "+
    "ON O.ID_OFERTA = Q.OFERTA GROUP BY O.ID_OFERTA HAVING COUNT(*)) UNION "+
    "(SELECT 'P' AS QUE, COUNT(*) AS CANTIDAD, P.ID_PIZZA, P.NOMBRE, P.IMAGEN, P.PRECIO, P.TAMAÑO FROM pizza AS P "+
    "INNER JOIN (SELECT PIZZA FROM compra_lista WHERE PIZZA IS NOT NULL AND COMPRA = ?) AS Q "+
    "ON P.ID_PIZZA = Q.PIZZA GROUP BY P.ID_PIZZA HAVING COUNT(*)) UNION "+
    "(SELECT 'E' AS QUE, COUNT(*) AS CANTIDAD, E.ID_ENTRANTES, E.NOMBRE, E.IMAGEN, E.PRECIO, E.TAMAÑO FROM entrantes AS E "+
    "INNER JOIN (SELECT ENTRANTES FROM compra_lista WHERE ENTRANTES IS NOT NULL AND COMPRA = ?) AS Q "+
    "ON E.ID_ENTRANTES = Q.ENTRANTES GROUP BY E.ID_ENTRANTES HAVING COUNT(*)) UNION "+
    "(SELECT 'PO' AS QUE, COUNT(*) AS CANTIDAD, PO.ID_POSTRES, PO.NOMBRE, PO.IMAGEN, PO.PRECIO, PO.TAMAÑO FROM postres AS PO "+
    "INNER JOIN (SELECT POSTRES FROM compra_lista WHERE POSTRES IS NOT NULL AND COMPRA = ?) AS Q "+
    "ON PO.ID_POSTRES = Q.POSTRES GROUP BY PO.ID_POSTRES HAVING COUNT(*)) UNION "+
    "(SELECT 'B' AS QUE, COUNT(*) AS CANTIDAD, B.ID_BEBIDA, B.NOMBRE, B.IMAGEN, B.PRECIO, B.TAMAÑO FROM bebida AS B "+
    "INNER JOIN (SELECT BEBIDA FROM compra_lista WHERE BEBIDA IS NOT NULL AND COMPRA = ?) AS Q "+
    "ON B.ID_BEBIDA = Q.BEBIDA GROUP BY B.ID_BEBIDA HAVING COUNT(*));",
        [ID, ID, ID, ID, ID],
        (err, rows) => {
            if (!err) {
                res.json(rows);
            } else {
                console.log(err);
            }
        });
});

router.post('/getModificado', (req, res) => {
    const { ID } = req.body;
    mysqlConnection.query('(SELECT M.*, E.PRECIO, E.IMAGEN, I.ID_INGREDIENTE, I.NOMBRE, I.ALERGENOS FROM modificado M INNER JOIN EXTRAS E ON E.ID_EXTRA = M.EXTRAS INNER JOIN ingredientes I ON E.INGREDIENTE = I.ID_INGREDIENTE WHERE M.COMPRA = ?) UNION ALL (SELECT *, NULL, NULL, NULL, NULL, NULL FROM modificado WHERE COMPRA = ? AND COMENTARIO IS NOT NULL) ORDER BY NUM_MOD;',
        [ID, ID],
        (err, rows) => {
            if (!err) {
                res.json(rows);
            } else {
                console.log(err);
            }
        });
});

//muestra lo que tiene oferta, despues puedo meter dentro de ciclo y mostrar si tiene alguna extra
router.post('/getListaOferta', (req, res)=>{
    const {ID} = req.body;
    mysqlConnection.query("(SELECT OL.*, COUNT(*) AS CANTIDAD, P.NOMBRE, P.PRECIO, P.IMAGEN FROM OFERTA_LISTA OL "+
    "INNER JOIN PIZZA P "+
    "ON P.ID_PIZZA = OL.PIZZA "+
    "INNER JOIN COMPRA_LISTA CL "+
    "ON CL.OFERTA = OL.OFERTA "+
    "WHERE CL.COMPRA = ? GROUP BY OL.PIZZA HAVING COUNT(*)) UNION "+
    "(SELECT OL.*, COUNT(*) AS CANTIDAD, E.NOMBRE, E.PRECIO, E.IMAGEN FROM OFERTA_LISTA OL "+
    "INNER JOIN ENTRANTES E "+
    "ON E.ID_ENTRANTES = OL.ENTRANTES "+
    "INNER JOIN COMPRA_LISTA CL "+
    "ON CL.OFERTA = OL.OFERTA "+
    "WHERE CL.COMPRA = ? GROUP BY OL.ENTRANTES HAVING COUNT(*)) UNION "+
    "(SELECT OL.*, COUNT(*) AS CANTIDAD, B.NOMBRE, B.PRECIO, B.IMAGEN FROM OFERTA_LISTA OL "+
    "INNER JOIN bebida B "+
    "ON B.ID_BEBIDA = OL.BEBIDA "+
    "INNER JOIN COMPRA_LISTA CL "+
    "ON CL.OFERTA = OL.OFERTA "+
    "WHERE CL.COMPRA = ? GROUP BY OL.BEBIDA HAVING COUNT(*)) UNION "+
    "(SELECT OL.*, COUNT(*) AS CANTIDAD, PO.NOMBRE, PO.PRECIO, PO.IMAGEN FROM OFERTA_LISTA OL "+ 
    "INNER JOIN postres PO "+
    "ON PO.ID_POSTRES = OL.POSTRES "+
    "INNER JOIN COMPRA_LISTA CL "+
    "ON CL.OFERTA = OL.OFERTA "+
    "WHERE CL.COMPRA = ? GROUP BY OL.POSTRES HAVING COUNT(*));",
    [ID, ID, ID, ID],
    (err, rows) => {
        if(!err){
            res.json(rows);
        } else {
            console.log(err);
        }
    });
});

router.post('/getPrecioT', (req, res)=>{
    const{ID} =req.body;
    mysqlConnection.query('SELECT '+
    'IFNULL((SELECT SUM(E.PRECIO) FROM extras AS E '+ 
    'INNER JOIN(SELECT EXTRAS FROM modificado WHERE COMPRA = ? AND EXTRAS IS NOT NULL) AS Q '+
    'ON E.ID_EXTRA = Q.EXTRAS), 0) + '+
    'IFNULL((SELECT SUM(P.PRECIO) FROM pizza AS P '+
    'INNER JOIN(SELECT PIZZA FROM compra_lista WHERE COMPRA = ? AND PIZZA IS NOT NULL) AS Q '+
    'ON P.ID_PIZZA = Q.PIZZA), 0) + '+
    'IFNULL((SELECT SUM(EN.PRECIO) FROM entrantes AS EN '+
    'INNER JOIN(SELECT ENTRANTES FROM compra_lista WHERE COMPRA = ? AND ENTRANTES IS NOT NULL) AS Q '+
    'ON EN.ID_ENTRANTES = Q.ENTRANTES), 0) + '+
    'IFNULL((SELECT SUM(B.PRECIO) FROM bebida AS B '+
    'INNER JOIN(SELECT BEBIDA FROM compra_lista WHERE COMPRA = ? AND BEBIDA IS NOT NULL) AS Q '+
    'ON B.ID_BEBIDA = Q.BEBIDA), 0) + '+
    'IFNULL((SELECT SUM(PO.PRECIO) FROM postres AS PO '+
    'INNER JOIN(SELECT POSTRES FROM compra_lista WHERE COMPRA = ? AND POSTRES IS NOT NULL) AS Q '+
    'ON PO.ID_POSTRES = Q.POSTRES), 0) + '+
    'IFNULL((SELECT SUM(O.PRECIO) FROM oferta AS O '+
    'INNER JOIN(SELECT OFERTA FROM compra_lista WHERE COMPRA = ? AND OFERTA IS NOT NULL) AS Q '+
    'ON O.ID_OFERTA = Q.OFERTA), 0) as PRECIO;',
    [ID, ID, ID, ID, ID, ID],
    (err, rows)=>{
        if(!err){
            res.json(rows);
        } else{
            console.log(err);
        }
    });
});

module.exports = router;