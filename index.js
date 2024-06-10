const express = require('express');
const dotenv = require('dotenv'); //esto es para que lea las variables de entorno del archivo .env
const cors = require('cors'); //para solicitudes seguras
const connectDB = require('./src/DataBase/db');
//--importo de rutas--------------------
const routerProductos = require('./src/Routes/productos');
const routerClientes = require('./src/Routes/cliente');
const routerRemitos = require('./src/Routes/remito');


const app = express();
const port = process.env.PORT || 3001;


// Middleware--------------------------------
app.use(express.json()); //middleware para manejo de json en las solicitudes
dotenv.config();
app.use(cors());

//--conexion DB----------------------------------------------------------
connectDB();

//--invoco rutas con app-------------------------------------------------
app.use("/productos", routerProductos);
app.use('/clientes', routerClientes);
app.use('/remitos', routerRemitos);

app.listen(port, () => {
    console.log(`servidor escuchando en puerto:, ${port}`);
});