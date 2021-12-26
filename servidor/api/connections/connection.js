const mysql = require('mysql');

const mysqlConnection = mysql.createConnection({
    host: 'localhost',
    user: 'dima',
    password: '123456',
    database: 'pizzeria',
    port: '3306'
});

mysqlConnection.connect(err=> {
    if(err){
        console.log('Error en db', err);
        return;
    }
    else{
        console.log('DB ok');
    }
});

module.exports = mysqlConnection;
