import express from 'express';
import { ProductoMongoDAO } from "./daos/productoMongoDAO.js";
import {CarritoMongoDAO} from "./daos/carritoMongoDAO.js";
import {ProductoFirebaseDAO} from "./daos/productoFirebaseDAO.js";

const app = express();

app.listen(3000, async () => {
    console.log("Server up")

    const productosDao = new ProductoMongoDAO();
    const carritosDao = new CarritoMongoDAO();

    const productosFirebaseDao = new ProductoFirebaseDAO()
    await productosFirebaseDao.connect()

   // await productosDao.connect();
   // await carritosDao.connect();
//Productos
    //---------------READ---------//
   // console.log(await productosDao.findAll())


    //--------------CREATE-------------//
    // console.log(await productosDao.create({
    //     nombre: 'test4',
    //     descripcion: 'sarasa',
    //     codigo: 178,
    //     foto: 'http://asdasdasd.com',
    //     precio: 1234,
    //     stock: 1,
    //     timestamp: new Date(),
    // }));

    //----------UPDATE----------//
//     console.log(await productosDao.update('627f0da829b1c6edb0277f72',{
//             nombre: 'test2',
//             descripcion: 'sarasa',
//             codigo: 12787878723423423434234,
//             foto: 'http://asdasdasd.com',
//             precio: 1234,
//             stock: 1,
//             timestamp: new Date(),
//     }))
    //-----------DELETE---------//
//  console.log(await productosDao.delete("627f163f8e72fb5f3daa6395"))




    //----------------------------------------CARRITO---------------------//
                    //-------------READ----------//
   // console.log(await carritosDao.findAll())

                    //----------CREATE-------------------//
//     console.log(await carritosDao.create(
//         {
//             "productos": [
//                 {
//                     "nombre": "Lapiz",
//                     "descripcion": "Lapiz",
//                     "codigo": 5,
//                     "foto": "https://cdn2.iconfinder.com/data/icons/flat-seo-web-ikooni/128/flat_seo2-32-128.png",
//                     "precio": 150.35,
//                     "stock": 142,
//                     "id": 1,
//                     "timestamp": new Date()
//                 },
//                 {
//                     "nombre": "Lapiz",
//                     "descripcion": "Lapiz",
//                     "codigo": 57,
//                     "foto": "https://cdn2.iconfinder.com/data/icons/flat-seo-web-ikooni/128/flat_seo2-32-128.png",
//                     "precio": 150.35,
//                     "stock": 142,
//                     "id": 4,
//                     "timestamp": new Date()
//                 }
//             ],
//             "timestamp": new Date()
//         }
//     ));

            //----------------UPDATE---------------//
    // console.log(await carritosDao.update('627f208c5032c2e37423a3f2', {
    //         "productos": [
    //             {
    //                 "nombre": "Lapiz",
    //                 "descripcion": "Lapiz",
    //                 "codigo": 22222,
    //                 "foto": "https://cdn2.iconfinder.com/data/icons/flat-seo-web-ikooni/128/flat_seo2-32-128.png",
    //                 "precio": 150.35,
    //                 "stock": 142,
    //                 "id": 1,
    //                 "timestamp": new Date()
    //             }
    //         ],
    //         "timestamp": new Date()
    //     }))

        //------------------DELETE---------------//
  //  console.log(await carritosDao.delete("627f209c7e25d2554f79580c"))

    //--------------CREATE-------------//
//  console.log(await productosFirebaseDao.create());

 })



