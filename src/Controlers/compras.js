const Compra = require('../Models/modelCompras');

const getAllCompras = async(req, res) => {
    //así llega fecha: 2024-07-01
    try {
        const { detalle, estado, fechaDesde, fechaHasta } = req.query; console.log("data:" ,req.query)
        let filtro = {}; 

        //filtro por detalle (Compra o Anticipo)
        if(detalle && detalle !== "todos"){
            filtro.detalle = detalle;
        }
        // Filtro por estado (Debe o Pagado) si se proporciona
        if (estado && estado !== "todos") {
            filtro.estado = estado;
        }

        // Filtro por fechas si se proporcionan
        if (fechaDesde && fechaHasta) {
            const startDate = new Date(fechaDesde);
            startDate.setHours(0, 0, 0, 0); // Establece la hora al inicio del día

            const endDate = new Date(fechaHasta);
            endDate.setHours(23, 59, 59, 999); // Establece la hora al final del día

            filtro.fecha = {
                $gte: startDate,
                $lte: endDate,
            };
        } else if (!fechaDesde && !fechaHasta) {
            // Si no se proporcionan fechas, filtra por el mes actual
            const fechaActual = new Date();
            const mesInicio = new Date(fechaActual.getFullYear(), fechaActual.getMonth(), 1);
            const mesFin = new Date(fechaActual.getFullYear(), fechaActual.getMonth() + 1, 0);

            filtro.fecha = {
                $gte: mesInicio,
                $lte: mesFin,
            };
        }

        // Buscar los remitos que coincidan con el CUIT y el filtro aplicado
        const compras = await Compra.find(filtro);
        res.json(compras);
    } catch (error) {
        res.status(500).json({ message: error.message });
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
    //así llega fecha: 2024-07-01
    try {
        const { detalle, estado, fechaDesde, fechaHasta } = req.query; 
        const { cuit } = req.params; 
        let filtro = { cuit}; // Inicializamos el filtro con el CUIT del cliente

        //filtro por detalle (Compra o Anticipo)
        if(detalle && detalle !== "todos"){
            filtro.detalle = detalle;
        }
        // Filtro por estado (Debe o Pagado) si se proporciona
        if (estado && estado !== "todos") {
            filtro.estado = estado;
        }

        // Filtro por fechas si se proporcionan
        if (fechaDesde && fechaHasta) {
            const startDate = new Date(fechaDesde);
            startDate.setHours(0, 0, 0, 0); // Establece la hora al inicio del día

            const endDate = new Date(fechaHasta);
            endDate.setHours(23, 59, 59, 999); // Establece la hora al final del día

            filtro.fecha = {
                $gte: startDate,
                $lte: endDate,
            };
        } else if (!fechaDesde && !fechaHasta) {
            // Si no se proporcionan fechas, filtra por el mes actual
            const fechaActual = new Date();
            const mesInicio = new Date(fechaActual.getFullYear(), fechaActual.getMonth(), 1);
            const mesFin = new Date(fechaActual.getFullYear(), fechaActual.getMonth() + 1, 0);

            filtro.fecha = {
                $gte: mesInicio,
                $lte: mesFin,
            };
        }

        // Buscar los remitos que coincidan con el CUIT y el filtro aplicado
        const compras = await Compra.find(filtro);
        res.json(compras);
    } catch (error) {
        res.status(500).json({ message: error.message });
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
    const {
        numCompra, 
        numRemitoProveedor, 
        transporte,
        proveedor, 
        items, 
        total, 
        detalle,
        estado, 
        producto, 
        cantidad, 
        unitario,
        observaciones, 
        detallePago,
        cuit
    } = req.body; 
    try {     
        if(detalle === 'Anticipo'){
            const newCompra = new Compra({
                fecha: Date.now(),
                proveedor,
                envio: "Pago",
                detalle,
                total,                
                cuit,
                detallePago,
                estado: "Pago"
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
                cuit: Number(cuit),
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