const { Router } = require('express');
const { login } = require('../Controlers/user');




const router = Router();

//--login clasico--------------------------------
router.post("/login", login);


module.exports = router;