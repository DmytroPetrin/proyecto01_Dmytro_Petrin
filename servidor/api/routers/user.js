const express = require('express');
const router = express.Router();

const mysqlConnection = require('../connections/connection');

const jwt = require('jsonwebtoken');


router.get('/', (req, res)=>{
    mysqlConnection.query('select * from empleados', (err, rows, field) => {
        if(!err){
            //res.json(rows);
        }else{
            console.log(err);
        }
 
    });
});

router.post('/signin', (req,res)=>{
    /*Con el postman envio los datos de post(req.body) en el query se busca
     este usuario en la base de datos
    cuando lo encuentre guarda los datos en rows de query*/
    const{EMAIL, PASS} = req.body;
    const CONTRASEÑA = PASS; //ESTA CONVERSION PORQUE ANGULAR NO SABE TRABAJAR CON LETRA Ñ EN OBJETOS
    mysqlConnection.query('select EMAIL, ROL from empleados where EMAIL=? AND CONTRASEÑA=?',
     [EMAIL, CONTRASEÑA], 
     (err,rows, fields) =>{
         if(!err){
             if(rows.length >0){
                 let data= JSON.stringify(rows[0]);//stringify te convierte los datos en string
                 const token = jwt.sign(data, 'palabra_secreta'); //jwt permite crear token donde los datos seran cifrados medianten la palabra secreta
                 res.json({token}); //respondemos con el token creado
             }else if(rows.length==0){
                mysqlConnection.query('select EMAIL, ROL from cliente where EMAIL=? AND CONTRASEÑA=?',
                [EMAIL, CONTRASEÑA], 
                (err,rows, fields) =>{
                    if(!err){
                        if(rows.length >0){
                            let data= JSON.stringify(rows[0]);
                            const token = jwt.sign(data, 'palabra_secreta'); 
                            res.json({token}); 
                        }else{res.json('Usuario o clave incorrectos');}
                    }else{console.log(err);}
                });
             
         }else{
             console.log(err);
         }}
     });
     
});

router.post('/test', verifyToken, (req, res)=>{
    //console.log(req.data);
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

//funciona pero hay que modificar query
router.put('/registerUser', (req, res)=>{ 
    
    const{NOMBRE, APELLIDO, EMAIL, PASS, TELEFONO, FECHA_NACIMIENTO, DIRECCION} = req.body;
    mysqlConnection.query('INSERT INTO cliente (NOMBRE, APELLIDO, EMAIL, CONTRASEÑA, TELEFONO, FECHA_NACIMIENTO, DIRECCION)'+
    ' VALUES(?, ?, ?, ?, ?, ?, ?);',
     [NOMBRE, APELLIDO, EMAIL, PASS, TELEFONO, FECHA_NACIMIENTO, DIRECCION],
     (err,rows, fields) =>{
         if(!err){
             //console.log(rows);
         }else console.log(err);  
     });
    

});

router.put('/registerEmpleado', (req, res)=>{
    const{NOMBRE, APELLIDO, EMAIL, PASS, TELEFONO, FECHA_ALTA, DIRECCION, DNI, ROL} = req.body;
    mysqlConnection.query('INSERT INTO empleados(NOMBRE, APELLIDO, EMAIL, CONTRASEÑA, TELEFONO, FECHA_ALTA, DIRECCION, DNI, ROL) VALUES (?,?,?,?,?,?,?,?,?)',
     [NOMBRE, APELLIDO, EMAIL, PASS, TELEFONO, FECHA_ALTA, DIRECCION, DNI, ROL],
     (err,rows, fields) =>{
        if(!err){
            //console.log(rows);
        }else console.log(err);  
    });

});

router.post('/comprobarUsuario', (req,res)=>{
    console.log(req.body);
    const{EMAIL}=req.body;
    mysqlConnection.query('SELECT EMAIL FROM empleados WHERE EMAIL = ?;',
     [EMAIL],
     (err,rows,fields) =>{
         if(!err){
             if(rows.length>0){
                 res.json(true);
             }else if (rows.length==0){
            mysqlConnection.query('SELECT EMAIL FROM cliente WHERE EMAIL = ?;',
            [EMAIL],
            (err,rows,fields) =>{
                if(!err){
                    if(rows.length>0){ 
                        res.json(true);
                    }else{
                    console.log(err);
                    res.json(false);
                   
                }
                }
            });
         }
         }else{
                console.log(err);
                
             }
     });
});



module.exports = router;