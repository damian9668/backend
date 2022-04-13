const express = require ("express");
const path = require("path");

const app = express();
const PORT = 8082;

app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.set("views",path.join(__dirname,"views"));
app.set("view engine","ejs");

let productos=[];

app.get("/productos",(req,res)=>{
    res.render("productos",{productos: productos});
});

app.post("/productos",(req,res)=>{
    console.log(req.body);
    let producto =req.body;
    if (producto.name && producto.price && producto.url){
        productos.push(req.body);
    }
    res.render("index",{productos: productos});
});


app.listen(PORT,()=>{
   console.log("ejs started in port: "+PORT);
});
