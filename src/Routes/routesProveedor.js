const express = require('express');
const { getProveedores, createProveedor, editaProveedor } = require('../Controlers/proveedores');

const router = express.Router();

//trae roveedores
router.get('/', getProveedores);

//crea proveed
router.post('/', createProveedor);

//modif provee
router.put('/modificaProveedor/:_id', editaProveedor);


module.exports = router;



