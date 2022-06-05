const express = require('express');
const exphbs = require('express-handlebars');
const bCrypt = require('bcrypt');

const session = require('express-session');
const passport = require('passport');
const LocalStrategy = require('passport-local');

const routes = require('./routes');
const config = require('./config');
const controllersdb = require('./controllersdb');
const User = require('./models');

const { Server: IOServer } = require('socket.io');
const { Server: HttpServer } = require('http');

const app = express();
const httpServer = new HttpServer(app);
const io = new IOServer(httpServer);


const normalizr = require('normalizr');
const normalize = normalizr.normalize;
const denormalize = normalizr.denormalize;
const schema = normalizr.schema;

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
    User.findOne({ 'username': username }, (err, user) => {
        if (err) {
            return done(err);
        }
        if (user) {
            return done(null, false);
        }

        const newUser = {
            username: username,
            password: createHash(password),
            email: req.body.email,
            firstName: req.body.firstName,
            lastName: req.body.lastName
        }

        User.create(newUser, (err, userWithId) => {
            if (err) {
                return done(err);
            }
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

app.use(express.static('./public'));
app.engine('.hbs', exphbs({ extname: '.hbs', defaultLayout: 'main.hbs' }));
app.set('view engine', '.hbs');

app.use(express.static(__dirname + '/views'));
app.use(express.urlencoded({ extended: true }));

const port = 8080;

app.use(session({
    secret: 'secret',
    resave: false,
    saveUninitialized: false,
    cookie: {
        httpOnly: false,
        secure: false,
        maxAge: config.TIEMPO_EXPIRACION
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

app.get('/logout', routes.getLogout);

controllersdb.conectarDB(config.URL_BASE_DE_DATOS, err => {
    if (err) return console.log('error bdd')
    console.log('Base de datos conectada');

    httpServer.listen(port, (err) => {
        if (err) return console.log('error en listen server');
        console.log('Server running');
    })
})

let productos =[];

const messages = [];
// contenedorMongo.connect().then().catch((error)=>{
//     console.log(error);
// });

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
        // try {
        //     await contenedorSQL.guardarProducto(producto);
        // } catch (e) {
        //     console.error(e);
        // }
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
        //await contenedorMongo.guardarMensaje(denormalizedData);
        //console.log(messages)
        const normalizedData = normalize(messages, [postSchema]);
        //console.log(normalizedData)
        io.sockets.emit('messages', normalizedData);
    });

});