import { Request, Response } from "express";
import { userServices } from "./user.service";

const createUser = async (req: Request, res: Response) => {
    try {
        const user = await userServices.createUser(req.body)
        res.status(201).json({
            success: true,
            message: "User Created!",
            data: user
        })
    } catch (error) {
        res.status(400).json({
            success: false,
            message: (error as any).message
        })
    }
}

export const userControllers = {
    createUser
}