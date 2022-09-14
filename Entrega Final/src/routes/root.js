const express = require("express");
const {getRoot} = require("../controllers/root");
const {getLogin} = require("../controllers/login");

const rootRouter = express.Router();

rootRouter.get('/', getLogin);

module.exports = {
    rootRouter
}