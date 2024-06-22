const express = require('express');
const { getAllRemitos, creaRemito, elimninaRemito, ultimoRemito } = require('../Controlers/remito');

const router = express.Router();

//trae remitos
router.get('/', getAllRemitos);

//crea remito
router.post('/', creaRemito);

//trea último remito
router.get('/ultimoRemito', ultimoRemito);

//busca remito por CUIT

//elimnia
router.delete('/elimina/:_id', elimninaRemito);

module.exports = router;