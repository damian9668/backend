import express, {Router} from "express";
import bodyParser from "body-parser";
import {initPassport} from "../security/passport.js";
import session from "express-session";
import passport from "passport";

export const middlewares = Router();

middlewares.use(express.json());
middlewares.use(bodyParser.urlencoded({
    extended: true
}))

initPassport();

middlewares.use(session({
    secret: 'secret',
    resave: false,
    saveUninitialized: false,
    cookie: {
        httpOnly: false,
        secure: false,
        maxAge: process.env.SESSION_MAX_AGE
    }
}));

middlewares.use(passport.initialize());
middlewares.use(passport.session());

middlewares.use(async (req, res, next) => {
    if (req.isAuthenticated() || req.path === '/' || req.path === '/login' || req.path === '/register') {
        return next()
    }

    if(req.path !== '/') {
        res.redirect("/")
    }

})