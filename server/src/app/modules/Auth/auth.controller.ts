import { Request, Response } from "express";
import { UserModel } from "../User/user.model";
import { enVariables } from "../../config/env.config";
import { tokenProvider } from "../../utils/tokenProvider";
import { setAuthCookie } from "../../utils/cookieSetter";

const login = async (req: Request, res: Response) => {
    try {
        const user = await UserModel.findOne({ email: req?.body?.email })
        if (!user) {
            throw new Error("User does not exist!")
        }
        const isOTPMatched = enVariables.OTP === req.body.OTP
        if (!isOTPMatched) {
            throw new Error("Invalid OTP!")
        }
        const tokens = tokenProvider(user)

        setAuthCookie(res, tokens)

        res.status(200).json({
            success: true,
            message: "User Logged In!",
            data: {
                user,
                accessToken: tokens.accessToken,
                refreshToken: tokens.refreshToken
            }
        })

    } catch (error) {
        res.status(400).json({
            success: false,
            message: (error as any).message
        })
    }
}


const logout = async (req: Request, res: Response) => {
    res.clearCookie("accessToken", {
        httpOnly: true,
        secure: false,
        sameSite: "lax"
    })
    res.clearCookie("refreshToken", {
        httpOnly: true,
        secure: false,
        sameSite: "lax"
    })
    res.status(200).json({
        success: true,
        message:"Logged Out!"
    })
}


// const logout = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
//     res.clearCookie("accessToken", {
//         httpOnly: true,
//         secure: false,
//         sameSite: "lax"
//     })
//     res.clearCookie("refreshToken", {
//         httpOnly: true,
//         secure: false,
//         sameSite: "lax"
//     })

//     sendResponse(res, {
//         statusCode: httpStatus.OK,
//         success: true,
//         message: "Logged Out!",
//         data: null
//     })
// })

export const authControllers = {
    login,
    logout
}