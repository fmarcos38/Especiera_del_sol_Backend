const express = require('express');
const { getAllGastos, createGasto } = require('../Controlers/gastos');


const router = express.Router();

//trae gastos
router.get('/', getAllGastos);

//crea
router.post('/', createGasto);


module.exports = router;