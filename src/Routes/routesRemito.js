const express = require('express');
const { getAllRemitos, creaRemito, elimninaRemito, ultimoRemito, getRemitosCliente, getRemitoById } = require('../Controlers/remito');

const router = express.Router();

//trae remitos
router.get('/', getAllRemitos);

//crea remito
router.post('/', creaRemito);

//trae remito por id
router.get('/:_id', getRemitoById);

//tre reitos de un cliente
router.get('/remitosCliente/:cuit', getRemitosCliente);

//trea último remito
router.get('/ultimoRemito', ultimoRemito);

//busca remito por CUIT

//elimnia
router.delete('/elimina/:_id', elimninaRemito);

module.exports = router;