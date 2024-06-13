const { Schema, model } = require('mongoose');

const ProveedorSchema = Schema({
    nombre: {type: String, required: true,},
    apellido: {type: String, required: true},
    razonSocial: {type: String, required: true},
    telefono: {type: Number, required: true},
    email: {type: String},
    ciudad: {type: String},
    direccion: {type: String},
    cuit: {type: Number, required: true},
    iva: {type: String, required: true},
    remitos: {type: Array, default:[]}
});

module.exports = model("Proveedor", ProveedorSchema);