const { Schema, model } = require('mongoose');

const CompraSchema = Schema({
    fecha: {type:Date},
    numRemito: {type: Number},
    items: {type: Array, default:[]},
    total: {type: Number, require:true},
    detalle: {type: String}, //podría tomar el valo "anticipado" o números
    estado: {type: String},
    observaciones: {type: String},
    detallePago: {type: String},
});

module.exports = model("Compras", CompraSchema);