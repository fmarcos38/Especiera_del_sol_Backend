const express = require('express');
const { getCompras, creaCompra, eliminaCompra } = require('../Controlers/compras');

const router = express.Router();

//trae todas las compras
router.get('/', getCompras);

//crea
router.post('/', creaCompra);

//modif

//elim
router.delete('/elimina/:_id', eliminaCompra);


module.exports = router;