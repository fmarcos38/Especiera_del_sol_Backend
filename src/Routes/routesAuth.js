const { Router } = require('express');
const { login } = require('../Controlers/auth');


const router = Router();

//--login clasico--------------------------------
router.post("/login", login);


module.exports = router;