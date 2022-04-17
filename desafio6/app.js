const express = require ("express");
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
    res.render("productos",{layout:"index", apitest:productos, noProducts: ()=>productos.length===0, haveProducts: ()=>productos.length>0});
});
app.post("/productos",(req,res)=>{
    console.log(req.body);
    let producto =req.body;
    if (producto.name && producto.price && producto.url){
        productos.push(req.body);
    }
    res.render("main",{layout:"index", apitest:productos, noProducts: ()=>productos.length===0, haveProducts: ()=>productos.length > 0});
});

httpServer.listen(PORT, () => console.log('SERVER ON'));

const messages = [];

io.on('connection', (socket) => {
    console.log('Usuario conectado');
    // Envio de mensaje
    socket.emit('messages', messages);

    socket.on('message', data => {
        messages.push({ socketid: socket.id, message: data });
        io.sockets.emit('messages', messages);
    })

});
