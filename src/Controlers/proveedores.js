const Proveedor = require('../Models/modelProveedor');

//trae proveedores
const getProveedores = async(req, res) => {
    try {
        const allProveedores = await Proveedor.find();
        res.json(allProveedores);
    } catch (error) {
        res.status(401).send("Algo salió mal");
        console.log(error);
    }
}

//crea proveed
const createProveedor = async(req, res) => {
    try {
        const {nombre,apellido, razonSocial, telefono, email, ciudad, direccion, iva, cuit} = req.body;

        const existeCliente = await Proveedor.findOne({ cuit });
        if(existeCliente){
            return res.send("Ese proveedor ya existe");
        }else{
            const nuevoProveedor = new Proveedor({
                nombre,apellido, razonSocial, telefono, email, ciudad, direccion, iva, cuit
            });
            await nuevoProveedor.save();
            return res.status(200).send("Proveed creado con exito");
        }
    } catch (error) {
        console.log(error);
    }
};

//editar
const editaProveedor = async(req, res) => {
    try {
        const {_id} = req.params;
        const {data} = req.body;

        const provMidif = await Cliente.findByIdAndUpdate(_id, updateData);

        if(!prov){
            return res.send("Prov no encontrado");
        }

        res.json(provMidif);
    } catch (error) {
        
    }
}
module.exports = {
    getProveedores,
    createProveedor,
    editaProveedor,
}