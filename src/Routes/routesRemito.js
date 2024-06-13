const express = require('express');
const { getAllRemitos } = require('../Controlers/remito');

const router = express.Router();

router.get('/', getAllRemitos);

module.exports = router;