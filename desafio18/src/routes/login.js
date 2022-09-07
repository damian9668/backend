const express = require('express');
const passport = require('passport');
const {getLogin, getFailLogin, postLogin} = require("../controllers/login");


const loginRouter = express.Router()

//LOGIN
loginRouter.get('/login', getLogin);
loginRouter.post('/login', passport.authenticate('login', {failureRedirect: '/faillogin'}), postLogin)
loginRouter.get('/faillogin', getFailLogin);


module.exports = {
    loginRouter
}


