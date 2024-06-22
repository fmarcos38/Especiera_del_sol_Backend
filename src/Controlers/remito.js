const Remito = require('../Models/modelRemito');


const getAllRemitos = async(req, res) => {
    try {
        const allR = await Remito.find();
        res.json(allR);
    } catch (error) {
        console.log(error);
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
const creaRemito = async(req, res) => {

    try {
        const { numRemito, items, totPedido, cuit, condicion_pago, estado} = req.body; console.log("data:", req.body)

        const newRemito = new Remito({
            numRemito, 
            items, 
            totPedido, 
            cuit, 
            fecha_compra: new Date(), 
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
    ultimoRemito,
    creaRemito,
    elimninaRemito,
}