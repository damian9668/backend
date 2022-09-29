import {Cart} from "../models/cart.js";

export const updateCart = async (_id, product) => {
    if(!_id) {
        const cartToSave = new Cart({
            date: new Date(),
            rows: [{
                item: product,
                quantity: 1
            }]
        });
        return (await cartToSave.save()).id;
    }

    const cart = await Cart.findOne({
        _id
    });

    let newItem = true;

    cart.rows.forEach((value) => {
        if(value.item.id === product.id) {
            value.quantity++
            newItem = false;
        }
    })

    if(newItem) {
        cart.rows.push({
            item: product,
            quantity: 1
        })
    }

    await Cart.update({
        _id
    }, cart);

    return cart._id;

}

export const findById = async (_id) => {
    return Cart.findOne({
        _id
    })
}

export const deleteByIdRepo = async (_id) => {
    return Cart.deleteOne({
        _id
    })
}