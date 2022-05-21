const express = require('express');
 const app  = express();
 const bodyParser = require('body-parser');
 const cors = require('cors');

 

 //app.use(cors({origin: '*'}));

 //para desactivar el error de corrs
/*
 app.get('./api/routers/pizza', function (req, res, next) {
    res.json({msg: 'This is CORS-enabled for all origins!'})
  })
  
  app.listen(80, function () {
    console.log('CORS-enabled web server listening on port 80')
  })
*/
 
//codigo para evitar error de cors
/**/
 app.use(function (req, res, next) {

  // Website you wish to allow to connect
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');

  // Request methods you wish to allow
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

  // Request headers you wish to allow
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader('Access-Control-Allow-Credentials', true);

  // Pass to next layer of middleware
  next();
});

 app.use(cors());
 app.use(bodyParser.urlencoded({extended: false}));
 app.use(bodyParser.json());
// Routes
 const userRoute = require('./api/routers/user');
 app.use('/user', userRoute);

 const pizzaRoute = require('./api/routers/pizza');
 app.use('/pizza', pizzaRoute);

 const compraRoute = require('./api/routers/compra');
 app.use('/compra', compraRoute);


 module.exports = app;