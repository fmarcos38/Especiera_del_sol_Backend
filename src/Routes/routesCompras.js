const express = require('express');
const { getCompras, creaCompra, eliminaCompra, modificaCompra, getComprasProveedor, getRemito } = require('../Controlers/compras');

const router = express.Router();

//trae todas las compras
router.get('/', getCompras);

//trae compras a un proveedor 
router.get('/proveedor', getComprasProveedor);

//trae remito compra por id
router.get('/remito/:_id', getRemito);
//crea
router.post('/', creaCompra);

//modif
router.put('/modifica/:_id', modificaCompra);

//elim
router.delete('/elimina/:_id', eliminaCompra);


module.exports = router;