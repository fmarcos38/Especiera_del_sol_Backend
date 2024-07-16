const Ventas = require('../Models/modelRemito');
const Compras = require('../Models/modelCompras');
const Gastos = require('../Models/modelGastos');

//funcion trae ventas
const traeVentas = async(month, year) => {
    try {
        let ventas;
        let totVentas = 0;

        if (year && month) {
            const startDate = new Date(year, month - 1, 1); 
            const endDate = new Date(year, month, 1); 

            ventas = await Ventas.find({
                fecha: {
                    $gte: startDate,
                    $lt: endDate,
                },
            });
            if(!ventas){ return "No hay ventas"}
            
            ventas.map(v => {
                return totVentas += v.totPedido;
            });

            return totVentas;
        }else{
            ventas = await Ventas.find();
            
            ventas.map(v => {
                return totVentas += v.totPedido;
            });

            return totVentas;
        }
    } catch (error) {
        
    }
};
//funcion trae Compras
const traeCompras = async(month, year) => {
    let compras;
    let totCompras = 0;

    try {
        if (year && month) {
            const startDate = new Date(year, month - 1, 1);
            const endDate = new Date(year, month, 1);

            compras = await Compras.find({
                fecha: {
                    $gte: startDate,
                    $lt: endDate,
                },
            });
            if(!compras){ return res.send("No hay ventas")}

            compras.map(c => {
                return totCompras += c.total;
            });
            return totCompras;
        }else{
            compras = await Compras.find();
            compras.map(c => {
                return totCompras += c.total;
            });
            return totCompras;
        }
    } catch (error) {
        
    }
};
//funcion trae Compras
const traeGastos = async(month, year) => {
    let gastos;
    let totGastos = 0;
    
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

            gastos.map(g => {
                return totGastos += g.monto;
            });
            return totGastos;
        }else{
            gastos.map(g => {
                return totGastos += g.monto;
            });
            return totGastos;
        }
    } catch (error) {
        
    }
};

//crea reporte para un mes del año
const reporteMes = async(req, res) => {
    const {month, year} = req.params; 
    let ventas, compras, gastos, reporte;

    try {
        if(month && year){
            ventas = await traeVentas(month, year);
            compras = await traeCompras(month, year);
            gastos = await traeGastos(month, year);
            reporte = {
                ventas,
                compras,
                gastos,
                month,
                year
            }
            return res.json(reporte);
        }else{
            return res.send("No hay reportes para dicha fecha")
        }

    } catch (error) {
        console.log(error);
    }
};


module.exports = {
    reporteMes,
}