const express = require('express');
const upload = require('../Helpers/multer');
const cloudinary = require('../Helpers/cloudinary');
const { getAllProducts, eliminaProd, buscaPorNombre, getById } = require('../Controlers/productos');
const Producto = require('../Models/modelProductos');
const { actualizaPosiciones } = require('../Helpers/actualizaPisicion');

const router = express.Router();

//trae prods
router.get('/', getAllProducts);

//trar prod por nombre
router.get('/buscaPorNombre', buscaPorNombre);

//crea producto - manejo de imgs con Cloudinary
router.post('/', upload.single("imagen"), async(req, res) => {
    
    try {
        const { nombre, precioKg, envase, costo, posicionLista } = req.body;
        //Upload image to cloudinary
        const result = await cloudinary.uploader.upload(req.file.path);

        //Obtener todos los productos ordenados por _id
        const productos = await Producto.find().sort({ posicionLista: 1 });

        //creo nuevo prod
        const nuevoProducto = new Producto({
            nombre,
            precioKg,
            envase,
            costo,
            posicionLista,
            imagen: result.secure_url,
            cloudinary_id: result.public_id
        });

        // Insertar el nuevo producto en la posición especificada
        productos.splice(posicionLista, -1, nuevoProducto);

        // Paso 3: Guardar el nuevo producto y actualizar las posiciones de los productos existentes, arranco la iterasión desde la pos q viene del front
        await nuevoProducto.save();
        for (let i = posicionLista +1; i < productos.length; i++) {
            await Producto.findByIdAndUpdate(productos[i]._id, { $set: { posicionLista: i } });
        }

        res.status(200).send("Creado con Exito!!");
    } catch (error) {
        console.log(error);
    }
});

//get by id
router.get('/:_id', getById);

//modifica prod
router.put('/:_id', upload.single("imagen"), async(req, res) => {    
    try {
        const { _id } = req.params; 
        const { nombre, precioKg, envase, posicionLista } = req.body; 
        //busco prod, para los datos q no vienen dejar los mismos
        const prod = await Producto.findById({_id});

        //manejo de la imagen SI es q viene
        let result;
        //si viene img nueva
        if(req.file){
            //delete cloud img vieja
            await cloudinary.uploader.destroy(prod.cloudinary_id);
            result = await cloudinary.uploader.upload(req.file.path); //almaceno la nueva img
        }

        // Llama a la función que actualiza la posición de los productos que le siguen al creado
        //await actualizaPosiciones(posicionLista);

        const modifProd = {
            nombre: nombre || prod.nombre,
            precioKg: precioKg || prod.precioKg,
            envase: envase || prod.envase,
            imagen: result?.secure_url || prod.imagen,
            /* posicionLista: posicionLista || prod.posicionLista, */
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