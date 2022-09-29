import mongoose, {Schema} from "mongoose";

export const Order = mongoose.model('Order', {
    items: Schema.Types.Mixed,
    date: Date,
    status: String,
    email: String
})