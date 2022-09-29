import {Users} from "../models/users.js";

export const createUser = async (user) => {
    const userModel = new Users(user);
    return await userModel.save()
}

export const searchIfExist = async (user) => {
    //console.log(user)
    return await Users.findOne(user).exec();
}