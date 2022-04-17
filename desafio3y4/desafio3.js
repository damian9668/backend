const Contenedor = require("./desafio.js");
const contenedor = new Contenedor('productos.txt');

const express = require("express");
const app = express();

const PORT = 8080

const server = app.listen(PORT, ()=>{
    console.log('servidor en el puerto' + server.address().port);
})
server.on("error",error => console.log(error))

app.get("/",(req, res)=>{
    res.send(console.log("Servidor con express"));
})

app.get("/productos",(req, res)=>{
    res.send(contenedor.getAll());
})

app.get("/productoRandom",(req, res)=>{
    const a = Math.floor(Math.random() * 3) + 1;
    res.send(contenedor.getById(a));
})

let producto = {
    title: "Regla",
    price: 158.78,
    thumbnail: "https://image.shutterstock.com/image-vector/school-measuring-plastic-ruler-20-260nw-615662024.jpg"
};

//contenedor.save(producto);
//contenedor.getById(3);
//contenedor.getAll();
//contenedor.deleteById(3);
//contenedor.deleteAll();