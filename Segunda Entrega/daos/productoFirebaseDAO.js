import {contenedorFirebase} from "../contenedores/contenedorFirebase.js";
import {getFirestore} from "firebase-admin/firestore";


export class ProductoFirebaseDAO extends contenedorFirebase{
   // db = getFirestore()
   // query = this.db.collection("productos")

    // async create(){
    //     try{
    //         return await query.doc().create({
    //                 nombre: 'test4',
    //                 descripcion: 'sarasa',
    //                 codigo: 178,
    //                 foto: 'http://asdasdasd.com',
    //                 precio: 1234,
    //                 stock: 1,
    //                 timestamp: new Date(),
    //             })
    //     }catch (e) {
    //         console.log(e);
    //     }
    // }
}