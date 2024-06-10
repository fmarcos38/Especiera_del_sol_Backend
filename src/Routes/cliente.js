const express = require('express');
const { getAllClientes, createCliente, modificaCliente, buscaClientePorNombre, eliminaCliente } = require('../Controlers/cliente');

const router = express.Router();

//rutas
//trae clientes
router.get('/', getAllClientes);

//trae cliente por id
router.get("/buscaPorNombre", buscaClientePorNombre);

//crea cliente
router.post('/', createCliente);

//modif cliente
router.put("/modificaCliente/:_id", modificaCliente);

//elim cliente
router.delete("/elimina/:_id", eliminaCliente);


module.exports = router;