import mongoose from "mongoose";
import {config} from "../config/mongoConfig.js";

const URL = config;

export class ContenedorMongoDb {
    constructor() {}

    async connect() {
        await mongoose.connect(URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        }, (error) => {
            console.log('Connection error', error);
        });
        console.log("conectado")
    }
}
