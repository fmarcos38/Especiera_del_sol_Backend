const User = require('../Models/modelUser');
const CryptoJS = require('crypto-js');
const jwt = require('jsonwebtoken');

//crea user
const creaUser = async(req, res) => {
    try {
        const { email, password } = req.body;

        const existeEmail = await User.findOne({email});
        if(existeEmail){ return RTCRtpSender("Ya existe usuario con ese Email")};

        //cifro pass
        passwordEncript = CryptoJS.AES.encrypt( password, process.env.PASS_SEC ).toString();
        //creo user
        const newUser = new User({
            email,
            password: passwordEncript
        });

        await newUser.save();
        res.send("Usuario creado!!");
    } catch (error) {
        console.log(error);
    }
}

//trea usuarios
const getAllUsers = async(req, res) => {
    try {
        const usuarios = await User.find();

        res.status(200).json(usuarios);
    } catch (error) {
        console.log(error);
    }
}

//elimina usuario
const elimnaUsuariio = async(req, res) => {
    try {
        const { _id } = req.params;

        const usuarioEliminado = await User.findByIdAndDelete({_id});
        if(!usuarioEliminado){ return res.send("El usuario con ese ID no existe")}

        res.send("Se eliminó con exito")
    } catch (error) {
        console.log(error);
    }
}
module.exports = {
    creaUser,
    getAllUsers,
    elimnaUsuariio
}