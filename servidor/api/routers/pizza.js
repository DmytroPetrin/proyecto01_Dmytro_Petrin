const express = require('express');
const router = express.Router();

const mysqlConnection = require('../connections/connection');



router.get('/', (req, res)=>{
    mysqlConnection.query('select * from ingredientes', (err, rows, field) => {
        if(!err){
            //res.json(rows);
        }else{
            console.log(err);
        }
 
    });
});

router.post('/registerIngrediente', (req,res)=>{
    /*Con el postman envio los datos de post(req.body) en el query se busca
     este usuario en la base de datos
    cuando lo encuentre guarda los datos en rows de query*/
    const{NOMBRE, ALERGENO, IMAGEN} = req.body;
    mysqlConnection.query('INSERT INTO ingredientes (NOMBRE, ALERGENOS, IMAGEN) VALUES (?, ?, ?);',
     [NOMBRE, ALERGENO, IMAGEN], 
     (err,rows, fields) =>{
        if(!err){
            //res.json(rows);
        }else{
            console.log(err);
        }
     });
     
});

router.get('/getIngrediente', (req,res)=>{
    mysqlConnection.query('SELECT ID_INGREDIENTE, NOMBRE FROM ingredientes ORDER BY NOMBRE ASC;',
    (err, rows, fields)=>{
        if(!err){
            res.json(rows);
        }else{
            console.log(err);
        }
    });
})




module.exports = router;