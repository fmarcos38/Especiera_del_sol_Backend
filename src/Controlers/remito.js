const Remito = require('../Models/modelRemito');


const getAllRemitos = async(req, res) => {
    try {
        //así llega fecha: 2024-07-01
        const {estado, fechaDesde, fechaHasta} = req.query; console.log("data:", req.query)
        let filtro = {};

        //filtro por Debe o Pagado
        if(estado && estado !== "todos"){
            filtro.estado = estado;
        }
        //si vienen fechas
        if (fechaDesde && fechaHasta) {
            // Convertir fechaDesde al inicio del día
            const startDate = new Date(fechaDesde);
            startDate.setHours(0, 0, 0, 0);  // Inicio del día
        
            // Convertir fechaHasta al final del día
            const endDate = new Date(fechaHasta);
            endDate.setHours(23, 59, 59, 999);  // Final del día
        
            // Configurar el filtro con las fechas ajustadas
            filtro.fecha = {
                $gte: startDate,  // Desde el inicio de fechaDesde
                $lte: endDate     // Hasta el final de fechaHasta
            };
        } else if (!fechaDesde && !fechaHasta) {
            // Si no se proporcionan fechas, MUESTRA el mes ACTUAL con una hora ajustada
            const fechaActual = new Date();
        
            // Inicio del mes, estableciendo la hora a 01:00:00
            const mesInicio = new Date(Date.UTC(fechaActual.getFullYear(), fechaActual.getMonth(), 1, 1, 0, 0));
        
            // Fin del mes, ajustando el último día y estableciendo la hora a 23:59:59
            const mesFin = new Date(Date.UTC(fechaActual.getFullYear(), fechaActual.getMonth() + 1, 0, 23, 59, 59));
        
            filtro.fecha = {
                $gte: mesInicio,
                $lte: mesFin,
            };
        }
        
        const remitos = await Remito.find(filtro); //aplico filtro
        res.json(remitos);

    } catch (error) {
        console.log(error);
    }
};
//trae reitos de un cliente x cuit del cliente
const getRemitosCliente = async (req, res) => { 
    //así llega fecha: 2024-07-01
    try {
        const { estado, fechaDesde, fechaHasta } = req.query;
        const { cuit } = req.params;
        let filtro = { cuit }; // Inicializamos el filtro con el CUIT del cliente

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
        const remitos = await Remito.find(filtro);
        res.json(remitos);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
//trae el último remito para obtnere el num 
const ultimoRemito = async(req, res) => {
    try { 
        const remito =  await Remito.find().sort({$natural:-1}).limit(1);
        if(remito.length){
            res.json({
                ultimoRemito: remito[0].numRemito
            });
        }else{
            res.json({
                ultimoRemito: 0
            });
        }
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
        const { numRemito, cliente, items, fecha, totPedido, cuit, condicion_pago, estado, bultos, transporte} = req.body; 

        //calcula el tot de kgs del remito
        let totKgs = 0;
        items.forEach(item => {
            if(item.unidadMedida !== "unidad"){
                totKgs += item.cantidad;
            }
        });

        const newRemito = new Remito({
            numRemito,
            cliente, 
            items,
            fecha, 
            totPedido, 
            cuit,
            condicion_pago, 
            estado,
            bultos,
            transporte,
            totKgs
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
        const { numRemito, cliente, items, fecha, totPedido, cuit, condicion_pago, estado, bultos, transporte } = req.body; 
        
        // Calcula el tot de kgs del remito
        let totKgs = 0;
        items.forEach(item => {
            if(item.unidadMedida !== "unidad"){
                totKgs += item.cantidad;
            }
        });

        // Actualiza solo los campos necesarios
        const updatedFields = {
            numRemito,
            cliente, 
            items,
            fecha: fecha+'T01:00:00Z', 
            totPedido, 
            cuit, 
            condicion_pago, 
            estado,
            bultos,
            transporte,
            totKgs
        };

        const remito = await Remito.findByIdAndUpdate(_id, updatedFields, { new: true });

        if(!remito){ 
            return res.status(404).send("No existe el remito");
        }

        res.send("Se modificó con éxito");

    } catch (error) {
        console.error("Error al modificar el remito:", error);
        res.status(500).send("Error al modificar el remito");
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

//-----Manejo de entregas HACER un Modelo con su CRUD 
//inserta una entrega de dinero 
const agregaEntrega = async(req, res) => {
    const {_id} = req.params;
    const {monto, metodoPago} = req.body; 
    const fechaActual = new Date(); //console.log("fecha:", fechaActual)
    try {
        let remito = await Remito.findById(_id);
        if(!remito){return res.send("No existe el remito")}

        const newID = remito.entrego.length + 1;
        remito.entrego.push({id: newID, entrega: Number(monto), fechaEntrega: fechaActual, metodoPago: metodoPago});
        remito = await Remito.findByIdAndUpdate(_id, remito);
        res.json(remito);
    } catch (error) {
        console.log(error);
    }
}
//edita entrega
const editaEntrega = async (req, res) => {
    const { idRemito, idEntrega } = req.params; 
    const { monto, metodoPago } = req.body; 

    try {
        const remito = await Remito.findOneAndUpdate(
            { _id: idRemito, "entrego.id": parseInt(idEntrega) },
            {
                $set: {
                    "entrego.$.entrega": parseInt(monto),
                    "entrego.$.metodoPago": metodoPago
                }
            },
            { new: true }
        );

        if (!remito) {
            return res.status(404).json({ message: 'Remito o entrega no encontrada' });
        }

        res.json(remito);
    } catch (error) {
        console.error("Error al editar la entrega:", error);
        res.status(500).json({ message: 'Error al editar la entrega' });
    }
};
// Eliminar un elemento del arreglo "entrego"
const eliminarEntrega = async (req, res) => {
    const { idRemito, idEntrega } = req.params;

    try {
        // Buscar el remito por ID
        let remito = await Remito.findById(idRemito);
        if (!remito) {
            return res.status(404).json({ message: "Remito no encontrado" });
        }

        // Filtrar el array 'entrego' para eliminar el elemento con el ID proporcionado
        const newEntrego = remito.entrego.filter(e => e.id !== Number(idEntrega));

        // Actualizar el remito con el nuevo array 'entrego'
        remito.entrego = newEntrego;

        // Guardar los cambios en la base de datos
        await remito.save();

        res.json(remito);
    } catch (error) {
        console.error('Error al eliminar la entrega:', error);
        res.status(500).json({ message: 'Error al eliminar la entrega', error });
    }
};

//----Calcula Saldo anteriror de un cliente
const calcSaldoAnteriror = async(req, res) => {
    const {cuit} = req.params; //console.log("Cuit:", req.params);
    try {
        const remitos = await Remito.find({cuit}); 
        let saldo = 0;

        remitos.map(r => {
            if(r.estado === 'Debe'){
                saldo += r.totPedido;
                
            }
            r.entrego.map(e => {
                saldo -= e.entrega;
                return saldo;
            });            
            return saldo;
        });
        
        res.json({saldoAnt: saldo});
    } catch (error) {
        
    }
};


module.exports = {
    getAllRemitos,
    getRemitosCliente,
    getRemitoById,
    ultimoRemito,
    creaRemito,
    modificaRemito,
    elimninaRemito,
    agregaEntrega,
    editaEntrega,
    eliminarEntrega,
    calcSaldoAnteriror
}