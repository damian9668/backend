import mongoose from "mongoose";

export const Product = mongoose.model('Product', {
    description: String,
    category: String,
    price: Number,
    photoUrl: String
})