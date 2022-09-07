const express = require("express");
const {searchProduct,deleteProduct,updateProduct,saveProduct} = require("../controllers/productos");

const productosRouter = express.Router()

productosRouter.post('/productos',saveProduct);
productosRouter.put('/productos/:id',updateProduct);
productosRouter.delete('/productos/:id',deleteProduct);
productosRouter.get('/productos/:id',searchProduct);

module.exports = {
    productosRouter
}