import {Message} from "../models/message.js";

export const save = async (message) => {
    const messageToSave = new Message(message);
    return messageToSave.save();
}

export const findByEmail = async (email) => {
    return Message.find({
        email
    }).lean().exec()
}