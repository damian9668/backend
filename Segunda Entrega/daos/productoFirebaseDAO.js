import {contenedorFirebase} from "../contenedores/contenedorFirebase.js";


const test = {
    nombre: 'test4',
    descripcion: 'sarasa',
    codigo: 178,
    foto: 'http://asdasdasd.com',
    precio: 1234,
    stock: 1,
    timestamp: new Date(),
}


export class ProductoFirebaseDAO extends contenedorFirebase{

    // async create(){
    //     try{
    //         await query.doc().set({ nombre: "red" })
    //
    //     }catch (e) {
    //         console.log(e);
    //     }
    // }
}