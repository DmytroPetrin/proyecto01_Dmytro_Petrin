const express = require('express');
const router = express.Router();

const mysqlConnection = require('../connections/connection');

const jwt = require('jsonwebtoken');


router.get('/', (req, res)=>{
    mysqlConnection.query('select * from empleados', (err, rows, field) => {
        if(!err){
            res.json(rows);
        }else{
            console.log(err);
        }
 
    });
});

router.post('/signin', (req,res)=>{
    /*Con el postman envio los datos de post(req.body) en el query se busca
     este usuario en la base de datos
    cuando lo encuentre guarda los datos en rows de query*/
    const{NOMBRE, PASS} = req.body;
    const CONTRASEÑA = PASS; //ESTA CONVERSION PORQUE ANGULAR NO SABE TRABAJAR CON LETRA Ñ EN OBJETOS
    mysqlConnection.query('select NOMBRE, ROL from empleados where NOMBRE=? AND CONTRASEÑA=?',
     [NOMBRE, CONTRASEÑA], 
     (err,rows, fields) =>{
         if(!err){
             if(rows.length >0){
                 let data= JSON.stringify(rows[0]);//stringify te convierte los datos en string
                 const token = jwt.sign(data, 'palabra_secreta'); //jwt permite crear token donde los datos seran cifrados medianten la palabra secreta
                 res.json({token}); //respondemos con el token creado
             }else{
                 res.json('Usuario o clave incorrectos')
             }
         }else{
             console.log(err);
         }
     }
     );
});

router.post('/test', verifyToken, (req, res)=>{
    console.log(req.data);
    //verificar el usuario y acceso que tendra
    if(req.data.roleID==='user'){}

    res.json('Informacion secreta');
});

function verifyToken(req, res, next){
    //Comprueba que la informacion que se envia el token tiene cabezera de autorizado y luego se comprueba el token
    //Segun estandar de jwt el token se envia con palabra Bearer delante del token
    if(!req.headers.authorization) return res.status(401).json('No autorizado');

    const token = req.headers.authorization.substr(7);
    if(token!==''){
        const content = jwt.verify(token,'palabra_secreta')//es aconsejable guardar la palabra secreta en la variable entorno para que no sea tan facilmente accesible 
        req.data = content;
        next();
        //console.log(content);
    }else{
        res.status(401).json('Token vacio');
    }
}



module.exports = router;