import {Order} from "../models/order.js";

export const saveOrder = (order) => {
    const orderToSave = new Order(order);
    return orderToSave.save();
}