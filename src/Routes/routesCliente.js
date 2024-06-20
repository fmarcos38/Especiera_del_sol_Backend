const express = require('express');
const { 
    getAllClientes, createCliente, modificaCliente, 
    buscaClientePorNombre, eliminaCliente, getByID, 
    buscaClientePorCuit
} = require('../Controlers/cliente');

const router = express.Router();

//rutas
//trae clientes
router.get('/', getAllClientes);

//crea cliente
router.post('/', createCliente);

//trae cliente por nombre
router.get('/buscaPorNombre', buscaClientePorNombre);

//trae cliente por cuit
router.get('/cuit', buscaClientePorCuit);

//trae cliete por ID
router.get('/:_id', getByID);

//modif cliente
router.put("/modificaCliente/:_id", modificaCliente);

//elim cliente
router.delete("/elimina/:_id", eliminaCliente);


module.exports = router;