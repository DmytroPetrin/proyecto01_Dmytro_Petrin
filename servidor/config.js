 const FRONTEND_URL = process.env.FRONTEND_URL || "http://localhost:4200";
 const DB_HOST = process.env.DB_HOST || "localhost";
 const DB_PORT = process.env.DB_PORT || 3306;
 const DB_DATABASE = process.env.DB_DATABASE || 'pizzeria';
 const DB_USER = process.env.DB_USER || 'dima';
 const DB_PASSWORD = process.env.DB_PASSWORD || '123456';

 const PORT = 3000;

 module.exports = {FRONTEND_URL, DB_HOST, DB_PORT, DB_DATABASE, DB_USER, DB_PASSWORD, PORT}