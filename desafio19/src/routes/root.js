const express = require("express");
const {getRoot} = require("../controllers/root");

const rootRouter = express.Router();

rootRouter.get('/', getRoot);

module.exports = {
    rootRouter
}