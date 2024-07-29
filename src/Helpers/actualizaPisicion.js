const Producto = require('../Models/modelProductos');

// Función para actualizar las posiciones de los productos
async function actualizaPosiciones(posicionInicial) {
    await Producto.updateMany(
        { posicionLista: { $gte: posicionInicial } },
        { $inc: { posicionLista: 1 } }
    );
}


module.exports = {
    actualizaPosiciones,
} 