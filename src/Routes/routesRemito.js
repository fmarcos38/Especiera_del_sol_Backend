const express = require('express');
const { 
    getAllRemitos, creaRemito, elimninaRemito, ultimoRemito, 
    getRemitosCliente, getRemitoById, modificaRemito, calcSaldoAnteriror
} = require('../Controlers/remito');

const router = express.Router();

//trae remitos
router.get('/', getAllRemitos);

//crea remito
router.post('/', creaRemito);

//trae remito por id
router.get('/remitoId/:_id', getRemitoById);

//trae reitos de un cliente
router.get('/remitosCliente/:cuit', getRemitosCliente);

//trea último remito
router.get('/ultimoRemito', ultimoRemito);

//modif remito
router.put('/modificaRemito/:_id', modificaRemito);

//elimnia
router.delete('/elimina/:_id', elimninaRemito);

//calcula saldo restante
router.get('/calcSaldo/:cuit', calcSaldoAnteriror);

module.exports = router;