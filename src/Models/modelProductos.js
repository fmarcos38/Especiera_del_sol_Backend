const { Schema, model } = require("mongoose");

const ProductoSchema = Schema({
    nombre: {type: String, required: true, unique: true},
    unidadMedida: {type: String, },
    precioKg: {type: Number, required: true},
    envase: {type: Number, required: true },
    costo: {type: Number, required: true },
    posicionLista: {type: Number, required: true },
});

module.exports = model("Producto", ProductoSchema);