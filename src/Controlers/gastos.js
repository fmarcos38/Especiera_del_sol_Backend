const Gastos = require('../Models/modelGastos');

//trae
const getAllGastos = async(req, res) => { 
    const {year, month} = req.query;
    let gastos;

    try {        
        if (year && month) {
            const startDate = new Date(year, month - 1, 1);
            const endDate = new Date(year, month, 1);

            gastos = await Gastos.find({
                fecha: {
                    $gte: startDate,
                    $lt: endDate,
                },
            });
            if(!gastos){ return res.send("No hay ventas")}

            return res.json(gastos);
        }else{
            gastos = await Gastos.find();
            return res.json(gastos);
        }
    } catch (error) {
        
    }
};
 //crea
const createGasto = async(req, res) => {
    const {descripcion, monto} = req.body;
    try {
        const newGasto = new Gastos({
            fecha: new Date(),
            descripcion,
            monto
        });
        await newGasto.save();
        res.send("Creado con exito");
    } catch (error) {
        console.log(error);
    }
};

//trae por ID
const getByID = async(req, res) => {
    try {
        const {_id} = req.params; 
        const gasto = await Gastos.findById({_id});
        res.status(200).json(gasto);
    } catch (error) {
        console.log(error);
    }
};

//modif
const modificaGasto = async (req, res) => {
    try {
        const { _id } = req.params;
        const updateData = req.body;


        const updatedGoasto = await Gastos.findByIdAndUpdate(_id, updateData);

        if (!updatedGoasto) {
            return res.status(404).json({ message: 'Gasto no encontrado' });
        }

        //const gastoModificado = await Gastos.findById({_id});
        res.send("Modif con exito");
    } catch (error) {
        res.status(500).json({ message: 'Error al actualizar el cliente', error });
    }
};

//elimina
const eliminaGasto = async (req, res) => {
    try {
        const { _id } = req.params;

        const gasto = await Gastos.findByIdAndDelete(_id).lean();

        if (!gasto) {
            return res.status(404).json({ message: 'gasto no encontrado' });
        }

        res.send({ message: 'Gasto eliminado correctamente' });
    } catch (error) {
        res.status(500).json({ message: 'Error al eliminar el gasto', error });
    }
};

module.exports = {
    getAllGastos,
    createGasto,
    getByID,
    modificaGasto,
    eliminaGasto,
}