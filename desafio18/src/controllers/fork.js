const {fork} = require("child_process");


function randoms(req,res){
    const {cant=100000000}=req.query

    const computo = fork("computo.js")
    computo.send(cant);
    computo.on("message",(calculo)=>{
        res.send(calculo)
    })
}

module.exports = {
    randoms
}