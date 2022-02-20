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

router.post('/registerCarta', (req,res)=>{
    const{CARTA, NOMBRE, PRECIO, SIZE, IMAGEN, DESCRIPCION, INGREDIENTE} = req.body;
    mysqlConnection.query('INSERT INTO '+ CARTA +' (NOMBRE, PRECIO, TAMAÑO, IMAGEN, DESCRIPCION) VALUES (?, ?, ?, ?, ?)',
    [NOMBRE, PRECIO, SIZE, IMAGEN, DESCRIPCION],
    (err, rows, fields)=>{
        if(err){
            console.log(err);
        }
    });
    console.log(CARTA);
    console.log(typeof CARTA);
    
    if(CARTA == "pizza"|| CARTA == "entrantes"){
        INGREDIENTE.forEach((element)=> {
            mysqlConnection.query('INSERT INTO ' + CARTA +
            '_ingrediente (INGREDIENTE, ' + CARTA + ') SELECT ID_INGREDIENTE, MAX(ID_' + CARTA + ') FROM ingredientes, ' + CARTA + ' WHERE ingredientes.NOMBRE = ?;',
            [element],
            (err, rows, fileds)=>{
                if(err){
                    console.log(err);
                }
            });
        }); 
        
    }
     
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
});

router.post('/getCarta', (req,res)=>{
    const[CARTA]=req.body;
    mysqlConnection.query('SELECT ID_'+ CARTA +', NOMBRE FROM '+ CARTA + ' ORDER BY NOMBRE ASC;',
    (err, rows, fields)=>{
        if(!err){
            res.json(rows);
        }else{
            console.log(err);
        }
    });
});


module.exports = router;