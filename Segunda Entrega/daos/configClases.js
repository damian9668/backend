import {ContenedorMongoDb} from "../contenedores/contenedorMongoDb.js";

const conectar = new ContenedorMongoDb()
const base = "firebase"

const { ProductoDAO } = await import(base !== 'firebase' ? './productoMongoDAO.js' : './productoFirebaseDAO.js');
const { CarritoDAO } = await import(base !== 'firebase' ? './carritoMongoDAO.js' : './carritoFirebaseDAO.js')

if(base !== "firebase"){
    await conectar.connect();
}

export const productoDaoInstance =  new ProductoDAO();
export const carritoDaoInstance = new CarritoDAO();
