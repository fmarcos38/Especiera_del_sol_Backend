const { Schema, model } = require('mongoose');

const CompraSchema = Schema({
    fecha: {type:Date},
    proveedor: {type: String},
    envio: {type: String}, //toma valor "Pago" o numRemito
    items: {type: Array, default:[]},
    total: {type: Number, require:true},
    detalle: {type: String}, //podría tomar el valo "anticipo" o números
    estado: {type: String},
    observaciones: {type: String},
    detallePago: {type: String},
});

module.exports = model("Compras", CompraSchema);