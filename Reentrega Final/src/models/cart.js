import mongoose from "mongoose";

export const Cart = mongoose.model('Cart', {
    date: Date,
    rows: [{
       item: {
           id: String,
           description: String
       },
       quantity: Number
    }],
})