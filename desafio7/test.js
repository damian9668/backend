const ContenedorSQL = require("./ContenedorSQL")
const {optionsMariaDb,optionsSQL} = require("./mysqlDB");
const contenedorSQL = new ContenedorSQL("productos",optionsMariaDb)
const contenedorSQL2 = new ContenedorSQL("mensajes",optionsSQL)

let prueba ={
    name: "test",
    price: 32,
    url: "Sun Apr 17 2022 22:09:41"
}
let prueba2 ={
    correo: "test",
    mensaje: "hola",
    date: "Sun Apr 17 2022 22:09:41"
}

contenedorSQL2.guardarMensaje(prueba2);
contenedorSQL.guardarProducto(prueba);