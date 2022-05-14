const express = require('express');
const { stringify } = require('nodemon/lib/utils');
const router = express.Router();

const mysqlConnection = require('../connections/connection');


router.post('/registrarcompraLista',(req, res)=>{
const{COMPRA, OFERTA, PIZZA, BEBIDA, ENTRANTES, POSTRES}=req.body;
OFERTA.forEach(element => {
    mysqlConnection.query('INSERT INTO compra_lista(COMPRA, OFERTA) VALUE (?, ?);',
    [COMPRA, element],
    (err)=>{
        if(err){console.log(err);}
    });
});

PIZZA.forEach(element => {
    mysqlConnection.query('INSERT INTO compra_lista(COMPRA, PIZZA) VALUE (?, ?);',
    [COMPRA, element],
    (err)=>{
        if(err){console.log(err);}
    });
});

BEBIDA.forEach(element => {
    mysqlConnection.query('INSERT INTO compra_lista(COMPRA, BEBIDA) VALUE (?, ?);',
    [COMPRA, element],
    (err)=>{
        if(err){console.log(err);}
    });
});

ENTRANTES.forEach(element => {
    mysqlConnection.query('INSERT INTO compra_lista(COMPRA, ENTRANTES) VALUE (?, ?);',
    [COMPRA, element],
    (err)=>{
        if(err){console.log(err);}
    });
});

POSTRES.forEach(element => {
    mysqlConnection.query('INSERT INTO compra_lista(COMPRA, POSTRES) VALUE (?, ?);',
    [COMPRA, element],
    (err)=>{
        if(err){console.log(err);}
    });
});
res.json('listaCompra guardadad');
 });

router.post('/registrarCompra', (req, res) => {
    const { CLIENTE } = req.body;
    mysqlConnection.query('INSERT INTO compra (CLIENTE) VALUES (?);',
        [CLIENTE],
        (err) => {
            if (!err) {
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

router.get('/getIdCliente', (req, res)=>{
    mysqlConnection.query('SELECT MAX(ID_COMPRA) AS ID FROM compra;', (err, rows, field)=>{ 
                if(!err){
                    res.json(rows);
                }
                else{console.log(err);}
            });
});

//SIN COMPROBAR
router.post('/registrarModificacion',(req, res)=>{
    const{COMPRA, arr_extra, DESCRIPCION} = req.body;
    arr_extra.forEach(element =>{
        switch (element.producto){
            case "PIZZA":{
                element.extra.forEach(element2 =>{
                    mysqlConnection.query('INSERT INTO modificado (COMPRA, PIZZA, EXTRAS) VALUES (?, ?, ?);',
                    [COMPRA, element.id, element2],
                    (err)=>{
                        if(err){
                            console.log(err);
                        }
                    });
                });
                break;
            }
            case "ENTRANTES":{
                element.extra.forEach(element2 =>{
                    mysqlConnection.query('INSERT INTO modificado (COMPRA, ENTRANTES, EXTRAS) VALUES (?, ?, ?);',
                    [COMPRA, element.id, element2],
                    (err)=>{
                        if(err){
                            console.log(err);
                        }
                    });
                });
                break;
            }
            case "OFERTA":{
                if(element.pizzaOferta !=0){
                    element.extra.forEach(element2 =>{
                        mysqlConnection.query('INSERT INTO modificado (COMPRA, OFERTA, PIZZA, EXTRAS) VALUES (?, ?, ?);',
                        [COMPRA, element.id, element.pizzaOferta, element2],
                        (err)=>{
                            if(err){
                                console.log(err);
                            }
                        });
                    });
                }
                else if(element.entranteOferta !=0){
                    element.extra.forEach(element2 =>{
                        mysqlConnection.query('INSERT INTO modificado (COMPRA, OFERTA, ENTRANTES, EXTRAS) VALUES (?, ?, ?);',
                        [COMPRA, element.id, element.entranteOferta, element2],
                        (err)=>{
                            if(err){
                                console.log(err);
                            }
                        });
                    });
                }
                break;
            }
        }
    });

   res.json(rows);

});


router.post('/getcompraOferta', (req, res)=>{
    const{ID}=req.body;
    mysqlConnection.query('(SELECT P.ID_PIZZA AS ID, P.NOMBRE, P.PRECIO, P.TAMAÑO AS SIZE, P.DESCRIPCION, P.IMAGEN FROM oferta_lista OL, pizza P WHERE OL.OFERTA = 34 AND OL.PIZZA = P.ID_PIZZA) UNION ALL (SELECT E.* FROM oferta_lista OL, entrantes E WHERE OL.OFERTA = 34 AND OL.ENTRANTES = E.ID_ENTRANTES);',
    [ID],
    (err, rows, field)=>{
        if(!err){
            res.json(rows);
        }else{
            console.log(err);
        }
    })
});

module.exports = router;