import {Router} from "express";
import {handlebarsRoutes} from "./handlebars.js";
import {authRoutes} from "./auth.js";
import {productsRouter} from "./products.js";
import {cartRouter} from "./cart.js";
import {orderRouter} from "./order.js";
import {messagesRouter} from "./messages.js";

export const router = Router();

router.use(handlebarsRoutes);
router.use(authRoutes);
router.use('/api/productos', productsRouter);
router.use('/api/cart', cartRouter);
router.use('/api/order', orderRouter);
router.use('/api/messages', messagesRouter);