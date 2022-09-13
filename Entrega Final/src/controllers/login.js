
let userActivo={};
function getLogin(req, res) {
    if (req.isAuthenticated()) {
        const user = req.user;
        userActivo = user;
        console.log('user logueado');
        res.render(__dirname + '/views/login-ok', {
            nombre: user.firstName,
            apellido: user.lastName,
            email: user.username,
            urlPhoto: user.urlPhoto,
            login: true
        });
    } else {
        console.log('user no logueado');
       // res.sendFile("/desafio15/views/login.html")
        res.sendFile(__dirname + '/views/login.html');
    }
}

function getFailLogin(req, res) {
    res.render(__dirname + '/views/login-error', {login:false});
}
function postLogin(req, res) {
    res.sendFile(__dirname + '/views/index.html');
}

module.exports = {
    getLogin,
    getFailLogin,
    postLogin,
    userActivo
}