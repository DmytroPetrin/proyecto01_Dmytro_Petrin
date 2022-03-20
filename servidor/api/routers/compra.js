const express = require('express');
const { stringify } = require('nodemon/lib/utils');
const router = express.Router();
const cors = require('cors');
const mysqlConnection = require('../connections/connection');


router.post('/registrarcompraLista',(req, res)=>{
    const{COMPRA, OFERTA, PIZZA, BEBIDA, ENTRANTES, POSTRES	}=req.body;
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
    const{RECOGIDA, CLIENTE, DESCRIPCION}=req.body;
    mysqlConnection.query('INSERT INTO compra (RECOGIDA, CLIENTE, DESCRIPCION) VALUES (?,?,?);',
    [RECOGIDA, CLIENTE, DESCRIPCION],
    (err, rows, field)=>{
        if(!err){
            mysqlConnection.query('SELECT MAX(ID_COMPRA) AS ID FROM compra;', (err, rows, field)=>{ 
                if(!err){
                    res.json(rows);
                }
                else{console.log(err);}
            });
            //res.json(rows);
        }else{
            console.log(err);
        }
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

//hay que terminar!!!!
router.post('/getcompraOferta', (req, res)=>{
    const{ID}=req.body;
    mysqlConnection.query('',
    [ID],
    (err, rows, field)=>{
        if(!err){
            res.json(rows);
        }else{
            console.log(err);
        }
    })
})

module.exports = router;