const Remito = require('../Models/modelRemito');

const getAllRemitos = async(req, res) => {
    try {
        const allR = await Remito.find();
        res.json(allR);
    } catch (error) {
        console.log(error);
    }
};


module.exports = {
    getAllRemitos,
}