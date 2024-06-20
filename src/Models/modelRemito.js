const { Schema, model } = require('mongoose');

const RemitoSchema = Schema({
    num_remito: {type: Number, required: true},
    items: {type: Array, default:[], required: true},
    totPedido: {type: String, required: true},
    cuit: {type: Number, required: true},
    fecha_compra: {type: Date, required: true},
    condicion_pago: {type: String},
    estado: {type: String}
});

module.exports = model("Remitos", RemitoSchema);