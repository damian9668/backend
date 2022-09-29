import {Router} from "express";
import {postOrder} from "../controllers/order.js";

export const orderRouter = Router();

orderRouter.post('/', postOrder)