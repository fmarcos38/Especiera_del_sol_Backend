const {Schema, model} = require('mongoose');

const GastoSchema = new Schema({
    fecha: {type: Date},
    descripcion: {type: String},
    monto: {type: Number}
});

module.exports = model("Gasto", GastoSchema);