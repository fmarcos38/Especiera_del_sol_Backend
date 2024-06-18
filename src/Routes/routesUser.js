const express = require('express');
const { creaUser, getAllUsers, elimnaUsuariio } = require('../Controlers/user');

const router = express.Router();

//crea usuario
router.post('/', creaUser);

//trae usuarios
router.get('/', getAllUsers);

//elimina usuario
router.delete('/elimina/:_id', elimnaUsuariio);

module.exports = router;