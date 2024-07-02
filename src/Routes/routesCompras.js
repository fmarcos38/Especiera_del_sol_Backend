const express = require('express');
const { getCompras, creaCompra, eliminaCompra, modificaCompra } = require('../Controlers/compras');

const router = express.Router();

//trae todas las compras
router.get('/', getCompras);

//crea
router.post('/', creaCompra);

//modif
router.put('/modifica/:_id', modificaCompra);

//elim
router.delete('/elimina/:_id', eliminaCompra);


module.exports = router;