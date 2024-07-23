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