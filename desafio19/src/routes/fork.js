const express = require("express");
const {randoms} = require("../controllers/fork");

const forkRouter = express.Router()

forkRouter.get('/api/randoms',randoms);

module.exports = {
    forkRouter
}