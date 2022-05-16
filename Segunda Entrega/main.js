import express from 'express';
import {carritoDaoInstance, productoDaoInstance} from "./daos/configClases.js";
const app = express();


app.listen(3000, async () => {
    console.log("Server up")

    const producto = {
        nombre: 'up7',
        descripcion: 'sarasa',
        codigo: 1788888888888888888888887,
        foto: 'http://asdasdasd.com',
        precio: 1234,
        stock: 1,
        timestamp: new Date(),
    }

    const carrito = {
        productos: [
            {
                nombre: "test",
                descripcion: "Lapiz",
                codigo: 5895732323323,
                foto: "https://cdn2.iconfinder.com/data/icons/flat-seo-web-ikooni/128/flat_seo2-32-128.png",
                precio: 150.35,
                stock: 142,
                id: 1,
                timestamp: new Date()
            },
            {
                nombre: "test carrito 2",
                descripcion: "test carrito",
                codigo: 58957898989898989,
                foto: "https://cdn2.iconfinder.com/data/icons/flat-seo-web-ikooni/128/flat_seo2-32-128.png",
                precio: 150.35,
                stock: 142,
                id: 4,
                timestamp: new Date()
            }
        ],
        timestamp: new Date()
    }

    //-------------------CRUD PRODUCTO--------------------------------------------------
    // console.log(await productoDaoInstance.read());
    // console.log(await productoDaoInstance.create(producto))
    // console.log(await productoDaoInstance.update("6281baebaa9e6d9bcef28b1e",producto))
    // console.log(await productoDaoInstance.delete("6281baebaa9e6d9bcef28b1e"))

    //-------------------CRUD CARRITO---------------------------------------------------
    // console.log(await carritoDaoInstance.read());
    // console.log(await carritoDaoInstance.create(carrito));
    // console.log(await carritoDaoInstance.update("627f2016eceac7bcdb61fc5b",carrito))
    // console.log(await carritoDaoInstance.delete("627f2016eceac7bcdb61fc5b"))
})





