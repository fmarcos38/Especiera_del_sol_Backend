const Proveedor = require('../Models/modelProveedor');

//trae proveedores
const getProveedores = async(req, res) => {
    try {
        const allProveedores = await Proveedor.find();
        const proveedores = allProveedores.map(p => {
            const newP = {
                nombre: p.nombre,
                apellido: p.apellido,
                nombreApe: p.nombre + " " + p.apellido,
                razonSocial:p.razonSocial,
                telefono:p.telefono,
                email:p.email,
                ciudad:p.ciudad,
                direccion:p.direccion,
                cuit:p.cuit,
                iva:p.iva,
                remitos:p.remitos,
            }
            return newP;
        });
        res.json(proveedores);
    } catch (error) {
        res.status(401).send("Algo salió mal");
        console.log(error);
    }
}

//busca por ID
const buscaProveedorPorNombre = async(req, res) => {
    try {
        const { nombre, apellido } = req.query;

        if (!nombre || !apellido) {
            return res.status(400).json({ message: 'Nombre y apellido son requeridos' });
        }

        const proveedor = await Proveedor.findOne({ nombre, apellido });
        if (!proveedor) {
            return res.status(404).json({ message: 'Proveedor no encontrado' });
        }

        res.status(200).json(proveedor);
    } catch (error) {
        console.log(error);
    }
};
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
        const { _id } = req.params;
        const updateData = req.body;

        const updatedProv = await Proveedor.findByIdAndUpdate(_id, updateData);

        if (!updatedProv) {
            return res.status(404).json({ message: 'Prov no encontrado' });
        }
        
        const provModificado = await Proveedor.findById({_id});
        res.json(provModificado);
    } catch (error) {
        res.status(500).json({ message: 'Error al actualizar el prov', error });
    }
};

//elimina 
const eliminaProv = async(req, res) => {
    try {
        const { _id } = req.params;
        
        const provEliminado = await Proveedor.findByIdAndDelete(_id).lean();

        if (!provEliminado) {
            return res.status(404).json({ message: 'Prov no encontrado' });
        }

        res.send({ message: 'Prov eliminado correctamente' });
    } catch (error) {
        res.status(500).json({ message: 'Error al eliminar el prov', error });
    }
};

module.exports = {
    getProveedores,
    buscaProveedorPorNombre,
    createProveedor,
    editaProveedor,
    eliminaProv
}