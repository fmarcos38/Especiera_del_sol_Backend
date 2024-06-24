const Remito = require('../Models/modelRemito');


const getAllRemitos = async(req, res) => {
    try {
        const allR = await Remito.find();
        res.json(allR);
    } catch (error) {
        console.log(error);
    }
};

//trae reitos de un cliente x cuit del cliente
const getRemitosCliente = async (req, res) => {
    try {
        const { cuit } = req.params;
        const remitos = await Remito.find({ cuit });
        res.status(200).json(remitos);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

//trae el último remito para obtnere el num 
const ultimoRemito = async(req, res) => {
    try {
        const remito =  await Remito.find().sort({$natural:-1}).limit(1);
        res.json({
            ultimoRemito: remito[0].numRemito
        });
    } catch (error) {
        console.log(error)
    }
};

//trae remito por ID
const getRemitoById = async(req,res) => {
    try {
        const {_id} = req.params;
        const remito = await Remito.findById({_id});
        if(!remito){ return res.send("No existe el remito")}

        res.status(200).json(remito);
    } catch (error) {
        console.log(error);
    }
};
//crea
const creaRemito = async(req, res) => {

    try {
        const { numRemito, items, totPedido, cuit, condicion_pago, estado} = req.body; 

        const newRemito = new Remito({
            numRemito, 
            items, 
            totPedido, 
            cuit, 
            fecha: new Date(), 
            condicion_pago, 
            estado
        });
        await newRemito.save();
        res.json(newRemito);
    } catch (error) {
        console.log(error);
    }
};

//elimna remito
const elimninaRemito = async(req, res) => {
    try {
        const {_id} = req.params;
        const remito = await Remito.findByIdAndDelete({_id});

        if(!remito){ return res.send("Remito no encontrado")}

        res.json(remito);
    } catch (error) {
        console.log(error);
    }
};


module.exports = {
    getAllRemitos,
    getRemitosCliente,
    getRemitoById,
    ultimoRemito,
    creaRemito,
    elimninaRemito,
}