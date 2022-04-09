const express = require('express');
const { stringify } = require('nodemon/lib/utils');
const router = express.Router();

const mysqlConnection = require('../connections/connection');


router.post('/registrarcompraLista',(req, res)=>{

    const{COMPRA, OFERTA, PIZZA, BEBIDA, ENTRANTES, POSTRES}=req.body;
    mysqlConnection.query('INSERT INTO compra_lista(COMPRA, OFERTA, PIZZA, BEBIDA, ENTRANTES, POSTRES) VALUE (?, ?, ?, ?, ?, ?);',
    [COMPRA, OFERTA, PIZZA, BEBIDA, ENTRANTES, POSTRES	],
    (err, rows, field)=>{
        if(!err){
            //res.json(rows);
        }else{
            console.log(err);
        }
    });
});

router.post('/registrarCompra',(req, res)=>{
    const{CLIENTE}=req.body;
    mysqlConnection.query('INSERT INTO compra (CLIENTE) VALUES (?);',
    [CLIENTE],
    (err, rows, field)=>{
        if(!err){
            //res.json('guardado');
        }else{
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

router.post('/registrarModificacion',(req, res)=>{
    const{COMPRA, PIZZA, ENTRANTES, EXTRAS, COMENTARIO, NUM_MOD}=req.body;
    mysqlConnection.query('INSERT INTO modificado (COMPRA, PIZZA, ENTRANTES, EXTRAS, COMENTARIO, NUM_MOD) VALUES (?, ?, ?, ?, ?, ?);',
    [COMPRA, PIZZA, ENTRANTES, EXTRAS, COMENTARIO, NUM_MOD],
    (err, rows, field)=>{
        if(!err){
            //res.json(rows);
        }else{
            console.log(err);
        }
    });
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