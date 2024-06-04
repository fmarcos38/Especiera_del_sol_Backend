const express = require('express');
const { getAllClientes } = require('../Controlers/cliente');

const router = express.Router();

router.get('/', getAllClientes);

module.exports = router;