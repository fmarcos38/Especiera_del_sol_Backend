const Gasto = require('../Models/modelGastos');

//trae
const getAllGastos = async(req, res) => {
    const {year, month} = req.params;
    let gastos;

    try {
        if (year && month) {
            const startDate = new Date(year, month - 1, 1);
            const endDate = new Date(year, month, 1);

            gastos = await Gasto.find({
                fecha: {
                    $gte: startDate,
                    $lt: endDate,
                },
            });
            if(!gastos){ return res.send("No hay gastos")}

            return res.json(gastos);
        }
            gastos = await Gasto.find();

            res.json(gastos);
    } catch (error) {
        console.log(error);
    }
};
 //crea
const createGasto = async(req, res) => {
    const {descripcion, monto} = req.body;
    try {
        const newGasto = new Gasto({
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

//modif
//elimn

module.exports = {
    getAllGastos,
    createGasto,
}