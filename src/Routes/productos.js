const express = require('express');
const upload = require('../Helpers/multer');
const cloudinary = require('../Helpers/cloudinary');
const { getAllProducts } = require('../Controlers/productos');
const Productos = require('../Models/productos');

const router = express.Router();

//trae prods
router.get('/', getAllProducts);

//trar prod por ID

//crea producto - manejo de imgs con Cloudinary
router.post('/', upload.single("imagen"), async(req, res) => {
    
    try {
        const { nombre, precioKg, kgsUnidad, imagen } = req.body;
        //Upload image to cloudinary
        const result = await cloudinary.uploader.upload(req.file.path);

        const nuevoProducto = new Productos({
            nombre,
            precioKg,
            kgsUnidad,
            imagen: result.secure_url,
            cloudinary_id: result.public_id
        });
        await nuevoProducto.save();
        res.status(200).send("Creado con Exito!!");
    } catch (error) {
        console.log(error);
    }
});

//modifica prod

//elimina prod

module.exports = router;