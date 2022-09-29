import mongoose from "mongoose";

export const startConnection = () => {
    if(!mongoose.connection.readyState) {
        mongoose.connect(process.env.MONGO_URI).then((value) => {
            console.info('Mongo server connected!')
        })
    }
}