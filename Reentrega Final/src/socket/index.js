import {save} from "../repositories/message.js";

export const initIO = (io) => {

    const messages = [];

    io.on("connection", function (socket) {
        socket.emit("messages", messages)

        socket.on("messages", async (data) => {

            await save({
                ...data,
                type: 'user'
            })

            messages.push(data)
            io.sockets.emit("messages", messages);
        })
    });


}

