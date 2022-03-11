const express = require('express');
const { stringify } = require('nodemon/lib/utils');
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

router.post('/getCarta',  (req,res)=>{
    //console.log(req.body);
    const{CARTA}=req.body;
    mysqlConnection.query('SELECT ID_' + CARTA + ', NOMBRE FROM ' + CARTA + ' ORDER BY NOMBRE ASC;',
    (err, rows, fields)=>{
        if(!err){
            res.json(rows);
        }else{
            console.log(err);
        }
    });
});

/*
router.post('/registerOferta', (req,res)=>{
    //console.log(req.body);
    const{NOMBRE, PRECIO, IMAGEN, FECHA_FIN, DESCRIPCION, CARTA, CANTIDAD, NOMBRE_PLATO}=req.body;
    const num_carta= CARTA.length;
    
    const PIZZA = null;
    const BEBIDA = null;
    const POSTRES = null;
    const ENTRANTES = null;
    let i = 0;
    let j = 0;

  
    
    mysqlConnection.query('INSERT INTO oferta (NOMBRE, PRECIO, IMAGEN, FECHA_FIN, DESCRIPCION) VALUES(?,?,?,?,?);',
    [NOMBRE, PRECIO, IMAGEN, FECHA_FIN, DESCRIPCION],
    (err, rows, fields)=>{
        if(!err){
            //res.json(rows);
        }else{
            console.log(err);
        }
    });
  
    
   
    
    i = num_carta;
    while(i > 0){
      mysqlConnection.query('SELECT ID_' +  CARTA[i] + ' FROM ' +  CARTA[i] + " where NOMBRE = '" +  NOMBRE_PLATO[i] + "' LIMIT 1;",
      
       (err, rows, fields)=>{ 
       if(!err){
        const x = JSON.stringify(rows[0]);
         switch (CARTA[i]) {
             case 'pizza': {
               
               PIZZA=x.slice(12, x.length-1);
               break;
             }
             case 'bebida': {
               BEBIDA=x.slice(12, x.length-1);
               break;
             }
             case 'postres': {  

               POSTRES=x.slice(12, x.length-1);
               break;
             }
             case 'entrantes': {
               ENTRANTES=x.slice(12, x.length-1);
               break;
             }
           }
       }else{
            console.log(err);
       }
       });
       j = CANTIDAD[i]
        while (j>0){
           mysqlConnection.query('INSERT INTO oferta_lista (OFERTA, PIZZA, BEBIDA, ENTRANTES, POSTRES) SELECT MAX(OFERTA.ID_OFERTA), ?, ?, ?, ? FROM oferta;',
            [await PIZZA, await BEBIDA, await ENTRANTES, await POSTRES],
           (err, rows, fields)=>{
            if(!err){
                //res.json(rows);
            }else{
                console.log(err);
            }
           });
           --j;
       }
       --i; 
    }; 
*/

    router.post('/registerOferta',  async (req,res)=>{
        //console.log(req.body);
        const{NOMBRE, PRECIO, IMAGEN, FECHA_FIN, DESCRIPCION, CARTA, CANTIDAD, NOMBRE_PLATO}=req.body;
       
        
        mysqlConnection.query('INSERT INTO oferta (NOMBRE, PRECIO, IMAGEN, FECHA_FIN, DESCRIPCION) VALUES(?,?,?,?,?);',
        [NOMBRE, PRECIO, IMAGEN, FECHA_FIN, DESCRIPCION],
        (err, rows, fields)=>{
            if(!err){
                //res.json(rows);
            }else{
                console.log(err);
            }
        });
        
          await todoJ(CARTA, CANTIDAD, NOMBRE_PLATO);

           
    });
     
    async function todoJ (CARTA, CANTIDAD, NOMBRE_PLATO){
        var i = CARTA.length;
        while (i > 0){
            var {PIZZA, BEBIDA, POSTRES, ENTRANTES} = await obtenId(CARTA, i-1, NOMBRE_PLATO).then(function({PIZZA, BEBIDA, POSTRES, ENTRANTES}){
               
             return {PIZZA, BEBIDA, POSTRES, ENTRANTES}; });
             var j = CANTIDAD[i-1];
             while (j>0){
                 await meterDatos(PIZZA, BEBIDA, ENTRANTES, POSTRES).then(function(resultado){
                     return resultado;
                 });
              j--;
             }
         i--;
        }
       
    
         
    }

    function obtenId (CARTA, i, NOMBRE_PLATO){
        var PIZZA = null;
        var BEBIDA = null;
        var POSTRES = null;
        var ENTRANTES = null;
        return new Promise(function(resolve, reject) {
        mysqlConnection.query('SELECT ID_' +  CARTA[i] + ' FROM ' +  CARTA[i] + " where NOMBRE = '" +  NOMBRE_PLATO[i] + "' LIMIT 1;",
            (err, rows, fields)=>{ 
             if(!err){
              const x = JSON.stringify( rows[0]);
               switch (CARTA[i]) {
                   case 'pizza': {
                     PIZZA=x.slice(12, x.length-1);
                     return resolve({PIZZA, BEBIDA, POSTRES, ENTRANTES});
                     break;
                   }
                   case 'bebida': {
                     BEBIDA=x.slice(13, x.length-1);
                     return resolve({PIZZA, BEBIDA, POSTRES, ENTRANTES});
                     break;
                   }
                   case 'postres': {   
      
                     POSTRES=x.slice(14, x.length-1);
                     return resolve({PIZZA, BEBIDA, POSTRES, ENTRANTES});
                     break;
                   }
                   case 'entrantes': {
                     ENTRANTES=x.slice(16, x.length-1);
                     return resolve({PIZZA, BEBIDA, POSTRES, ENTRANTES});
                     break;
                   }
                 }
             }else{
                  return reject(console.log(err));
             }
          });
          
        });
          
    };




        function meterDatos (PIZZA, BEBIDA, ENTRANTES, POSTRES) {
            return new Promise(function(resolve, reject) {
             mysqlConnection.query('INSERT INTO oferta_lista (OFERTA, PIZZA, BEBIDA, ENTRANTES, POSTRES) SELECT MAX(OFERTA.ID_OFERTA), ?, ?, ?, ? FROM oferta;',
                  [ PIZZA,  BEBIDA,  ENTRANTES,  POSTRES],
                 (err, rows, fields)=>{
                  if(!err){
                      return resolve(console.log('datos introducidos'));
                  }else{
                      return reject(console.log(err));
                  }
                 });
                });
        }


   
  

module.exports = router;