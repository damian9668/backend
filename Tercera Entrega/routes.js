const { fork } = require('child_process');
require("dotenv").config();

const os = require('os');
const sgMail = require("@sendgrid/mail");

const emailSender = 'damian.ullmann@hotmail.com'
const apiKey = process.env.twilio_email

const accountSid = process.env.wpp_sid;
const authToken = process.env.wpp_token;
const cliente = "+5492612077509"
const client = require('twilio')(accountSid, authToken);

function getRoot(req, res) {
    res.send('Bienvenido');
}

//LOGIN
let userActivo={};
function getLogin(req, res) {
    if (req.isAuthenticated()) {
        const user = req.user;
        userActivo = user;
        console.log('user logueado');
        res.render('login-ok', {
            nombre: user.firstName,
            apellido: user.lastName,
            email: user.email,
            urlPhoto: user.urlPhoto
        });
    } else {
        console.log('user no logueado');
        res.sendFile(__dirname + '/views/login.html');
    }
}

function getSignup(req, res) {
    res.sendFile(__dirname + '/views/signup.html');
}

function postLogin(req, res) {
    res.sendFile(__dirname + '/views/index.html');
}

function postSignup(req, res) {
    res.sendFile(__dirname + '/views/index.html');
}

function getFailLogin(req, res) {
    res.render('login-error', {});
}

function getFailsignup(req, res) {
    res.render('signup-error', {});
}

function getLogout(req, res) {
    req.logout();
    res.sendFile(__dirname + '/views/index.html');
}

function failRoute(req, res) {
    res.status(404).render('routing-error', {});
}
function systemInfo(req,res){
   // console.log(process.memoryUsage())
    res.send(`Carpeta Del Proyecto: ${process.cwd()}<br>
              Carpeta De Ejecucion: ${process.argv[0]}<br>
              Id Del Proceso: ${process.pid}<br>
              Argumentos: ${process.argv.slice(2)}<br>
              Versión De Node: ${process.version}<br>
              Sistema Operativo: ${process.env.OS}<br>
              Memoria: ${process.memoryUsage().rss}<br>
              CPU: ${os.cpus().length}
              `)
}
function randoms(req,res){
    const {cant=100000000}=req.query

    const computo = fork("computo.js")
    computo.send(cant);
    computo.on("message",(calculo)=>{
        res.send(calculo)
    })
}
async function carrito(req,res){
   //console.log(userActivo);
    const productos = req.body;
    const productosString = productos.reduce((acc,act)=>{
    return acc.concat(`Nombre: ${act.name}, Precio:${act.price}\n`)
    },"");
   // console.log(productosString);

    const sgMail = require('@sendgrid/mail')
    sgMail.setApiKey(apiKey)
    const msg = {
        to: emailSender, // Change to your recipient
        from: emailSender, // Change to your verified sender
        subject: 'Nuevo Pedido',
        text: `Nombre: ${userActivo.firstName} ${userActivo.lastName}\nEmail: ${userActivo.email}\nPedido:\n${productosString}`
    }
    sgMail
        .send(msg)
        .then(() => {
            console.log('Email sent')
        })
        .catch((error) => {
            console.error(error)
        })

    const options = {
        body: `Nombre: ${userActivo.firstName} ${userActivo.lastName}\nEmail: ${userActivo.email}\nPedido:\n${productosString}`,
        mediaUrl: ['https://lanacion.com.ec/wp-content/uploads/2019/12/logos-coderhouse-01.png'],
        from: 'whatsapp:+14155238886',
        to: `whatsapp:${cliente}`
    };

    try {
        const message = await client.messages.create(options);
        console.log(message);
    } catch (error) {
        console.log(error);
    }

    res.status(200).send("OK");
}


module.exports = {
    getLogin,
    getSignup,
    postLogin,
    postSignup,
    getFailLogin,
    getFailsignup,
    getLogout,
    failRoute,
    getRoot,
    systemInfo,
    randoms,
    carrito
}
