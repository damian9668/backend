import mongoose from "mongoose";
import {ContenedorMongoDb} from "../contenedores/contenedorMongoDb.js";

export const productosSchema = new mongoose.Schema({
    nombre: {type: String, required: true},
    descripcion: {type: String, required: true},
    codigo: {type: Number, required: true, unique: true},
    foto: {type: String, required: true},
    precio: {type: Number, required: true},
    stock: {type: Number, required: true},
    timestamp: {type: Date, required: true},
});

export class ProductoMongoDAO extends ContenedorMongoDb {

    ProductosModel = mongoose.model('productos', productosSchema)

    async findAll() {
        try{
            return this.ProductosModel.find();
        }catch(e){
            return e;
        }
    }

    async create(object){
        try{
            return this.ProductosModel(object).save()
        }catch(e){
            return e;
        }
    }
    async update(id, object){
        try{
            return this.ProductosModel.updateOne({
                _id:id,
            }, object);
        }catch (e) {
            return e;
        }
    }
    async delete(id){
        try{
            return this.ProductosModel.deleteOne({_id:id})
        }catch (e) {
            return e;
        }
    }


}