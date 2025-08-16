import { UserI } from "./user.interface";
import { UserModel } from "./user.model";

const createUser = async (payload: UserI) => {
    const isUserExist = await UserModel.findOne({email: payload.email})
    if (isUserExist) {
        throw new Error("User already exist!")
    }
    const user = await UserModel.create(payload)
    return user
}

export const userServices = {
    createUser
}