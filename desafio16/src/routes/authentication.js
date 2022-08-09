const express = require("express");

const authenticationRouter = express.Router()

function checkAuthentication(req, res, next) {
    if (req.isAuthenticated()) {
        next();
    } else {
        res.redirect('/login');
    }
}

authenticationRouter.get('/ruta-protegida', checkAuthentication, (req, res) => {
    const { user } = req;
    res.send('<h1>Ruta OK!!!</h1>')
});

module.exports = {
    authenticationRouter
}