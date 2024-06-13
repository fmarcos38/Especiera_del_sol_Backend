const Cliente = require('../Models/modelCliente');

//trae clientes
const getAllClientes = async(req, res) => {
    try {
        const allClientes = await Cliente.find();
        res.json(allClientes);
    } catch (error) {
        console.log(error)
    }
};

//trae por ID
const getByID = async(req, res) => {
    try {
        const {_id} = req.params; 
        const cliente = await Cliente.findById({_id});
        res.status(200).json(cliente);
    } catch (error) {
        console.log(error);
    }
};

//trae cliente por nombre
const buscaClientePorNombre = async (req, res) => {
    try {
        const { nombre, apellido } = req.query;

        if (!nombre || !apellido) {
            return res.status(400).json({ message: 'Nombre y apellido son requeridos' });
        }

        const client = await Cliente.findOne({ nombre, apellido });

        if (!client) {
            return res.status(404).json({ message: 'Cliente no encontrado' });
        }

        res.json(client.toObject()); // Convertir a objeto plano
    } catch (error) {
        res.status(500).json({ message: 'Error al buscar el cliente', error });
    }
};

//crea cliente
const createCliente = async(req, res) => {
    try {
        const {nombre,apellido, razonSocial, telefono, email, ciudad, direccion, iva, cuit} = req.body;

        const existeCliente = await Cliente.findOne({ cuit });
        if(existeCliente){
            return res.send("Ese cliente ya existe");
        }else{
            const nuevoCliente = new Cliente({
                nombre,apellido, razonSocial, telefono, email, ciudad, direccion, iva, cuit
            });
            await nuevoCliente.save();
            return res.status(200).send("Cliente creado con exito");
        }
    } catch (error) {
        console.log(error);
    }
};

//modifica un cliente
const modificaCliente = async (req, res) => {
    try {
        const { _id } = req.params;
        const updateData = req.body;


        const updatedClient = await Cliente.findByIdAndUpdate(_id, updateData);

        if (!updatedClient) {
            return res.status(404).json({ message: 'Cliente no encontrado' });
        }

        res.json(updatedClient);
    } catch (error) {
        res.status(500).json({ message: 'Error al actualizar el cliente', error });
    }
};

//elimina cliente
const eliminaCliente = async (req, res) => {
    try {
        const { _id } = req.params;

        const deletedClient = await Cliente.findByIdAndDelete(_id).lean();

        if (!deletedClient) {
            return res.status(404).json({ message: 'Cliente no encontrado' });
        }

        res.json({ message: 'Cliente eliminado correctamente' });
    } catch (error) {
        res.status(500).json({ message: 'Error al eliminar el cliente', error });
    }
};

module.exports = {
    getAllClientes,
    getByID,
    createCliente,
    modificaCliente,
    buscaClientePorNombre,
    eliminaCliente
};