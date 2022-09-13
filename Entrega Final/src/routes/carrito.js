const express = require("express");
const {carrito} = require("../controllers/carrito");

const carritoRouter = express.Router()

carritoRouter.post('/carrito',carrito);

module.exports = {
    carritoRouter
}