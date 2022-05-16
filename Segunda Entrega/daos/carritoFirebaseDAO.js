import {contenedorFirebase} from "../contenedores/contenedorFirebase.js";

export class CarritoDAO extends contenedorFirebase{

    async create(object){
        try{
            const db = await this.connect();
            await db.collection("carrito").doc().set(object);
            return "OK"
        }catch (e) {
            console.log(e);
        }
    }
    async read(){
        try{
            const db = await this.connect()
            const snapshot = await db.collection("carrito").get()
            snapshot.forEach(doc => {
                console.log({ id: doc.id, ...doc.data() })
            });
            return "OK"
        }catch (e) {
            console.log(e)
        }
    }
    async update(id,carrito){
        try{
            const db = await this.connect()
            await db.collection("carrito").doc(id).update(carrito)
            return "OK"
        }catch (e) {
            console.log(e)
        }
    }
    async delete(id){
        try{
            const db = await this.connect()
            await db.collection("carrito").doc(id).delete()
            return "OK"
        }catch (e) {
            console.log(e)
        }
    }
}
