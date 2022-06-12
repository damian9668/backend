const mongoose = require("mongoose")
const config = 'mongodb://127.0.0.1:27017/desafio10'
const URL = config;

const mensajesSchema = new mongoose.Schema({
    author:{
        id: {type: String, required: true},
        nombre: {type: String, required: true},
        apellido: {type: String, required: true},
        edad: {type: Number, required: true},
        alias: {type: String, required: true},
        avatar: {type: String, required: true}
    },
    text: {type: String, required: true}
});

class ContenedorMongoDb {
    constructor() {}

    MensajesModel = mongoose.model("mensajes",mensajesSchema);

    async connect() {
        await mongoose.connect(URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        }, (error) => {
            console.log('Connection error', error);
        });
        console.log("conectado")
    }
    async guardarMensaje(object){
        try{
            return this.MensajesModel(object).save()
        }catch(e){
            return e;
        }
    }
}
module.exports = ContenedorMongoDb