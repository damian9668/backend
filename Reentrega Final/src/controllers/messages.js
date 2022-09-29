import {findByEmail} from "../repositories/message.js";

export const getAllByEmail = async (req, res) => {
    const email = req.params.email;

    const messages = await findByEmail(email);

    res.send(messages);
}