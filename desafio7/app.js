const express = require ("express");
const ContenedorSQL = require("./ContenedorSQL")
const {optionsMariaDb,optionsSQL} = require("./mysqlDB");
const { Server: IOServer } = require('socket.io');
const { Server: HttpServer } = require('http');
const PORT = 3000;

const app = express();
const httpServer = new HttpServer(app);
const io = new IOServer(httpServer);

const contenedorSQL = new ContenedorSQL("productos",optionsMariaDb)
const contenedorSQL2 = new ContenedorSQL("mensajes",optionsSQL)

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

app.get("/productos",(req,res)=>{
    res.render("main",{layout:"index", noProducts: ()=>productos.length===0, haveProducts: ()=>productos.length>0});
});

httpServer.listen(PORT, () => console.log('SERVER ON'));

const messages = [];


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
        messages.push({ correo:data.correo, mensaje: data.mensaje, date:data.date });
       await contenedorSQL2.guardarMensaje(data);
        //agregar aca sql mensajes
        io.sockets.emit('messages', messages);
    });

});
