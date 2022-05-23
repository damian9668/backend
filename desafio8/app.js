const { faker } = require('@faker-js/faker');
const express = require ("express");
const ContenedorSQL = require("./ContenedorSQL")
const ContenedorMongoDb = require("./ContenedorMongo");
const {optionsMariaDb,optionsSQL} = require("./mysqlDB");
const { Server: IOServer } = require('socket.io');
const { Server: HttpServer } = require('http');
const PORT = 8080;

const app = express();
const httpServer = new HttpServer(app);
const io = new IOServer(httpServer);

const contenedorSQL = new ContenedorSQL("productos",optionsMariaDb)
const contenedorMongo = new ContenedorMongoDb()



const {engine} = require("express-handlebars");

app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use(express.static('./public'));
app.set("view engine","hbs");

app.engine("hbs", engine({
    layoutsDir: __dirname+"/views/layouts",
    extname: "hbs"
}));

let productos =[];

app.get("/productos-test",(req,res)=>{
    productos = [];
    for(let i =0; i<5;i++){
        productos.push({name:faker.commerce.product(),price:faker.commerce.price(100, 200),url:faker.image.imageUrl()})
    }
    res.render("main",{layout:"index", noProducts: ()=>productos.length===0, haveProducts: ()=>productos.length>0});
});

app.get("/productos",(req,res)=>{
    res.render("main",{layout:"index", noProducts: ()=>productos.length===0, haveProducts: ()=>productos.length>0});
});

httpServer.listen(PORT, () => console.log('SERVER ON'));

const messages = [];
contenedorMongo.connect().then().catch((error)=>{
    console.log(error);
});

io.on('connection', (socket) => {
    console.log('Usuario conectado');
    // Envio de mensaje
    socket.emit('messages', messages);
    socket.emit('productos', productos);

    socket.on("producto", async producto=>{
        productos.push({name:producto.name,price:producto.price,url:producto.url});
        //console.log(producto);
        try {
            await contenedorSQL.guardarProducto(producto);
        } catch (e) {
            console.error(e);
        }
        io.sockets.emit('productos', productos);
    })

    socket.on('message', async data => {
        messages.push({
            author:{
                id: data.author.id,
                nombre: data.author.nombre,
                apellido: data.author.apellido,
                edad: data.author.edad,
                alias: data.author.alias,
                avatar: data.author.avatar,
            },
            text: data.text
        });
        await contenedorMongo.guardarMensaje(data);
        //agregar aca sql mensajes

        io.sockets.emit('messages', messages);
    });

});
