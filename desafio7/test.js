const ContenedorSQL = require("./ContenedorSQL")
const {optionsMariaDb,optionsSQL} = require("./mysqlDB");
const {log} = require("util");
const contenedorSQL = new ContenedorSQL("productos",optionsMariaDb)
const contenedorSQL2 = new ContenedorSQL("mensajes",optionsSQL)

// let prueba ={
//     name: "test",
//     price: 32,
//     url: "Sun Apr 17 2022 22:09:41"
// }
// let prueba2 ={
//     correo: "test",
//     mensaje: "hola",
//     date: "Sun Apr 17 2022 22:09:41"
// }
//
// contenedorSQL2.guardarMensaje(prueba2);
// contenedorSQL.guardarProducto(prueba);
//contenedorSQL2.listar(2).then(value => console.log(value))
//contenedorSQL2.listarAll().then(value => console.log(value))
// contenedorSQL2.actualizar( {
//         correo: 'agus',
//         mensaje: '21qwqwe',
//         date: 'Thu Apr 28 2022 22:07:51'
//     },1
// ).then(value => console.log(value))
//contenedorSQL.borrarAll().then(value => console.log(value))