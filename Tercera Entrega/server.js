const express = require('express');
const exphbs = require('express-handlebars');
const bCrypt = require('bcrypt');

const session = require('express-session');
const passport = require('passport');
const LocalStrategy = require('passport-local');

const routes = require('./routes');
const controllersdb = require('./controllersdb');
const User = require('./models');

const { Server: IOServer } = require('socket.io');
const { Server: HttpServer } = require('http');

const app = express();
const httpServer = new HttpServer(app);
const io = new IOServer(httpServer);

 const ContenedorSQL = require("./ContenedorSQL")
 const ContenedorMongoDb = require("./ContenedorMongo");
 const {optionsMariaDb,optionsSQL} = require("./mysqlDB");

const normalizr = require('normalizr');
const normalize = normalizr.normalize;
const denormalize = normalizr.denormalize;
const schema = normalizr.schema;
require("dotenv").config();
const parseArgs = require('minimist');

 const contenedorSQL = new ContenedorSQL("productos",optionsMariaDb)
 const contenedorMongo = new ContenedorMongoDb()

const cluster = require('cluster');
const numCpu = require('os').cpus().length

let path = require('path')

const emailSender = 'damian.ullmann@gmail.com'
const apiKey = "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"
//process.env.PWD = process.cwd();
app.use(express.static(path.join(__dirname, 'public')));

//app.use(express.static( 'public'));
//app.use(express.static(path.join(__dirname, './public')));

passport.use('login', new LocalStrategy(
    (username, password, done) => {
        User.findOne({ username }, (err, user) => {
            if (err)
                return done(err);
            if (!user) {
                console.log('User not found ' + username);
                return done(null, false);
            }
            if (!isValidPassword(user, password)) {
                return done(null, false);
            }
            return done(null, user);
        });
    }
));

passport.use('signup', new LocalStrategy({
    passReqToCallback: true
}, (req, username, password, done) => {
    User.findOne({ 'email': username }, (err, user) => {
        if (err) {
            return done(err);
        }
        if (user) {
            return done(null, false);
        }

        const newUser = {
           // username: username,
            password: createHash(password),
            email: username,
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            address: req.body.address,
            age: req.body.age,
            phone: req.body.phone,
            prefix: req.body.prefix,
            urlPhoto:req.body.url

        }

        User.create(newUser, (err, userWithId) => {
            if (err) {
                return done(err);
            }

            const sgMail = require('@sendgrid/mail')
            sgMail.setApiKey(apiKey)
            const msg = {
                to: emailSender, // Change to your recipient
                from: emailSender, // Change to your verified sender
                subject: 'New User',
                text: `Email: ${username}\nNombre: ${req.body.firstName} ${req.body.lastName}\nDireccion: ${req.body.address}\nEdad: ${req.body.age}\nTelefono: ${req.body.prefix} ${req.body.phone}\nAvatar: ${req.body.url}`
            }
            sgMail
                .send(msg)
                .then(() => {
                    console.log('Email sent')
                })
                .catch((error) => {
                    console.error(error)
                })

            return done(null, userWithId);
        })
    })
}));

passport.serializeUser((user, done) => {
    done(null, user._id);
})

passport.deserializeUser((id, done) => {
    User.findById(id, done);
});

function isValidPassword(user, password) {
    return bCrypt.compareSync(password, user.password);
}

function createHash(password) {
    return bCrypt.hashSync(password, bCrypt.genSaltSync(10), null);
}


app.engine('.hbs', exphbs({ extname: '.hbs', defaultLayout: 'main.hbs' }));
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

app.get('/', routes.getRoot);

//LOGIN
app.get('/login', routes.getLogin);
app.post('/login', passport.authenticate('login', {failureRedirect: '/faillogin'}), routes.postLogin)
app.get('/faillogin', routes.getFailLogin);

//REGISTER
app.get('/signup', routes.getSignup);
app.post('/signup', passport.authenticate('signup', {failureRedirect: '/failsignup'}), routes.postSignup)
app.get('/failsignup', routes.getFailsignup);

//INFO
app.get('/info',routes.systemInfo);
//FORK
app.get('/api/randoms',routes.randoms);

function checkAuthentication(req, res, next) {
    if (req.isAuthenticated()) {
        next();
    } else {
        res.redirect('/login');
    }
}

app.get('/ruta-protegida', checkAuthentication, (req, res) => {
    const { user } = req;
    res.send('<h1>Ruta OK!!!</h1>')
});
app.get('/test', (req, res) => {
    //const { user } = req;
    res.send('<h1>Ruta OK!!!</h1>')
});

app.get('/logout', routes.getLogout);

//ContenedorMongoDb.connect();
controllersdb.conectarDB(process.env.URL_BASE_DE_DATOS, err => {
    if (err) return console.log('error bdd',err)
    console.log('Base de datos conectada');
})
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
            if (err) return console.log('error en listen server');
            console.log('Server running ' + port);
        })
        console.log(`Worker ${process.pid} started`);
    }
}else{
    httpServer.listen(port, (err) => {
        if (err) return console.log('error en listen server');
        console.log('Server running '+port);
    })
}

let productos =[];
const messages = [];

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
io.on('connection', async(socket) => {
    console.log('Usuario conectado');
    productos = await contenedorSQL.listarAll();
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
