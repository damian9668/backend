const Router = require("@koa/router");
const DaosFactory = require("../daos/DaosFactory") ;

const factory = new DaosFactory()

const daoProducto = factory.getDao("producto");

const productosRouter = new Router({
    prefix:'/productos'
})

const saveProduct = async (ctx)=>{
    try{
        await daoProducto.guardar(ctx.request.body);
        ctx.response.status = 200;

        ctx.response.body = {
            save: "OK"
        }
    }catch (e) {
        console.log(e);
        ctx.response.status = 500;
        ctx.response.body = {
            message:e.message
        }
    }
}

const updateProduct = async (ctx)=>{
    try{
        const id = ctx.params.id
        await daoProducto.actualizar(ctx.request.body,id)
        ctx.response.status = 200;

        ctx.response.body = {
            update: "OK"
        };

    }catch (e) {
        console.log(e);
        ctx.response.status = 500;
        ctx.response.body = {
            message:e.message
        }
    }
}

const deleteProduct = async (ctx)=>{
    try{
        const id = ctx.params.id
        await daoProducto.borrar(id)

        ctx.response.status = 200;

        ctx.response.body = {
            delete: "OK"
        };

    }catch (e) {
        console.log(e);
        ctx.response.status = 500;
        ctx.response.body = {
            message:e.message
        }
    }
}

const searchProduct = async (ctx)=>{
    try{
        const id = ctx.params.id
        const producto = await daoProducto.listar(id)

        ctx.response.status = 200;
        ctx.response.body = producto

    }catch (e) {
        console.log(e);
        ctx.response.status = 500;
        ctx.response.body = {
            message:e.message
        }
    }
}

productosRouter.post('/',saveProduct);
productosRouter.put('/:id',updateProduct);
productosRouter.delete('/:id',deleteProduct);
productosRouter.get('/:id',searchProduct);


module.exports = {
    productosRouter
}