import admin from "firebase-admin";
import fs from "fs";

const serviceAccount = JSON.parse(fs.readFileSync("./config/ecommerce-af9a2-firebase-adminsdk-y6md4-e777a77e40.json","utf8"));



export class contenedorFirebase{
    constructor() {}

    static instance;

    async connect(){
        try{
            if(!contenedorFirebase.instance) {
                admin.initializeApp( {
                    credential: admin.credential.cert( serviceAccount ),
                    databaseURL: "https://ecommerce-af9a2-default-rtdb.firebaseio.com"
                } );
                contenedorFirebase.instance = admin.firestore();
            }
            return contenedorFirebase.instance;
        }catch (e) {
            console.log('Connection error', e);
            return undefined;
        }
    }
}

