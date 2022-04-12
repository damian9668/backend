const express = require ("express");
const path = require("path");

const app = express();
const PORT = 8081;

app.set("views",path.join(__dirname,"views"));
app.set("view engine","pug");

const fakeApi = () =>{
    let productos =[
        {
            name: "Damian"
        },
        {
            name:"Agus"
        },
        {
            name:"Mati"
        }
    ]
    return productos
};

app.get("/productos",(req,res)=>{
    res.render("index",{productos: fakeApi()});
});

app.listen(PORT,()=>{
   console.log("pug started in port: "+PORT);
});