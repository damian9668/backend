const express = require('express');
const exphbs = require('express-handlebars');
const {loggerError} = require("./src/config/logger")
const session = require('express-session');
const passport = require('passport');

const Koa = require('koa');


const controllersdb = require('./src/repositories/controllersdb');

const { Server: IOServer } = require('socket.io');
const { Server: HttpServer } = require('http');

const app = express();
app.use(express.json());
const httpServer = new HttpServer(app);
const io = new IOServer(httpServer);

const ContenedorSQL = require("./src/repositories/ContenedorSQL")

const {optionsMariaDb,optionsSQL} = require("./src/repositories/mysqlDB");


require("dotenv").config();
const parseArgs = require('minimist');

const contenedorSQL = new ContenedorSQL("productos",optionsMariaDb)

const cluster = require('cluster');
const numCpu = require('os').cpus().length

let path = require('path')
const {loginRouter} = require("./src/routes/login");
const {registerRouter} = require("./src/routes/register");
const {infoRouter} = require("./src/routes/info");
const {forkRouter} = require("./src/routes/fork");
const {carritoRouter} = require("./src/routes/carrito");
const {logoutRouter} = require("./src/routes/logout");
const {testRouter} = require("./src/routes/test");
const {authenticationRouter} = require("./src/routes/authentication");
const {rootRouter} = require("./src/routes/root");
const {serverPassport} = require("./src/config/passport");
const {productosRouter} = require("./src/routes/productos");
const {productosRouter: productosRouterKoa} = require("./src/koa-routes/productos");

const appKoa = new Koa();
appKoa.use(productosRouterKoa.routes()).use(productosRouterKoa.allowedMethods());
appKoa.listen(9800);

const {server} = require("./src/graphql/productos-graphql");


app.use(express.static(path.join(__dirname, 'public')));

serverPassport();

app.engine('.hbs', exphbs({ extname: '.hbs', defaultLayout: 'main.hbs'}));
app.set('view engine', '.hbs');

app.use(express.static(__dirname + '/views'));
app.use(express.urlencoded({ extended: true }));

const options = {
    default: {puerto: process.env.PORT||8080, modo: "FORK"},
    alias: {p: 'puerto', m: 'modo'}
};

//console.log(parseArgs(process.argv.slice(2), options).puerto);
const port = parseArgs(process.argv.slice(2), options).puerto;
const modo = parseArgs(process.argv.slice(2), options).modo;

//console.log(modo);

app.use(session({
    secret: process.env.CLAVE,
    resave: false,
    saveUninitialized: false,
    cookie: {
        httpOnly: false,
        secure: false,
        maxAge: parseInt(process.env.TIEMPO_EXPIRACION, 10)
    }
}));

app.use(passport.initialize());
app.use(passport.session());

//app.get('/', routes.getRoot);
app.use(rootRouter);

//LOGIN
app.use(loginRouter);

//REGISTER
app.use(registerRouter);
//INFO
app.use(infoRouter);
//FORK
app.use(forkRouter);
//CARRITO
app.use(carritoRouter);

app.use(authenticationRouter);

app.use(testRouter);

app.use(logoutRouter);

app.use(productosRouter);

server.applyMiddleware({app});

if(modo === "CLUSTER"){
    if (cluster.isMaster) {
        console.log(`PID MASTER ${process.pid}`);

        for (let i = 0; i < numCpu; i++) {
            cluster.fork()
        }

        cluster.on('exit', (worker, code, signal) => {
            console.log(`Worker ${worker.process.pid} died`);
            cluster.fork();
        });
    } else {
        httpServer.listen(port, (err) => {
            if (err) return loggerError.error(err);;
            console.log('Server running ' + port);
        })
        console.log(`Worker ${process.pid} started`);
    }
}else{
    httpServer.listen(port, (err) => {
        if (err) return loggerError.error(err);
        console.log('Server running '+port);
    })
}
//ContenedorMongoDb.connect();
controllersdb.conectarDB(process.env.URL_BASE_DE_DATOS, err => {
    if (err) return loggerError.error(err);
    console.log('Base de datos conectada');
})
//serverMode(modo,port);
let productos =[];
io.on('connection', async(socket) => {
    console.log('Usuario conectado');
    productos = await contenedorSQL.listarAll();

    socket.emit('productos', productos);

    socket.on("producto", async producto=>{
        productos.push({name:producto.name,price:producto.price,url:producto.url});

        try {
            await contenedorSQL.guardarProducto(producto);
        } catch (e) {
            console.error(e);
        }
        io.sockets.emit('productos', productos);
    })


});
