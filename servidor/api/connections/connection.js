const mysql = requiere('mysql');

const mysqlConnection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: '',
    port: '8889'
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
