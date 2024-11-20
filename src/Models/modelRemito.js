const { Schema, model } = require('mongoose');

const RemitoSchema = Schema({
    cliente: {type: String, required: true },
    numRemito: {type: Number},
    items: {type: Array, default:[]},
    totPedido: {type: Number, required: true},
    tipoRemito: {type: String, required: true }, //venta o pago
    cuit: {type: Number, required: true},
    fecha: {type: Date, required: true},
    condicion_pago: {type: String},
    estado: {type: String}, //pagado - debe
    bultos: {type: Number},
    totKgs: {type: Number},    
});

module.exports = model("Remitos", RemitoSchema);
