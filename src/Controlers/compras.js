const Compra = require('../Models/modelCompras');

const getCompras = async(req, res) => {
    try {
        const compras = await Compra.find();
        res.json(compras);
    } catch (error) {
        console.log(error);
    }
};

//trae el último remito para obtnere el num 
const ultimoRemito = async(req, res) => {
    try {
        const remito =  await Compra.find().sort({$natural:-1}).limit(1);
        res.json({
            ultimoRemito: remito[0].numRemito
        });
    } catch (error) {
        console.log(error)
    }
};

//crea
const creaCompra = async(req, res) => {
    try {
        const {numRemito, items, total, detalle, estado, observaciones, detallePago} = req.body;

        if(detalle === 'Anticipo'){
            const newCompra = new Compra({
                fecha: Date.now(),
                detalle,
                total,                
                estado,
                observaciones,
                detallePago,
            });
            await newCompra.save();
            return res.json(newCompra);
        }else{
            const newCompra = new Compra({
                fecha: Date.now(),
                numRemito,
                items,
                detalle,
                total,
                estado,
                observaciones,
                detallePago
            });
            await newCompra.save();
            return res.json(newCompra);
        }
    } catch (error) {
        console.log(error);
    }
};

//modif
const modificaCompra = async(req, res) => {    
    try {
        const {_id} = req.params;
        const data = req.body;

        const compra = await Compra.findByIdAndUpdate(_id, data);

        if(!compra){ return res.send("La compra no existe")}

        res.send("Se modif con exito");

    } catch (error) {
        console.log(error);
    }
};

//elimina
const eliminaCompra = async(req, res) => {
    try {
        const {_id} = req.params;
        const compra = await Compra.findByIdAndDelete({_id});

        if(!compra){ return res.send("compra no encontrada")}

        res.json(compra);
    } catch (error) {
        console.log(error);
    }
};


module.exports = {
    getCompras,
    ultimoRemito,
    creaCompra,
    modificaCompra,
    eliminaCompra,
}