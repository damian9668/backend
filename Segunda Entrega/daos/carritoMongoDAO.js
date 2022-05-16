import mongoose from "mongoose";
import {ContenedorMongoDb} from "../contenedores/contenedorMongoDb.js";
import {productosSchema} from "./productoMongoDAO.js";

export class CarritoDAO extends ContenedorMongoDb{

    carritosSchema = new mongoose.Schema({
       productos:[{type: productosSchema}],
       timestamp: {type: Date, required: true}
    });

    CarritosModel = mongoose.model("carritos", this.carritosSchema)

    async read() {
        try{
            return this.CarritosModel.find();
        }catch(e){
            return e;
        }
    }
    async create(object){
        try{
            return this.CarritosModel(object).save()
        }catch(e){
            return e;
        }
    }
    async update(id, object){
        try{
            return this.CarritosModel.updateOne({
                _id:id,
            }, object);
        }catch (e) {
            return e;
        }
    }
    async delete(id){
        try{
            return this.CarritosModel.deleteOne({_id:id})
        }catch (e) {
            return e;
        }
    }
}