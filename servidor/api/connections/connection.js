const { DB_DATABASE, DB_HOST, DB_PASSWORD, DB_PORT, DB_USER } = require('../../config') ;
const mysql = require('pg')
const mysqlConnection = new mysql.Pool({
    host: DB_HOST,
    user: DB_USER,
    password: DB_PASSWORD,
    database: DB_DATABASE,
    port: DB_PORT
    
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
