const { Schema, model } = require('mongoose');

const CompraSchema = Schema({
    fecha: {type:Date},
    proveedor: {type: String},
    estado: {type: String}, //toma valor "Debo" o "Pago"
    numCompra: {type: Number}, //num de compra a ese proveedor
    numRemitoProveedor: {type: Number},
    transporte: {type: String}, 
    producto: {type: String},
    cantidad: {type: Number}, 
    unitario: {type: Number}, 
    total: {type: Number},
    detalle: {type: String}, //toma el valo "Anticipo" o "Compra"
    detallePago: {type: String},
    items: {type: Array, default:[]},
    cuit: {type: Number},
});

module.exports = model("Compras", CompraSchema);