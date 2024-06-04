const Cliente = require('../Models/cliente');

//trae clientes
const getAllClientes = async(req, res) => {
    try {
        const allClientes = await Cliente.find();
        res.json(allClientes);
    } catch (error) {
        console.log(error)
    }
};

module.exports = {
    getAllClientes,
};