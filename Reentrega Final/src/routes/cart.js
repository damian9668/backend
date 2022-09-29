import {Router} from "express";
import {getById, upsert, deleteById} from "../controllers/cart.js";

export const cartRouter = Router();

cartRouter.put('/', upsert);
cartRouter.get('/:id', getById);
cartRouter.delete('/:id', deleteById)