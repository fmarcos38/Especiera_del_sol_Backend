const express = require('express');
const { getProveedores, createProveedor } = require('../Controlers/proveedores');

const router = express.Router();

//trae roveedores
router.get('/', getProveedores);

//crea proveed
router.post('/', createProveedor);


module.exports = router;



