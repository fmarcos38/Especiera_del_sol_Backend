const Compra = require('../Models/modelCompras');

const getAllCompras = async(req, res) => {
    try {
        const {estado} = req.query;
        const compras = await Compra.find();
        
        res.json(compras);
    } catch (error) {
        console.log(error);
    }
};

//trae compras hacia un prov y retorna el num del úlltimo remito
const getUltimoRemito = async(req, res) => {
    try {
        const { proveedor } = req.query; 
        const compras = await Compra.find({proveedor});

        if(!compras){ return res.send("No se encontraron compras para dicho Prov")}

        //obtengo el el num del últimop remito
        let ultimoRemito = null;
        for(let i=0; i<compras.length; i++) {
            if(compras[i].numCompra){
                ultimoRemito = compras[i].numCompra;
            }
        };
        
        res.json({numR: ultimoRemito});
    } catch (error) {
        console.log(error);
    }
};

//trae compras de un proveedor por el cuit del prov y estado Debo O Pago
const getComprasProveedor = async(req, res) => {
    try {
        const { proveedor, estado } = req.query; 
        const compras = await Compra.find({proveedor});
        let comprasEstado;

        if(!compras){ return res.send("No se encontraron compras para dicho Prov")}

        if(estado){
            if(estado === "Debo"){
                comprasEstado = compras.filter(c => c.estado !== 'Pago');
                return res.json(comprasEstado);
            }
            if(estado === 'Pago'){
                comprasEstado = compras.filter(c => c.estado !== 'Debo');
                return res.json(comprasEstado);
            }
        }

        res.json(compras);
    } catch (error) {
        console.log(error);
    }
};

//trae remito por id
const getRemito = async(req, res) => {
    try {
        const {_id} = req.params; 
        const compra = await Compra.findById({_id});
        res.status(200).json(compra);
    } catch (error) {
        console.log(error);
    }
};

//crea
const creaCompra = async(req, res) => {
    try {
        const {
            numCompra, 
            numRemitoProveedor, 
            transporte,
            proveedor, 
            items, 
            total, 
            detalle, 
            producto, 
            cantidad, 
            unitario, 
            estado, 
            observaciones, 
            detallePago
        } = req.body;

        if(detalle === 'Anticipo'){
            const newCompra = new Compra({
                fecha: Date.now(),
                proveedor,
                envio: "Pago",
                detalle,
                total,                
                estado,
                detallePago,
            });
            await newCompra.save();
            return res.json(newCompra);
        }else{
            const newCompra = new Compra({
                fecha: Date.now(),
                numCompra,
                numRemitoProveedor,
                transporte,
                proveedor,
                producto, 
                cantidad, 
                unitario,
                detalle,
                total,
                estado,
                observaciones,
                detallePago,
                items,
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
        const {_id} = req.params; console.log("ID:", _id);
        const compra = await Compra.findByIdAndDelete({_id});

        if(!compra){ return res.send("compra no encontrada")}

        res.json(compra);
    } catch (error) {
        console.log(error);
    }
};


module.exports = {
    getAllCompras,
    getUltimoRemito,
    getComprasProveedor,
    getRemito,
    creaCompra,
    modificaCompra,
    eliminaCompra,
}