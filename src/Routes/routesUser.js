const express = require('express');
const { creaUser } = require('../Controlers/user');

const router = express.Router();

//crea usuario
router.post('/', creaUser);


module.exports = router;