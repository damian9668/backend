const Contenedor = require("./funciones.js");
const contenedor = new Contenedor('productos.txt');

const express = require("express");
const { Router } = express;

const app = express();
const router = Router();

app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use(express.static('public'))

const PORT = 8080

const server = app.listen(PORT, ()=>{
    console.log('servidor en el puerto' + server.address().port);
})
server.on("error",error => console.log(error))


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

router.post("",async (req, res)=>{
    const producto = req.body;
    const resp = await contenedor.save(producto);
    res.json(resp);
})

router.put("/:id",async(req, res)=>{
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

router.delete("/:id",async (req, res)=>{
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

app.use('/api/productos', router);
