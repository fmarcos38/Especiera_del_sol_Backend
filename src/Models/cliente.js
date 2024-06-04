const { Schema, model } = require('mongoose');

const ClienteSchema = Schema({
    nombre: {type: String, required: true,},
    apellido: {type: String, required: true},
    telefono: {type: Number, required: true},
    email: {type: String},
    ciudad: {type: String},
    direccion: {type: String},
    remitos: {type: Array, default:[]}
});

module.exports = model("Cliente", ClienteSchema);