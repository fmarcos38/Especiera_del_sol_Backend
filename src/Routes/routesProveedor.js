const express = require('express');
const { getProveedores, createProveedor, editaProveedor, eliminaProv, buscaProveedorPorNombre, buscaProCuit } = require('../Controlers/proveedores');

const router = express.Router();

//trae roveedores
router.get('/', getProveedores);

//busca prov por buscaPorNombre
router.get('/buscaPorNombre', buscaProveedorPorNombre);

//busca por CUIT
router.get('/porCuit/:cuit', buscaProCuit);

//crea proveed
router.post('/', createProveedor);

//modif provee
router.put('/modificaProveedor/:_id', editaProveedor);

//elimina
router.delete("/:_id", eliminaProv);

module.exports = router;



