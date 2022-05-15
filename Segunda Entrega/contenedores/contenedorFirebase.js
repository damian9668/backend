import {initializeApp} from "firebase/app";

const firebaseConfig = {
    apiKey: "AIzaSyAPtc8ojXdsolzIqcRanVCnA-mbSBRDAyA",
    authDomain: "ecommerce-af9a2.firebaseapp.com",
    projectId: "ecommerce-af9a2",
    storageBucket: "ecommerce-af9a2.appspot.com",
    messagingSenderId: "195532644775",
    appId: "1:195532644775:web:b213deba823a0607829682",
    measurementId: "G-7ECH12N4PB"
};

export class contenedorFirebase{
    constructor() {}

    async connect(){
        try{
            await initializeApp(firebaseConfig);
            console.log("Base De Datos Conectada");
        }catch (e) {
            console.log('Connection error', e);
        }

    }
}

