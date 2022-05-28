const { faker } = require('@faker-js/faker');
const express = require ("express");
const ContenedorSQL = require("./ContenedorSQL")
const ContenedorMongoDb = require("./ContenedorMongo");
const {optionsMariaDb,optionsSQL} = require("./mysqlDB");
const { Server: IOServer } = require('socket.io');
const { Server: HttpServer } = require('http');
const normalizr = require('normalizr');
const normalize = normalizr.normalize;
const denormalize = normalizr.denormalize;
const session = require('express-session');
const cookieParser = require('cookie-parser');
const MongoStore = require('connect-mongo');

const advancedOptions = { useNewUrlParser: true, useUnifiedTopology: true };
const schema = normalizr.schema;

const PORT = 8080;

const app = express();
const httpServer = new HttpServer(app);
const io = new IOServer(httpServer);

const contenedorSQL = new ContenedorSQL("productos",optionsMariaDb)
const contenedorMongo = new ContenedorMongoDb()


const {engine} = require("express-handlebars");
const exp = require("constants");

app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use(express.static('./public'));
app.set("view engine","hbs");

app.engine("hbs", engine({
    layoutsDir: __dirname+"/views/layouts",
    extname: "hbs"
}));

app.use(cookieParser());

app.use(session({
    store: MongoStore.create({
        mongoUrl: 'mongodb+srv://damian96:zxcv123789@cluster0.jihxsw0.mongodb.net/?retryWrites=true&w=majority',
        mongoOptions: advancedOptions
    }),
    secret: 'secreto',
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 60000
    }
}));
//const getSessionName = req => req.session.nombre ?? '';

let productos =[];
let expiro ={};
app.get("/productos-test",(req,res)=>{
    productos = [];
    for(let i =0; i<5;i++){
        productos.push({name:faker.commerce.product(),price:faker.commerce.price(100, 200),url:faker.image.imageUrl()})
    }
    res.render("main",{layout:"index", noProducts: ()=>productos.length===0, haveProducts: ()=>productos.length>0});
});

app.get("/productos",(req,res)=>{
    let usuarioSave;
    let reload = true
    let active = true

    if(req.query.logout){
        usuarioSave = req.query.nombre;
        req.query.nombre = undefined;
        reload = false
        req.session.destroy();
        active = false;
        setTimeout(()=>{
            //console.log("test")
            req.query.logout = undefined;
            res.render("main",{layout:"index", usuario:undefined, logout: false, usuario2: undefined});
        },2000)

    }
    if(new Date()>expiro){
        req.query.nombre = undefined;
        req.query.logout = undefined;
        reload = false
        expiro = undefined;
        req.session.destroy();
        res.render("main",{layout:"index", usuario:undefined, logout: false, usuario2: undefined});
    }else if(active){
        req.session.cookie.maxAge = 60000;
    }
    if(req.query.nombre){
        req.session.nombre = req.query.nombre
        expiro = req.session.cookie.expires
        //console.log(expiro);
       // console.log(req.query.nombre)
    }

    if(reload){
        res.render("main",{layout:"index", usuario:req.query.nombre, logout: req.query.logout, usuario2: usuarioSave})
    }




});
httpServer.listen(PORT, () => console.log('SERVER ON'));

const messages = [];
contenedorMongo.connect().then().catch((error)=>{
    console.log(error);
});

const authorSchema = new schema.Entity('authors');
const textSchema = new schema.Entity('text');
const mensajeSchema = new schema.Entity('mensaje', {
    author: authorSchema,
    text: [textSchema]
});
const postSchema = new schema.Entity('posts', {
    posts: [mensajeSchema]
});

let contador = 0;

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

        const denormalizedData = denormalize(data.result, mensajeSchema, data.entities);
        //console.log(denormalizedData);

        messages.push({
            id:"mensaje"+contador,
            author:{
                id: denormalizedData.author.id,
                nombre: denormalizedData.author.nombre,
                apellido: denormalizedData.author.apellido,
                edad: denormalizedData.author.edad,
                alias: denormalizedData.author.alias,
                avatar: denormalizedData.author.avatar,
            },
            text: denormalizedData.text
        });
        contador++;
        await contenedorMongo.guardarMensaje(denormalizedData);
        //console.log(messages)
        const normalizedData = normalize(messages, [postSchema]);
        //console.log(normalizedData)
        io.sockets.emit('messages', normalizedData);
    });

});
