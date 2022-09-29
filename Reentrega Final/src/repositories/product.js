import {Product} from "../models/product.js";

export const findAll = async () => {
    return await Product.find().exec();
}

export const findAllByCategory = async (category) => {
    return await Product.find({
        category
    }).exec();
}

export const findOne = async (_id) => {
    return await Product.findOne({
        _id
    }).exec();
}


export const save = async (product) => {
    try {
        const productToSave = new Product(product);
        return await productToSave.save();
    } catch (e) {
        console.error('error to save', e.message)
    }
}


export const updateById = async (_id, product) => {
    try {
        return await Product.update({
            _id
        }, product)
    } catch (e) {
        console.error('error to update', e.message)
    }
}

export const deleteById = async (id) => {
    try {
        return await Product.deleteOne({
            id
        })
    } catch (e) {
        console.error('error to delete', e.message)
    }
}