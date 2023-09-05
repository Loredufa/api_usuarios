const express = require('express');
const morgan =require('morgan')
const routes = require('./src/routes/index')
const app = express();
const errorHandler = require('./src/utils/middlewares/errorHandler')
const setHeader = require('./src/utils/middlewares/setHeader')
const {conn} = require('./src/models')
const {PORT} = require('./src/utils/config/index')
const expressJson = express.json(); 
const bodyParser  = express.urlencoded({extended: true});

//Headers
app.use(express.urlencoded({extended:true, limit: "50mb"}));
app.use(express.json());
app.use(morgan('dev'))
app.use(setHeader)

app.use([expressJson, bodyParser])


//Rutas
app.use('/', routes);

//control de errores
app.use(errorHandler)


//Servidor
conn.sync({force:false}).then(() => {
  console.log('Base de datos conectada')
  app.listen(PORT, () => {
    console.log(`Servidor corriendo en puerto ${PORT}`)
  })
})