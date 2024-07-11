const {Schema, model} = require('mongoose');

const ReporteSchema = new Schema({
    mes: {type: String},
    compras: {type: Number},
    ventas: {type: Number},
    gastos: {type: Array}, //trae los gastos como Lus, Alq, etc
    resultado: {type: Number},
});

module.exports = model("Reporte", ReporteSchema);