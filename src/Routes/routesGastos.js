const express = require('express');
const { getAllGastos, createGasto, getByID, modificaGasto, eliminaGasto } = require('../Controlers/gastos');


const router = express.Router();

//trae gastos
router.get('/', getAllGastos);

//crea
router.post('/', createGasto);

//get by ID
router.get('/:_id', getByID);

//modif
router.put('/modifGasto/:_id', modificaGasto);

//delete
router.delete('/elimina/:_id', eliminaGasto);


module.exports = router;