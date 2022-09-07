const express = require('express');
const passport = require("passport");
const {getSignup, getFailsignup, postSignup} = require("../controllers/register");

const registerRouter = express.Router();

registerRouter.get('/signup', getSignup);
registerRouter.post('/signup', passport.authenticate('signup', {failureRedirect: '/failsignup'}), postSignup)
registerRouter.get('/failsignup', getFailsignup);

module.exports = {
    registerRouter
}