const express = require('express');
const router = express.Router();

const mysqlConnection = require('../connections/connection');

router.get('/', (req, res)=>{
    mysqlConnection.query('select * from user', (err, rows, field) => {
        if(!err){
            res.json(rows);
        }else{
            console.log(err);
        }
 
    });
});

router.post('/signin', (req, res)=>{
   // console.log(req.body);
    const {nombre, contraseña} = req.body;
    mysqlConnection.query('SELECT * FROM USER WHERE NOMBRE=? AND CONTRASEÑA=?',
    [nombre, contraseña],
    (err, rows, fields)=>{
        if(!err){
            console.log(rows);
        }else{
            console.log(err);
        }
    })
});

module.exports = router;