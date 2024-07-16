const Remito = require('../Models/modelRemito');
const Producto = require('../Models/modelProductos');


const getAllRemitos = async(req, res) => {
    try {
        const { estado } = req.query; 
        const allR = await Remito.find();
        let remitos;

        if(estado){
            if(estado === "Debe"){
                remitos = allR.filter(r => r.estado !== "Pagado");
                return res.json(remitos);
            } 
            if(estado === "Pagado"){
                remitos = allR.filter(r => r.estado !== "Debe");
                return res.json(remitos);
            }
        }
        if(estado === "todos"){
            return res.json(allR);
        }
    } catch (error) {
        console.log(error);
    }
};

//trae reitos de un cliente x cuit del cliente
const getRemitosCliente = async (req, res) => {
    try {
        const {estado} = req.query; 
        const { cuit } = req.params; 
        const allR = await Remito.find({ cuit });
        let remitos;

        if(estado === "Debe"){
            remitos = allR.filter(r => r.estado !== "Pagado");
            return res.json(remitos);
        } 
        if(estado === "Pagado"){
            remitos = allR.filter(r => r.estado !== "Debe");
            return res.json(remitos);
        }
        if(estado === 'todos'){
            return res.status(200).json(allR);
        }       
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
        const { numRemito, cliente, items, fecha, totPedido, cuit, condicion_pago, estado} = req.body; 

        const newRemito = new Remito({
            numRemito,
            cliente, 
            items,
            fecha, 
            totPedido, 
            cuit, 
            fecha: fecha, 
            condicion_pago, 
            estado
        });
        await newRemito.save();
        res.json(newRemito);
    } catch (error) {
        console.log(error);
    }
};

//modif
const modificaRemito = async(req, res) => {    
    try {
        const {_id} = req.params;
        const data = req.body;

        const remito = await Remito.findByIdAndUpdate(_id, data);

        if(!remito){ return res.send("No existe el remito")}

        res.send("Se modif con exito");

    } catch (error) {
        
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

//inserta una entrega de dinero 
const agregaEntrega = async(req, res) => {
    const {_id} = req.params;
    const {monto} = req.body; 
    const fechaActual = new Date(); //console.log("fecha:", fechaActual)
    try {
        let remito = await Remito.findById(_id);
        if(!remito){return res.send("No existe el remito")}

        remito.entrego.push({entrega: Number(monto), fechaEntrega: fechaActual});
        remito = await Remito.findByIdAndUpdate(_id, remito);
        res.json(remito);
    } catch (error) {
        console.log(error);
    }
}

module.exports = {
    getAllRemitos,
    getRemitosCliente,
    getRemitoById,
    ultimoRemito,
    creaRemito,
    modificaRemito,
    elimninaRemito,
    agregaEntrega,
}