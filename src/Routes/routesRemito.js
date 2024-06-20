const express = require('express');
const { getAllRemitos, creaRemito } = require('../Controlers/remito');

const router = express.Router();

//trae remitos
router.get('/', getAllRemitos);

//crea remito
router.post('/', creaRemito);


module.exports = router;