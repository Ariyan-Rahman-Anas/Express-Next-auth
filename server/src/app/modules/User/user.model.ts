import { model, Schema } from "mongoose";
import { UserI } from "./user.interface";

const userSchema = new Schema<UserI>({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    address: { type: String, required: true },
    profession: { type: String, required: true }
}, { timestamps: true, versionKey: false })

export const UserModel = model<UserI>("user", userSchema)