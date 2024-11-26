const Remito = require('../Models/modelRemito');


const getAllRemitos = async (req, res) => {
    try {
        const { fechaDesde, fechaHasta } = req.query;
        let filtro = {};

        // Validación y manejo de fechas
        const esFechaValida = (fecha) => !isNaN(new Date(fecha).getTime());

        if (fechaDesde && fechaHasta) {
            if (esFechaValida(fechaDesde) && esFechaValida(fechaHasta)) {
                // Convertir fechaDesde al inicio del día en UTC
                const startDate = new Date(fechaDesde);
                startDate.setUTCHours(0, 0, 0, 0);

                // Convertir fechaHasta al final del día en UTC
                const endDate = new Date(fechaHasta);
                endDate.setUTCHours(23, 59, 59, 999);

                filtro.fecha = {
                    $gte: startDate,
                    $lte: endDate,
                };
            } else {
                return res.json({ message: "Las fechas proporcionadas no son válidas." });
            }
        } else if (!fechaDesde && !fechaHasta) {
            // Si no se proporcionan fechas, mostrar el mes actual
            const fechaActual = new Date();

            const mesInicio = new Date(Date.UTC(fechaActual.getFullYear(), fechaActual.getMonth(), 1));
            const mesFin = new Date(Date.UTC(fechaActual.getFullYear(), fechaActual.getMonth() + 1, 0, 23, 59, 59));

            filtro.fecha = {
                $gte: mesInicio,
                $lte: mesFin,
            };
        }

        // Obtener remitos según el filtro
        const remitos = await Remito.find(filtro);
        res.json(remitos);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error al obtener remitos." });
    }
};
//trae reitos de un cliente x cuit del cliente
const getRemitosCliente = async (req, res) => { 
    //así llega fecha: 2024-07-01
    try {
        const { fechaDesde, fechaHasta } = req.query;
        const { cuit } = req.params; 
        let filtro = { cuit }; // Inicializamos el filtro con el CUIT del cliente

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
const creaRemito = async (req, res) => {
    try {
        const { numRemito, cliente, items, fecha, totPedido, cuit, condicion_pago, estado, bultos, tipoRemito } = req.body;

        // Crear un objeto Date a partir de la fecha recibida (YYYY-MM-DD)
        let [year, month, day] = fecha.split('-'); // Dividimos la fecha recibida
        let fechaLocal = new Date(year, month - 1, day); // Aquí creamos la fecha local

        // Validar si la fecha se creó correctamente
        if (isNaN(fechaLocal.getTime())) {
            throw new Error('Fecha inválida');
        }

        // Obtener la hora actual local
        const ahora = new Date();

        // Ajustar la fecha recibida para asignar la hora actual local
        fechaLocal.setHours(ahora.getHours(), ahora.getMinutes(), ahora.getSeconds(), ahora.getMilliseconds());

        // Calcular el total de kgs del remito
        let totKgs = 0;
        items?.forEach(item => {
            if (item.unidadMedida !== "unidad") {
                totKgs += item.cantidad;
            }
        });

        // Crear un nuevo remito con la fecha y hora ajustada
        const newRemito = new Remito({
            numRemito,
            cliente,
            items,
            fecha: fechaLocal, // Utilizamos la fecha con la hora ajustada
            totPedido,
            tipoRemito,
            cuit,
            condicion_pago,
            estado,
            bultos,
            totKgs
        });
        
        // Guardar el nuevo remito en la base de datos
        await newRemito.save();
        
        // Devolver el nuevo remito como respuesta
        res.json(newRemito);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Error al crear el remito" });
    }
};
//modif
const modificaRemito = async(req, res) => {    
    try {
        const {_id} = req.params;
        const { cliente, items, fecha, totPedido, cuit, condicion_pago, bultos } = req.body; 
        console.log("Modif body:", req.body);

        // Calcula el tot de kgs del remito
        let totKgs = 0;
        items?.forEach(item => {
            if(item.unidadMedida !== "unidad"){
                totKgs += item.cantidad;
            }
        });

        // Verifica si la fecha está definida y bien formateada
        let fechaFormateada = fecha ? new Date(fecha).toISOString().split('T')[0] + 'T01:00:00Z' : undefined;

        // Busca el remito a modificar
        const remitoModif = await Remito.findById(_id);
        if (!remitoModif) {
            return res.status(404).send("No existe el remito");
        }

        // Actualiza solo los campos necesarios
        const updatedFields = {
            numRemito: remitoModif.numRemito,
            cliente: cliente || remitoModif.cliente, 
            items: items || remitoModif.items,
            fecha: fechaFormateada || remitoModif.fecha, 
            totPedido: totPedido || remitoModif.totPedido, 
            cuit: cuit || remitoModif.cuit, 
            condicion_pago: condicion_pago || remitoModif.condicion_pago, 
            bultos: bultos || remitoModif.bultos,
            totKgs: totKgs || remitoModif.totKgs
        };

        const remito = await Remito.findByIdAndUpdate(_id, updatedFields, { new: true });

        if (!remito) { 
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
        const {_id} = req.params; console.log("Elimina id:", _id);
        const remito = await Remito.findByIdAndDelete({_id});

        if(!remito){ return res.send("Remito no encontrado")}

        res.json(remito);
    } catch (error) {
        console.log(error);
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
    calcSaldoAnteriror
}