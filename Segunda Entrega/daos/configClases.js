//import {ProductoFirebaseDAO} from "./productoFirebaseDAO.js";
import {CarritoFirebaseDAO} from "./carritoFirebaseDAO.js";
//import {ProductoMongoDAO} from "./productoMongoDAO.js";
import {CarritoMongoDAO} from "./carritoMongoDAO.js";

const daoActive = 'firebase'

const { ProductoDAO } = await import(daoActive !== 'firebase' ? './productoMongoDAO.js' : './productoFirebaseDAO.js');

export const productoDaoInstance =  new ProductoDAO();
