const express = require('express');
const { 
    getAllProducts, eliminaProd, buscaPorNombre, 
    getById, creaProducto, modifProd 
} = require('../Controlers/productos');


const router = express.Router();

//trae prods
router.get('/', getAllProducts);

//trar prod por nombre
router.get('/buscaPorNombre', buscaPorNombre);

//crea producto - manejo de imgs con Cloudinary
router.post('/', creaProducto);

//get by id
router.get('/:_id', getById);

//modifica prod
router.put('/:_id', modifProd);

//elimina prod
router.delete('/:_id', eliminaProd);


module.exports = router;