const Cliente = require('../Models/modelCliente');

//trae clientes
const getAllClientes = async(req, res) => {
    try {
        const allClientes = await Cliente.find().sort({ apellido: 1 }); // Ordena alfabéticamente por el campo 'apellido'
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

//trae cliente por nombreApellido
const buscaClientePorNombre = async (req, res) => { 
    try {
        const { nombreApellido } = req.query;

        if (!nombreApellido) {
            return res.status(400).json({ message: 'Nombre y apellido son requeridos' });
        }

        const cliente = await Cliente.findOne({ nombreApellido });
        if (!cliente) {
            return res.status(404).json({ message: 'Cliente no encontrado' });
        }

        res.status(200).json(cliente);
    } catch (error) {
        console.log(error);
    }
};

//trea cliente por cuit
const buscaClientePorCuit = async(req, res) => {
    try {
        const {cuit} = req.query; 

        if (!cuit) {
            return res.status(400).json({ message: 'El CUIT es requerido' });
        }
        const cliente = await Cliente.findOne({cuit}); 

        if(!cliente){
            return res.send("El cliente no existe");
        }

        res.json(cliente);
    } catch (error) {
        console.log(error);
    }
};

//crea cliente
const createCliente = async (req, res) => {
    try {
        const { nombre, apellido, razonSocial, telefono, email, ciudad, direccion, iva, cuit } = req.body;

        const existeClienteNombreApellido = await Cliente.findOne({ nombre, apellido });
        const existeClienteEmail = await Cliente.findOne({ email });
        const existeClienteCuit = await Cliente.findOne({ cuit });

        if (existeClienteNombreApellido) {
            return res.status(400).json({ message: `Ya existe un cliente ${nombre} ${apellido}` });
        }
        if (existeClienteEmail) {
            return res.status(400).json({ message: `Ya existe un cliente con email: ${email}` });
        }
        if (existeClienteCuit) {
            return res.status(400).json({ message: `Ya existe un cliente con cuit: ${cuit}` });
        }

        const nuevoCliente = new Cliente({
            nombre,
            apellido,
            nombreApellido: `${nombre} ${apellido}`,
            razonSocial,
            telefono,
            email,
            ciudad,
            direccion,
            iva,
            cuit
        });

        await nuevoCliente.save();
        return res.status(201).json({ message: 'Cliente creado con éxito' });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: 'Error al crear el cliente' });
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

        const clienteModificado = await Cliente.findById({_id});
        res.json(clienteModificado);
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

        res.send({ message: 'Cliente eliminado correctamente' });
    } catch (error) {
        res.status(500).json({ message: 'Error al eliminar el cliente', error });
    }
};

module.exports = {
    getAllClientes,
    getByID,
    buscaClientePorCuit,
    createCliente,
    modificaCliente,
    buscaClientePorNombre,
    eliminaCliente
};