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
            res.json(rows);
        }else{
            console.log(err);
        }
     });
     
});

router.post('/registerExtra', (req,res)=>{
    const{IMAGEN2, PRECIO} = req.body;
    mysqlConnection.query('INSERT INTO extras(INGREDIENTE, IMAGEN, PRECIO) SELECT MAX(ID_INGREDIENTE), ?, ? FROM ingredientes',
     [IMAGEN2, PRECIO], 
     (err,rows, fields) =>{
        if(!err){
            res.json(rows);
        }else{
            console.log(err);
        }
     });
     
});

router.get('/getExtra', (req, res)=>{
    mysqlConnection.query('SELECT E.*, I.NOMBRE, I.IMAGEN AS IMAGEN2, I.ALERGENOS FROM extras E, INGREDIENTES I WHERE E.INGREDIENTE = I.ID_INGREDIENTE ORDER BY I.NOMBRE;',
    (err, rows, field)=>{
        if(!err){
            res.json(rows);
        }else{
            console.log(err);
        }
    });
});

router.get('/getCartabyid', (req,res)=>{ 
    
    mysqlConnection.query('(SELECT "P" AS QUE, COUNT(*) AS CANTIDAD, ol.OFERTA as OFERTA, P.ID_PIZZA AS ID, P.NOMBRE, P.TAMAÑO FROM pizza P, oferta_lista OL where P.ID_PIZZA = OL.PIZZA GROUP BY OL.PIZZA, OL.OFERTA HAVING COUNT(*)) UNION (SELECT "E" AS QUE, COUNT(*) AS CANTIDAD, ol.OFERTA as OFERTA, P.ID_ENTRANTES, P.NOMBRE, P.TAMAÑO FROM entrantes P, oferta_lista OL where P.ID_ENTRANTES = OL.ENTRANTES GROUP BY OL.ENTRANTES, OL.OFERTA HAVING COUNT(*)) UNION (SELECT "B" AS QUE, COUNT(*) AS CANTIDAD, ol.OFERTA as OFERTA, P.ID_BEBIDA, P.NOMBRE, P.TAMAÑO FROM bebida P, oferta_lista OL where P.ID_BEBIDA = OL.BEBIDA GROUP BY OL.BEBIDA, OL.OFERTA HAVING COUNT(*)) UNION (SELECT "PO" AS QUE, COUNT(*) AS CANTIDAD, ol.OFERTA as OFERTA, P.ID_POSTRES, P.NOMBRE, P.TAMAÑO FROM postres P, oferta_lista OL where P.ID_POSTRES = OL.POSTRES GROUP BY OL.POSTRES, OL.OFERTA HAVING COUNT(*));',
     (err,rows, fields) =>{
        if(!err){
            
           res.json(rows);
           
        }else{
            console.log(err);
        }
     });
          
});

