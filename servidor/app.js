const express = require('express');
 const app  = express();
 const bodyParser = requiere('body-parser');
 const cors = require('cors');

 app.use(bodyParser.urlencoded({extended: false}));
 app.use(bodyParser.json());

 app.use(cors());

 module.exports = app;