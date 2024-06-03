const express = require('express');

const router = express.Router();

//trae prods
router.get('/', async(req, res) => {
    try {
        res.send("hola pelotudo");
    } catch (error) {
        console.log(error);
    }
});

module.exports = router;