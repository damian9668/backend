//import os from "os";
const {os} = require("os")

function systemInfo(req,res){
    // console.log(process.memoryUsage())
    res.send(`Carpeta Del Proyecto: ${process.cwd()}<br>
              Carpeta De Ejecucion: ${process.argv[0]}<br>
              Id Del Proceso: ${process.pid}<br>
              Argumentos: ${process.argv.slice(2)}<br>
              Versión De Node: ${process.version}<br>
              Sistema Operativo: ${process.env.OS}<br>
              Memoria: ${process.memoryUsage().rss}<br>
              CPU: ${os.cpus().length}
              `)
}

module.exports = {
    systemInfo
}