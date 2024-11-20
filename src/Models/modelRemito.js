const { Schema, model } = require('mongoose');

const RemitoSchema = Schema({
    cliente: {type: String, required: true },
    numRemito: {type: Number},
    items: {type: Array, default:[]},
    totPedido: {type: Number, required: true},
    cuit: {type: Number, required: true},
    fecha: {type: Date, required: true},
    condicion_pago: {type: String},
    estado: {type: String},
    bultos: {type: Number},
    totKgs: {type: Number},
    tipoRemito: {type: String}, //venta o pago
});

module.exports = model("Remitos", RemitoSchema);