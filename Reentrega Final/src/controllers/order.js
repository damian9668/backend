import {saveOrder} from "../repositories/order.js";
import {Cart} from "../models/cart.js";
import {sendOrderEmail} from "../helpers/twilio.js";

export const postOrder = async (req, res) => {
    const {
        cartId,
    } = req.body;

    const items = await Cart.findOne({
        _id: cartId
    })

    console.log(items)

    const order = {
        items,
        date: new Date(),
        status: 'generated',
        email: req?.user?.email
    }

    const orderSaved = await saveOrder(order);

    console.log(orderSaved);

    await sendOrderEmail(orderSaved);

    res.status(201).send(orderSaved);

}