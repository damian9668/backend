import {Router} from "express";
import {findByEmail} from "../repositories/message.js";

export const handlebarsRoutes = Router();

handlebarsRoutes.get('/', (req, res) => {
    res.render('login');
})

handlebarsRoutes.get('/register', (req, res) => {
    res.render('register');
})

handlebarsRoutes.get('/productos', (req, res) => {
    res.render('productos');
})

handlebarsRoutes.get('/productos/:category', (req, res) => {
    res.render('productos');
})

handlebarsRoutes.get('/carrito', (req, res) => {
    res.render('cart');
})

handlebarsRoutes.get('/productos/detalle/:id', (req, res) => {
    res.render('product-detail');
})

handlebarsRoutes.get('/chat', (req, res) => {
    res.render('chat', {
        email: req.user.email
    });
})

handlebarsRoutes.get('/chat/:email', async (req, res) => {

    const messages = await findByEmail(req.user.email);

    console.log(messages)

    res.render('chat-email', {
        messages
    });
})