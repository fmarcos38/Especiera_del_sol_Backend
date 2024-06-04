const { Schema, model } = require("mongoose");

const ProductoSchema = Schema({
    nombre: {type: String, required: true, unique: true},
    precioKg: {type: Number, required: true},
    precioUnidad: {type: Number, required: true },
    kgsUnidad: {type: Number, required: true },
    imagen: {type: String },
    cloudinary_id: { type: String },
    enPromo: {type: Boolean, default: false}
});

module.exports = model("Producto", ProductoSchema);