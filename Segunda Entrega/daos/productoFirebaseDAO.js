import {contenedorFirebase} from "../contenedores/contenedorFirebase.js";

export class ProductoDAO extends contenedorFirebase{

    async create(object){
        try{
            const db = await this.connect();
            await db.collection("productos").doc().set(object);
            return "OK"
        }catch (e) {
            console.log(e);
        }
    }
    async findAll(){
        try{
            const db = await this.connect()
            const snapshot = await db.collection("productos").get()
            snapshot.forEach(doc => {
                console.log({ id: doc.id, ...doc.data() })
            });
            return "OK"
        }catch (e) {
            console.log(e)
        }
    }
    async update(id,producto){
        try{
            const db = await this.connect()
            await db.collection("productos").doc(id).update(producto)
            return "OK"
        }catch (e) {
            console.log(e)
        }
    }
    async delete(id){
        try{
            const db = await this.connect()
            await db.collection("productos").doc(id).delete()
            return "OK"
        }catch (e) {
            console.log(e)
        }
    }
}
