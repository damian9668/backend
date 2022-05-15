import mongoose from "mongoose";

const URL = 'mongodb://127.0.0.1:27017/ecommerce';

export class ContenedorMongoDb {
    constructor() {}

    async connect() {
        await mongoose.connect(URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        }, (error) => {
            console.log('Connection error', error);
        });
    }
}