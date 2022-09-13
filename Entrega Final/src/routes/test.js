const express = require("express");

const testRouter = express.Router()

testRouter.get('/test', (req, res) => {
    //const { user } = req;
    res.send('<h1>Ruta OK!!!</h1>')
});

module.exports = {
    testRouter
}