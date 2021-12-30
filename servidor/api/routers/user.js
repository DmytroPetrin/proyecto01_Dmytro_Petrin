const express = require('express');
const router = express.Router();

const mysqlConnection = require('../connections/connection');

router.get('/', (req, res)=>{
    mysqlConnection.query('select * from empleados', (err, rows, field) => {
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
    mysqlConnection.query('SELECT NOMBRE, ROL FROM empleados WHERE NOMBRE=? AND CONTRASEÑA=?',
    [nombre, contraseña],
    (err, rows, fields)=>{
        if(!err){
            //console.log(rows);
            if(rows.length>0){
                let data = JSON.stringify(rows[0]);
                const token = jwt.sign(data, 'palabra_secreta');
                res.json({token});
            }else{
                res.json('Usuario o clave incorrectos');

            }
        }else{
            console.log(err);
        }
    })
});


router.post('/test', verifyToken, (req, res)=>{
    console.log(req.data);
    res.json('Information secreta');
});

function verifyToken(req, res, next) {
    if(!req.headers.autorization) return res.status(401).json('No autorizado');

    const token =  req.headers.autorization.substr(7);
    if(token!==''){
        const content = jwt.verify(token,'palabra_secreta');
        req.data = content;
        next();

    }else{
        res.status(401).json('Token vacio');
    }
}

module.exports = router;