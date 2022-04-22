const Contenedor = require("./funciones.js");
const contenedor = new Contenedor('productos.txt');
const contenedorCarrito = new Contenedor('carritos.txt');

const express = require("express");
const { Router } = express;

const app = express();
const router = Router();
const routerCarrito = Router();

app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use(express.static('public'))

const PORT = 8080

const server = app.listen(PORT, ()=>{
    console.log('servidor en el puerto' + server.address().port);
})
server.on("error",error => console.log(error))

const esAdmin = true

function soloAdmins(req,res,next){
    const error ={
        error:-1,
        descripcion: `ruta: ${req.originalUrl} metodo: ${req.method} no autorizada`
    }
    console.log(req.url)
    if(!esAdmin){
        res.status(400).send(error);
    }else{
        next()
    }
}

router.get("",async (req, res)=>{
    const message = await contenedor.getAll();
    //console.log(message);
    res.json(message);
})
router.get("/:id",async (req, res)=>{
    const id = req.params.id;
    const resp = await contenedor.getById(id)
    if(resp.error != null){
        res.status(400).send(resp);
    }
    else{
        res.json(resp);
    }
})

router.post("",soloAdmins,async (req, res)=>{
    const producto = req.body;
    const resp = await contenedor.save(producto);
    res.json(resp);
})

router.put("/:id",soloAdmins,async(req, res)=>{
    const id = req.params.id;
    const body = req.body;
    const resp = await contenedor.updateById(id,body);
    if(resp.error != null){
        res.status(400).send(resp);
    }
    else{
        res.json("OK");
    }

})

router.delete("/:id",soloAdmins,async (req, res)=>{
    const id = req.params.id;
    const message = await contenedor.deleteById(id);
    console.log(message);

    if(message.error != null){
        res.status(400).send(message);
    }
    else{
        res.json(message);
    }

})

routerCarrito.post("",async (req, res)=>{
    const carrito = req.body;
    const resp = await contenedorCarrito.save(carrito);
    res.json(resp);
})

routerCarrito.post("/:id/productos",async (req, res)=>{
   const id = req.params.id;
   const producto = await contenedor.getById(id);
    if(producto.error != null){
        res.status(400).send(producto);
    }
    else{
        const resp = await contenedorCarrito.saveCarrito(producto);
        res.json(resp);
    }
})

routerCarrito.get("/:id/productos",async (req, res)=>{
    const id = req.params.id;
    const resp = await contenedorCarrito.getById(id)
    if(resp.error != null){
        res.status(400).send(resp);
    }
    else{
        res.json(resp.productos);
    }
})

routerCarrito.delete("/:id/productos/:id_prod",async (req, res)=>{
    const idCarrito = req.params.id;
    const idProducto = req.params.id_prod;
    const carrito = await contenedorCarrito.getById(idCarrito);
    if(carrito.error != null){
        res.status(400).send(carrito);
    }
    else{
        if(carrito.productos.id == idProducto){
            const resp = await contenedorCarrito.updateCarritoById(idCarrito,"");
            res.json(resp);
        }
        else{
            res.status(400).send("producto no encontrado");
        }

    }
})

routerCarrito.delete("/:id",async (req, res)=>{
    const id = req.params.id;
    const message = await contenedorCarrito.deleteById(id);
    //console.log(message);

    if(message.error != null){
        res.status(400).send(message);
    }
    else{
        res.json("carrito eliminado");
    }
})



app.use("/api/carrito", routerCarrito)
app.use('/api/productos', router);
app.use((req, res, next) => {
    res.status(404).json({
        error: -2,
        descripcion: `ruta: ${req.path} metodo: ${req.method} no implemetada`
    })
})