const cluster = require('cluster');

const http = require('http');

const numCpu = require('os').cpus().length
console.log(numCpu);