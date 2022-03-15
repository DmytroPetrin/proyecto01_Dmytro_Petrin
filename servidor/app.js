const express = require('express');
 const app  = express();
 const bodyParser = require('body-parser');
 const cors = require('cors');

 app.use(bodyParser.urlencoded({extended: false}));
 app.use(bodyParser.json());

 app.use(cors());

 //para desactivar el error de corrs
/*
 app.get('./api/routers/pizza', function (req, res, next) {
    res.json({msg: 'This is CORS-enabled for all origins!'})
  })
  
  app.listen(80, function () {
    console.log('CORS-enabled web server listening on port 80')
  })
*/
 // Routes

 const userRoute = require('./api/routers/user');
 app.use('/user', userRoute);

 const pizzaRoute = require('./api/routers/pizza');
 app.use('/pizza', pizzaRoute);

 module.exports = app;