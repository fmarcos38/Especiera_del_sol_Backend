const express = require('express');
const { createReporte } = require('../Controlers/reporte');

const router = express.Router();


//crea reporte de un mes
router.post('/', createReporte);


module.exports = router;