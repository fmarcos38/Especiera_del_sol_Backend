const express = require('express');
const { createReporte, reporteMes } = require('../Controlers/reporte');

const router = express.Router();


//trae un reporte para cierto mes del año
router.get('/reporteMes', reporteMes);


module.exports = router;