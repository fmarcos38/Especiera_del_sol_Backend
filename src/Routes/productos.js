const express = require('express');
const { getAllProducts } = require('../Controlers/productos');

const router = express.Router();

//trae prods
router.get('/', getAllProducts);

module.exports = router;