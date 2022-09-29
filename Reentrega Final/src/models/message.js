import mongoose from "mongoose";

export const Message = mongoose.model('Message', {
    email: String,
    type: String,
    date: Date,
    text: String
})