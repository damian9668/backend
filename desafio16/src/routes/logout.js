const express = require("express");
const {getLogout} = require("../controllers/logout");

const logoutRouter = express.Router()

logoutRouter.get('/logout', getLogout);

module.exports = {
    logoutRouter
}