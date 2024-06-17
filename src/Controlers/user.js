const User = require('../Models/modelUser');
const CryptoJS = require('crypto-js');
const jwt = require('jsonwebtoken');


const login = async (req, res) => {
    try {

        //busco user (tiene q existir para pooder log)
        const user = await User.findOne({ email: req.body.email });
        if (!user) { return res.status(401).json({ message: "No existe user c/ese email!" }) }
        else {
            //si exist, desencripto pass q viene de la DB
            const hashedPassword = CryptoJS.AES.decrypt(user.password, process.env.PASS_SEC);
            //paso a string la pass antes desncrip
            const OriginalPassword = hashedPassword.toString(CryptoJS.enc.Utf8);
            //comparo la q viene de la DB con la del front
            //console.log("pass:", hashedPassword)
            if (OriginalPassword !== req.body.password) {
                return res.status(401).json({ message: "Contraseña incorrecta!" });
            }

            //si el user es correcto CREO el JWT, para mayor seguridad de mi aplicacion, q se asocia con el email del user
            const token = jwt.sign({ email: user.email }, process.env.JWT_SEC);

            res.json({//res --> del login -->esta info esta alojada en -->user._doc CORROBORAR
                user,
                token,
            });
        }

    } catch (error) {
        console.log(error);
    }
};

module.exports = {
    login,
}