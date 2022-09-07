const express = require("express");
const {systemInfo} = require("../controllers/info");

const infoRouter = express.Router()

infoRouter.get('/info',systemInfo);

module.exports = {
    infoRouter
}