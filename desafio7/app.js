const express = require ("express");
const fs =require("fs");
const { Server: IOServer } = require('socket.io');
const { Server: HttpServer } = require('http');
const PORT = 8080;

const app = express();
const httpServer = new HttpServer(app);
const io = new IOServer(httpServer);


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

    socket.on("producto", producto=>{
        productos.push({name:producto.name,price:producto.price,url:producto.url});
        io.sockets.emit('productos', productos);
    })

    socket.on('message', data => {
        messages.push({ correo:data.correo, mensaje: data.mensaje, date:data.date });
        let dataArchivo = JSON.stringify(data,null,2)
        fs.appendFile("mensajes.txt", dataArchivo, (err) => {
            if (err)
                console.log(err);
            else {
                console.log("File written successfully\n");
            }
        });
        io.sockets.emit('messages', messages);
    });

});
