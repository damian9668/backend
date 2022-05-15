import admin from "firebase-admin";
import fs from "fs";

const serviceAccount = JSON.parse(fs.readFileSync("./config/ecommerce-af9a2-firebase-adminsdk-y6md4-e777a77e40.json","utf8"));

admin.initializeApp( {
    credential: admin.credential.cert( serviceAccount ),
    databaseURL: "https://ecommerce-af9a2-default-rtdb.firebaseio.com"
} );
const db =admin.firestore();
const productos = db.collection("productos")


export class contenedorFirebase{
    constructor() {}

    async connect(){
        try{
            console.log( "Base de datos firebase conectada" );

        }catch (e) {
            console.log('Connection error', e);
        }

    }
    async create(){
        try{
         return await productos.doc().set({ nombre: "red" })

        }catch (e) {
            console.log(e);
        }
    }
}

