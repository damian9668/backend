import {Router} from "express";
import {deleteById, getAll, getAllByCategory, getOne, post, putById} from "../controllers/products.js";

export const productsRouter = Router();

productsRouter.get('/', getAll)
productsRouter.get('/one/:id', getOne)
productsRouter.get('/:category', getAllByCategory)
productsRouter.post('/', post)
productsRouter.put('/:id', putById)
productsRouter.delete('/:id', deleteById)