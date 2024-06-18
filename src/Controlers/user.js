const User = require('../Models/modelUser');

//crea user
const creaUser = async(req, res) => {
    try {
        const { email, password } = req.body;

        const existeEmail = await User.findOne({email});
        if(existeEmail){ return RTCRtpSender("Ya existe usuario con ese Email")};

        const newUser = new User({
            email,
            password
        });
        await newUser.save();
        res.send("Usuario creado!!");
    } catch (error) {
        console.log(error);
    }
}

module.exports = {
    creaUser,
}