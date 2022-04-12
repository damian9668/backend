const express = require ("express");
const app = express();
const PORT = 8080;

const {engine} = require("express-handlebars");

app.set("view engine","hbs");

app.engine("hbs", engine({
    layoutsDir: __dirname+"/views/layouts",
    extname: "hbs"
}));

const fakeApi = () =>{
    return[
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
};

app.get("/productos",(req,res)=>{
    res.render("main",{layout:"index", apitest:fakeApi()});
});

app.listen(PORT,()=>{
   console.log("handlebars started in port: "+PORT);
});