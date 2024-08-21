const Ventas = require('../Models/modelRemito');
const Compras = require('../Models/modelCompras');
const Gastos = require('../Models/modelGastos');

//retorna un array con todas las ventas del Mes --> para mostrar por día
const traeVentasMes = async(month, year) => {
    try {
        let ventas;
        //si viene año y mes

        const startDate = new Date(year, month - 1, 1);
        const endDate = new Date(year, month, 1);

        ventas = await Ventas.find({
            fecha: {
                $gte: startDate,
                $lt: endDate,
            },
        });
        if (!ventas) { return "No hay ventas" }

        return ventas;

    } catch (error) {
        
    }
};
//funcion trae Compras PARA un MES
const traeComprasMes = async (month, year) => {
    try {
        const startDate = new Date(year, month - 1, 1);
        const endDate = new Date(year, month, 1);

        // Buscar solo las compras (excluir anticipos) dentro del rango de fechas
        const compras = await Compras.find({
            fecha: {
                $gte: startDate,
                $lt: endDate,
            },
            detalle: 'Compra' // Solo compras, excluye anticipos
        });

        if (!compras || compras.length === 0) {
            return "No hay compras";
        }

        return compras;
    } catch (error) {
        console.error("Error al traer las compras del mes:", error);
        throw error;
    }
};

//funcion trae gastos PARa un MES
const traeGastosMes = async(month, year) => {
    let gastos;    
    try {        
        const startDate = new Date(year, month - 1, 1);
            const endDate = new Date(year, month, 1);

            gastos = await Gastos.find({
                fecha: {
                    $gte: startDate,
                    $lt: endDate,
                },
            });
            if(!gastos){ return res.send("No hay ventas")}

            return gastos;
        
    } catch (error) {
        
    }
};

//funcion trae ventas Calc todo el mes Retorna el tot del mes
const traeVentas = async(month, year) => {
    try {
        let ventas;
        let totVentas = 0;
        let totGanancias = 0;
        let totKgs = 0;
        //si viene año y mes
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
            //calc tot Kgs Vendidos
            totKgs = totKgsVendidos(ventas);

            return {
                totVentas,
                totGanancias,
                totKgs
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
            //calc tot Kgs Vendidos
            const totKgs = totKgsVendidos(ventas);
            return {
                totVentas,
                totGanancias,
                totKgs
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
//funcion trae gastos
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
//funcion calc la ganancia de c/venta, recibe por parametro un  remitos
const calcGanancia = (items) => {
    let ganacia = 0;
    items.map(item => {  
        ganacia += ((item.unitario * item.cantidad) - (item.costo * item.cantidad));
    });
    return ganacia;
};
//funcion asigna nombre del mes
const nombreMes = (num) => {
    if(num === 1) {return "Enero"}
    if(num === 2) {return "Febrero"}
    if(num === 3) {return "Marzo"}
    if(num === 4) {return "Abril"}
    if(num === 5) {return "Mayo"}
    if(num === 6) {return "Junio"}
    if(num === 7) {return "Julio"}
    if(num === 8) {return "Agosto"}
    if(num === 9) {return "Septiembre"}
    if(num === 10) {return "Octubre"}
    if(num === 11) {return "Noviembre"}
    if(num === 12) {return "Diciembre"}
};
//funcion calc kgs vendidos
const totKgsVendidos = (ventas) => {
    let tot = 0;
    ventas.map(remito => {
        remito.items.map(item => {
            return tot += item.cantidad;
        });
        return tot;
    });
    return tot;
}
//----------------------------------------------------------------------
//trae reportes
const reporteMes = async(req, res) => {
    const {month, year, meses} = req.query; 
    let ventas = 0, compras = 0, gastos = 0, reporte;
    const reporteMeses = [];

    try {
        //por mes para un año x; retorna un obj
        if(month && year){ 
            ventas = await traeVentasMes(month, year);
            compras = await traeComprasMes(month, year);
            gastos = await traeGastosMes(month, year);
            reporte = {
                ventas,
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
                    totKgs: ventas.totKgs,
                    ganancias: ventas.totGanancias,
                    compras,
                    gastos,
                    month: nombreMes(index + 1),
                    year
                });                
            }
            return res.json(reporteMeses);
        }
        //solo un año; retorna un obj
        if(!month && year){ 
            ventas = await traeVentas(0, year); console.log("ventas:", ventas)           
            compras = await traeCompras(0, year);
            gastos = await traeGastos(0, year);
            reporte = {
                ventas: ventas.totVentas,
                totKgs: ventas.totKgs,
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