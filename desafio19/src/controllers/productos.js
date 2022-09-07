const DaosFactory = require("../daos/DaosFactory") ;

const factory = new DaosFactory()

const daoProducto = factory.getDao("producto");

const saveProduct = async (req,res)=>{
    try{
        await daoProducto.guardar(req.body);
        res.status(200).send({
            save: "OK"
        })
    }catch (e) {
        console.log(e);
        res.status(500).send({
            message:e.message
        })
    }
}

const updateProduct = async (req,res)=>{
    try{
        const id = req.params.id
        await daoProducto.actualizar(req.body,id)

        res.status(200).send({
            update: "OK"
        })

    }catch (e) {
        console.log(e);
        res.status(500).send({
            message:e.message
        })
    }
}

const deleteProduct = async (req,res)=>{
    try{
        const id = req.params.id
        await daoProducto.borrar(id)

        res.status(200).send({
            delete: "OK"
        })

    }catch (e) {
        console.log(e);
        res.status(500).send({
            message:e.message
        })
    }
}

const searchProduct = async (req,res)=>{
    try{
        const id = req.params.id
        const producto = await daoProducto.listar(id)

        res.status(200).send(producto);

    }catch (e) {
        console.log(e);
        res.status(500).send({
            message:e.message
        })
    }
}
module.exports ={
    saveProduct,
    updateProduct,
    deleteProduct,
    searchProduct
}