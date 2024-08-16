const cloudinary = require('../Helpers/cloudinary');
const Producto = require('../Models/modelProductos');

//trae productos desde la DB
const getAllProducts = async(req, res) => {
    try {
        const allP = await Producto.find().sort({posicionLista: 1});
        res.json(allP);
    } catch (error) {
        console.log(error);
    }
}
//busca por nombre
const buscaPorNombre = async(req, res) => {
    try {
        const {nombre} = req.query;
        const prod = await Producto.findOne({nombre});

        if(!prod){
            return res.send("Prod no encontrado");
        }

        res.status(200).json(prod);
    } catch (error) {
        console.log(error);
    }
};
//get by id
const getById = async(req, res) => {
    try {
        const {_id} = req.params;
        const prod = await Producto.findById({_id});

        if(!prod){
            return res.send("No existe el prod");
        }

        res.json(prod);
    } catch (error) {
        
    }
};
//crea
const creaProducto = async(req, res) => {
    const { nombre, unidadMedida, precioKg, envase, costo, posicionLista } = req.body; 
    try {
        // Desplazar las posiciones de los productos existentes
        await Producto.updateMany(
            { posicionLista: { $gte: posicionLista } },
            { $inc: { posicionLista: 1 } }
        );

        // Crear nuevo producto
        const nuevoProducto = new Producto({
            nombre,
            unidadMedida,
            precioKg,
            envase,
            costo,
            posicionLista,
        });
        // Guardar el nuevo producto
        await nuevoProducto.save();

        // Reenumerar todas las posiciones de los productos en la colección
        const productos = await Producto.find().sort({ posicionLista: 1 });

        for (let i = 0; i < productos.length; i++) {
            productos[i].posicionLista = i + 1;
            await productos[i].save();
        }

        res.status(200).send("Creado con éxito!!");
    } catch (error) {
        console.error(error);
        res.status(500).send("Error del servidor");
    }
};
//modifica
const modifProd = async(req, res) => {
    const { _id } = req.params;
    try {
        // Actualizar el producto con los nuevos datos
        const modifProd = {...req.body};
        //actualizo
        await Producto.findByIdAndUpdate(_id, modifProd);

        //Reenumerar todas las posiciones de los productos en la colección
        const productos = await Producto.find().sort({ posicionLista: 1 });
        for (let i = 0; i < productos.length; i++) {
            productos[i].posicionLista = i + 1;
            await productos[i].save();
        }
        
        res.status(200).json(modifProd);
    } catch (error) {
        console.log(error)
    }
};
//elimina producto
const eliminaProd = async(req, res) => {
    try {
        const { _id } = req.params;
        const prod = await Producto.findByIdAndDelete(_id).lean();
        
        if(!prod){
            return res.send("Prod no encontrado");
        }

        //Reenumerar todas las posiciones de los productos en la colección
        const productos = await Producto.find().sort({ posicionLista: 1 });

        for (let i = 0; i < productos.length; i++) {
            productos[i].posicionLista = i + 1;
            await productos[i].save();
        }
        
        res.status(200).json(prod);
    } catch (error) {
        console.log(error);
    }
};


module.exports = {
    getAllProducts,
    eliminaProd,
    buscaPorNombre,
    getById,
    creaProducto,
    modifProd
}