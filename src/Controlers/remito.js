const Remito = require('../Models/modelRemito');

const getAllRemitos = async(req, res) => {
    try {
        const allR = await Remito.find();
        res.json(allR);
    } catch (error) {
        console.log(error);
    }
};

const creaRemito = async(req, res) => {
    try {
        const {num_remito, items, totPedido, cuit, fecha_compra, condicion_pago, estado} = req.body;
        const newRemito = new Remito({
            num_remito, 
            items, 
            totPedido, 
            cuit, 
            fecha_compra, 
            condicion_pago, 
            estado
        });
        await newRemito.save();
        res.json(newRemito);
    } catch (error) {
        console.log(error);
    }
};


module.exports = {
    getAllRemitos,
    creaRemito,
}