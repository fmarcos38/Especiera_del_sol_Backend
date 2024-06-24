const { Schema, model } = require('mongoose');

const RemitoSchema = Schema({
    numRemito: {type: Number, required: true},
    items: {type: Array, default:[], required: true},
    totPedido: {type: Number, required: true},
    cuit: {type: Number, required: true},
    fecha: {type: Date, required: true},
    condicion_pago: {type: String},
    estado: {type: String}
});

module.exports = model("Remitos", RemitoSchema);