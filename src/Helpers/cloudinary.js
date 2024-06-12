const cloudinary = require("cloudinary").v2;
require('dotenv').config();

cloudinary.config({
  cloud_name: "djbal0hfc",
  api_key: "863294399329526",
  api_secret: "Fdt_QWpvE5xoPOkyyI2a3oRe99c",
});

module.exports = cloudinary;
