const express = require ("express");
const app = express();
const PORT = 8080;

const {engine} = require("express-handlebars");

app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.set("view engine","hbs");

app.engine("hbs", engine({
    layoutsDir: __dirname+"/views/layouts",
    extname: "hbs"
}));

let productos =[];

app.get("/productos",(req,res)=>{
    res.render("productos",{layout:"index", apitest:productos, noProducts: ()=>productos.length===0, haveProducts: ()=>productos.length>0});
});
app.post("/productos",(req,res)=>{
    console.log(req.body);
    let producto =req.body;
    if (producto.name && producto.price && producto.url){
        productos.push(req.body);
    }
    res.render("main",{layout:"index", apitest:productos, noProducts: ()=>productos.length===0, haveProducts: ()=>productos.length > 0});
});

app.listen(PORT,()=>{
   console.log("handlebars started in port: "+PORT);
});
