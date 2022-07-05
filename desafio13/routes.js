const { fork } = require('child_process');
const os = require('os');

function getRoot(req, res) {
    res.send('Bienvenido');
}

//LOGIN
function getLogin(req, res) {
    if (req.isAuthenticated()) {
        const user = req.user;
        console.log('user logueado');
        res.render('login-ok', {
            usuario: user.username,
            nombre: user.firstName,
            apellido: user.lastName,
            email: user.email
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
    //console.log(process.cwd(),process.argv[0],process.pid,process.argv.slice(2),process.version,process.env.OS,process.memoryUsage().rss,os.cpus().length);
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
    randoms
}
