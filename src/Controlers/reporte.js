const Ventas = require('../Models/modelRemito');
const Compras = require('../Models/modelCompras');
const Gastos = require('../Models/modelGastos');

//funcion trae ventas
const traeVentas = async(month, year) => {
    try {
        let ventas;
        let totVentas = 0;
        let totGanancias = 0;

        if (year && month !== 0) {
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
            //caclulo ganancia
            ventas.map(v => {
                return totGanancias += calcGanancia(v.items);
            });
            return {
                totVentas,
                totGanancias
            };
        }else{
            ventas = await Ventas.find();            
            ventas.map(v => {
                return totVentas += v.totPedido;
            });
            //caclulo ganancia
            ventas.map(v => {
                return totGanancias += calcGanancia(v.items);
            });
            return {
                totVentas,
                totGanancias
            };
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
            gastos = await Gastos.find();
            gastos.map(c => {
                return totGastos += c.monto;
            });
            return totGastos;
        }
    } catch (error) {
        
    }
};
//funcion calc la ganancia de c/venta
//recibe por parametro un  remitos
const calcGanancia = (items) => {
    let ganacia = 0;
    items.map(item => {  
        ganacia += ((item.unitario * item.cantidad) - (item.costo * item.cantidad));
    });
    return ganacia;
};


//crea reporte 
const reporteMes = async(req, res) => {
    const {month, year, meses} = req.query; 
    let ventas = 0, compras = 0, gastos = 0, reporte;
    const reporteMeses = [];

    try {
        //por mes para un año x; retorna un obj
        if(month && year){
            ventas = await traeVentas(month, year);
            compras = await traeCompras(month, year);
            gastos = await traeGastos(month, year);
            reporte = {
                ventas: ventas.totVentas,
                ganancias: ventas.totGanancias,
                compras,
                gastos,
                month,
                year
            }
            return res.json(reporte);
        }
        //los meses de un año x; retorna un array de obj
        if(!month && year && meses === "true"){ 
            for (let index = 0; index < 12; index++) {
                ventas = await traeVentas([index + 1], year);
                compras = await traeCompras([index + 1], year);
                gastos = await traeGastos([index + 1], year);                
                reporteMeses.push({
                    ventas: ventas.totVentas,
                    ganancias: ventas.totGanancias,
                    compras,
                    gastos,
                    month: index + 1,
                    year
                });                
            }
            return res.json(reporteMeses);
        }
        //solo un año; retorna un obj
        if(!month && year){ 
            ventas = await traeVentas(0, year);
            compras = await traeCompras(0, year);
            gastos = await traeGastos(0, year);
            reporte = {
                ventas: ventas.totVentas,
                ganancias: ventas.totGanancias,
                compras,
                gastos,
                year
            }
            return res.json(reporte);
        }
        
        return res.send("No hay reportes para dicha fecha")
    } catch (error) {
        console.log(error);
    }
};


module.exports = {
    reporteMes,
}