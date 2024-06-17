const express = require('express');
const upload = require('../Helpers/multer');
const cloudinary = require('../Helpers/cloudinary');
const { getAllProducts, eliminaProd, buscaPorNombre } = require('../Controlers/productos');
const Producto = require('../Models/modelProductos');

const router = express.Router();

//trae prods
router.get('/', getAllProducts);

//trar prod por nombre
router.get('/buscaPorNombre', buscaPorNombre);

//crea producto - manejo de imgs con Cloudinary
router.post('/', upload.single("imagen"), async(req, res) => {
    
    try {
        const { nombre, precioKg, envase } = req.body;
        //Upload image to cloudinary
        const result = await cloudinary.uploader.upload(req.file.path);

        const nuevoProducto = new Producto({
            nombre,
            precioKg,
            envase,
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
router.put('/:_id', upload.single("imagen"), async(req, res) => {    
    try {
        const { _id } = req.params;
        const { nombre, precioKg, envase } = req.body;
        //busco prod, para los datos q no vienen dejar los mismos
        const prod = Producto.findById({_id});

        //manejo de la imagen SI es q viene
        let result;
        //si viene img nueva
        if(req.file){
            //delete cloud img vieja
            await cloudinary.uploader.destroy(prod.cloudinary_id);
            result = await cloudinary.uploader.upload(req.file.path); //almaceno la nueva img
        }

        const modifProd = {
            nombre: nombre || prod.nombre,
            precioKg: precioKg || prod.precioKg,
            envase: envase || prod.envase,
            imagen: result?.secure_url || prod.imagen,
            cloudinary_id: result?.public_id || prod.cloudinary_id,
        }

        //realizo la modif
        await Producto.findByIdAndUpdate({_id:_id}, modifProd);

        res.status(200).json(modifProd);

    } catch (error) {
        console.log(error)
    }
});

//elimina prod
router.delete('/:_id', eliminaProd);


module.exports = router;