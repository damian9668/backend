const computo = (cant)=>{
    return Array.from({
        length: cant
    }).reduce((acum)=>{
        const numRandom = Math.floor(Math.random()*1000)+1;
        if(acum[numRandom]){
            acum[numRandom]++;
        }else{
            acum[numRandom]=1;
        }
        return acum
    },{})
}

process.on("message",(cant)=>{
    process.send(computo(cant));

})
