import {findById, updateCart, deleteByIdRepo} from "../repositories/cart.js";

export const upsert = async (req, res) => {
    const {
        id,
        product
    } = req.body;

    console.log(req.body)

    const cartId = await updateCart(id, product);

    res.send({
        id: cartId
    });
}

export const getById = async (req, res) => {
    const { id } = req.params;

    const data = await findById(id);

    res.send(data);
}

export const deleteById = async (req, res) => {
    const { id } = req.params;

    const data = await deleteByIdRepo(id);

    res.send(data);
}
