const { Schema, model } = require('mongoose');

const RemitoSchema = Schema({
    cliente: {type: String, required: true },
    numRemito: {type: Number, required: true},
    items: {type: Array, default:[], required: true},
    totPedido: {type: Number, required: true},
    entrego: {type: Array},
    cuit: {type: Number, required: true},
    fecha: {type: Date, required: true},
    condicion_pago: {type: String},
    estado: {type: String},
    bultos: {type: Number},
    transporte: {type: String},
    totKgs: {type: Number},
});

module.exports = model("Remitos", RemitoSchema);