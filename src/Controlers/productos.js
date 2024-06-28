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
//elimina producto
const eliminaProd = async(req, res) => {
    try {
        const { _id } = req.params;
        const prod = await Producto.findByIdAndDelete(_id).lean();
        await cloudinary.uploader.destroy(prod.cloudinary_id);
        
        if(!prod){
            return res.send("Prod no encontrado");
        }
        res.status(200).json(prod);
    } catch (error) {
        console.log(error);
    }
};


module.exports = {
    getAllProducts,
    eliminaProd,
    buscaPorNombre
}