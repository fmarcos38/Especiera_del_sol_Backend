const { Schema, model } = require('mongoose');

const UserSchema = Schema({
    nombre: {type: String, require:true},
    email: {type: String, require:true},
    password: {type: String, require:true},
    esAdmin: {type: Boolean, require:true},
});

module.exports = model("User", UserSchema); 