import { Request, Response } from "express";
import { UserModel } from "../User/user.model";
import { enVariables } from "../../config/env.config";
import { tokenProvider } from "../../utils/tokenProvider";
import { setAuthCookie } from "../../utils/cookieSetter";
import { authServices } from "./auth.service";

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


const getNewAccessToken = async (req: Request, res: Response) => {
    try {
        const refreshToken = req.cookies.refreshToken
        if (!refreshToken) {
            throw new Error("Unauthenticated!")
        }
        const tokenInfo = await authServices.getNewAccessToken(refreshToken)
        setAuthCookie(res, tokenInfo)
        res.status(200).json({
            success: true,
            message: "New Access Token Retrieved!",
            data: tokenInfo
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


export const authControllers = {
    login,
    getNewAccessToken,
    logout
}