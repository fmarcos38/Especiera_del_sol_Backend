const { Schema, model } = require('mongoose');

const RemitoSchema = Schema({
    items: {type: Array, default:[]},
    totPedido: {type: String, required: true},
    id_cliente: {type: String, required: true},
    fecha_compra: {type: Date}
});

module.exports = model("Remitos", RemitoSchema);