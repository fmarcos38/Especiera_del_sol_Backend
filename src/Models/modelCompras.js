const { Schema, model } = require('mongoose');

const CompraSchema = Schema({
    fecha: {type:Date},
    proveedor: {type: String},
    envio: {type: String}, //toma valor "Pago"
    numRemito: {type: Number},
    producto: {type: String},
    cantidad: {type: String}, 
    unitario: {type: Number}, 
    total: {type: Number},
    detalle: {type: String}, //toma el valo "Anticipo" o "Compra"
    estado: {type: String},    
    detallePago: {type: String},
    items: {type: Array, default:[]},
});

module.exports = model("Compras", CompraSchema);