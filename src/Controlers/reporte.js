const Reporte = require('../Models/modelReporte');
const Compra = require('../Models/modelCompras');
const Venta = require('../Models/modelRemito');

//trae compras de un mes
const getComprasMes = async(year, month) => {
    try {
        const startDate = new Date(year, month - 1, 1);
        const endDate = new Date(year, month, 1);

        const compras = await Compra.find({
            fecha: {
                $gte: startDate,
                $lt: endDate,
            },
        });

        return compras;
    } catch (error) {
        return({ error: 'Error al obtener las compras' });
    }
};
//trae ventas de un mes
const getVentasMes = async(year, month) => {
    try {
        const startDate = new Date(year, month - 1, 1);
        const endDate = new Date(year, month, 1);

        const ventas = await Venta.find({
            fecha: {
                $gte: startDate,
                $lt: endDate,
            },
        });

        return ventas;
    } catch (error) {
        return({ error: 'Error al obtener las ventas' });
    }
};

//crea reporte
const createReporte = async(req, res) => {
    const {year, month} = req.body;
    try {
        const comprasMes = await getComprasMes(year, month); console.log("compras:", comprasMes)
        const ventasMes = await getVentasMes(year, month); console.log("ventas:", ventasMes)
        let totCompras = 0;
        let totVentas = 0;
        let totalGastosMes = 0;
        let totalMes = 0;
        let mes;
        let resultado;

        comprasMes.map(c => {
            if(c.detalle === "Compra"){
                return totCompras += c.total;
            }
        });
        ventasMes.map(c => {
            return totVentas += c.totPedido;
        });
        //calc tot mes
        totalMes = totVentas - totCompras - totalGastosMes;

        if(month === "01") {mes = "Enero"}
        if(month === "02") {mes = "Febrero"}
        if(month === "03") {mes = "Mayo"}
        if(month === "04") {mes = "Abril"}
        if(month === "05") {mes = "Mayo"}
        if(month === "06") {mes = "Junio"}
        if(month === "07") {mes = "Julio"}
        if(month === "08") {mes = "Agosto"}
        if(month === "09") {mes = "Septiembre"}
        if(month === "10") {mes = "Octubre"}
        if(month === "11") {mes = "Noviembre"}
        if(month === "12") {mes = "Diciembre"}
        
        const newMonth = new Reporte({
            mes,
            compras: totCompras,
            ventas: totVentas,
            gastos: totalGastosMes,
            resultado: totalMes
        });
        await newMonth.save();

        res.json(newMonth);
    } catch (error) {
        console.log(error);
    }
};

module.exports = {
    createReporte,
}