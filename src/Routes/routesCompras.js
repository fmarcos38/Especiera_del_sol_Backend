const express = require('express');
const { getCompras, creaCompra, eliminaCompra, modificaCompra, getComprasProveedor, getRemito, getUltimoRemito } = require('../Controlers/compras');

const router = express.Router();

//trae todas las compras
router.get('/', getCompras);

//trae ult num remito
router.get('/ultimoRemito', getUltimoRemito);

//trae compras a un proveedor 
router.get('/proveedor', getComprasProveedor);

//trae remito compra por id
router.get('/remito/:_id', getRemito);
//crea
router.post('/', creaCompra);

//modif
router.put('/modifica/:_id', modificaCompra);

//elim
router.delete('/eliminaRemito/:_id', eliminaCompra);


module.exports = router;