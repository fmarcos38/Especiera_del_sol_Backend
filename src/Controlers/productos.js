const Producto = require('../Models/productos');

//trae productos desde la DB
const getAllProducts = async(req, res) => {
    try {
        const allP = await Producto.find();
        res.json(allP);
    } catch (error) {
        console.log(error);
    }
}

module.exports = {
    getAllProducts,
}