router.get('/getIngredientebyid', (req,res)=>{ 
    
    mysqlConnection.query('(SELECT "P" AS PE, PI.PIZZA AS ID, I.* FROM ingredientes I, PIZZA_INGREDIENTE PI WHERE PI.INGREDIENTE=I.ID_INGREDIENTE) UNION (SELECT "E" AS PE, EI.ENTRANTES AS ID, I.* FROM ingredientes I, ENTRANTES_INGREDIENTE EI WHERE EI.INGREDIENTE=I.ID_INGREDIENTE);',
    (err,rows, fields) =>{
        if(!err){
            
           res.json(rows);
           
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
        if(!err){
           if(CARTA != "pizza"|| CARTA != "entrantes"){
               res.json(rows);
           }
        }else{ console.log(err);}
    });
    //console.log(INGREDIENTE[2]);
    
    if(CARTA == "pizza"|| CARTA == "entrantes"){
        INGREDIENTE.forEach((element)=> {
            mysqlConnection.query('INSERT INTO ' + CARTA +
            '_ingrediente (INGREDIENTE, ' + CARTA + ') SELECT ID_INGREDIENTE, MAX(ID_' + CARTA + ') FROM ingredientes, ' + CARTA + ' WHERE ingredientes.NOMBRE = ?;',
            [element],
            (err, rows)=>{
                if(!err){
                    //res.json(rows);
                }
                else{
                    console.log(err);
                }
            });
        }); 
        
    }
     
});

router.get('/getIngrediente', (req,res)=>{
    mysqlConnection.query('SELECT * FROM ingredientes ORDER BY NOMBRE ASC;',
    (err, rows, fields)=>{
        if(!err){
            res.json(rows);
        }else{
            console.log(err);
        }
    });
});

router.post('/borrarIngrediente',(req, res)=>{
    const{ID_INGREDIENTE}=req.body;
    mysqlConnection.query('DELETE FROM ingredientes WHERE ID_INGREDIENTE = ?',
    [ID_INGREDIENTE],
    (err,rows)=>{
        if(!err){
           // res.json(rows);
        }else{
            console.log(err);
        }
    });
});

router.get('/getPizza', (req, res)=>{
    mysqlConnection.query('SELECT ID_PIZZA, NOMBRE, PRECIO, IMAGEN, DESCRIPCION, TAMAÑO AS SIZE FROM PIZZA ORDER BY NOMBRE ASC;',
    (err, rows, fields)=>{
        if(!err){
            res.json(rows);
        }else{
            console.log(err);
        }
    });
});

router.get('/getIngredientePizza', (req, res)=>{
    mysqlConnection.query('SELECT PI.PIZZA, I.* FROM ingredientes I, pizza_ingrediente PI WHERE PI.INGREDIENTE = I.ID_INGREDIENTE; ',
    (err, rows)=>{
        if(!err){
            res.json(rows);
        }else{
            console.log(err);
        }
    });
});

router.get('/getIngredienteEntrantes', (req, res)=>{
    mysqlConnection.query('SELECT EI.ENTRANTES, I.* FROM ingredientes I, entrantes_ingrediente EI WHERE EI.INGREDIENTE = I.ID_INGREDIENTE;  ',
    (err, rows, fields)=>{
        if(!err){
            res.json(rows);
        }else{
            console.log(err);
        }
    });
});

router.get('/getOferta', (req, res)=>{
    mysqlConnection.query('SELECT * FROM oferta ORDER BY NOMBRE ASC;',
    (err, rows, fields)=>{
        if(!err){
            res.json(rows);
        }else{
            console.log(err);
        }
    });
});

router.get('/getEntrantes', (req, res)=>{
    mysqlConnection.query('SELECT * FROM entrantes ORDER BY NOMBRE ASC;',
    (err, rows, fields)=>{
        if(!err){
            res.json(rows);
        }else{
            console.log(err);
        }
    });
});

router.get('/getPostres', (req, res)=>{
    mysqlConnection.query('SELECT * FROM postres ORDER BY NOMBRE ASC;',
    (err, rows, fields)=>{
        if(!err){
            res.json(rows);
        }else{
            console.log(err);
        }
    });
});

router.get('/getBebida', (req, res)=>{
    mysqlConnection.query('SELECT * FROM bebida ORDER BY NOMBRE ASC;',
    (err, rows, fields)=>{
        if(!err){
            res.json(rows);
        }else{
            console.log(err);
        }
    });
});

router.post('/borrarCarta', (req, res)=>{
    const{CARTA, ID}=req.body;
    mysqlConnection.query('DELETE FROM '+ CARTA +' WHERE ID_' + CARTA + ' = ' + ID,
    (err, rows)=>{
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



router.post('/registerOferta',  async (req,res)=>{
        //console.log(req.body);
        const{NOMBRE, PRECIO, IMAGEN, FECHA_FIN, DESCRIPCION, CARTA, CANTIDAD, NOMBRE_PLATO}=req.body;
       
        
        mysqlConnection.query('INSERT INTO oferta (NOMBRE, PRECIO, IMAGEN, FECHA_FIN, DESCRIPCION) VALUES(?,?,?,?,?);',
        [NOMBRE, PRECIO, IMAGEN, FECHA_FIN, DESCRIPCION],
        (err, rows, fields)=>{
            if(!err){
                res.json(rows);
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