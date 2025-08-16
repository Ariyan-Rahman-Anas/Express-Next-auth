import { JwtPayload } from "jsonwebtoken";
import { UserI } from "../modules/User/user.interface";
import { generateToken, verifyToken } from "./jwtHelper";
import { enVariables } from "../config/env.config";
import { UserModel } from "../modules/User/user.model";



export const tokenProvider = (user: Partial<UserI>) => {
    const jwtPayload = {
        userId: user._id,
        name: user.name,
        email: user.email,
    }

    const accessToken = generateToken(jwtPayload, enVariables.ACCESS_TOKEN_SECRET, enVariables.ACCESS_TOKEN_EXPIRY)

    const refreshToken = generateToken(jwtPayload, enVariables.REFRESH_TOKEN_SECRET, enVariables.REFRESH_TOKEN_EXPIRY)

    return {
        accessToken, refreshToken
    }
}


export const createNewAccessTokenUsingRefreshToken = async (refreshToken: string) => {
    const verifiedRefreshToken = verifyToken(refreshToken, enVariables.REFRESH_TOKEN_SECRET) as JwtPayload

    const isUserExist = await UserModel.findOne({ email: verifiedRefreshToken.email })

    if (!isUserExist) {
        throw new Error("User does not exist!")
    }


    const jwtPayload = {
        userId: isUserExist._id,
        name: isUserExist.name,
        email: isUserExist.email,
    }
    const accessToken = generateToken(jwtPayload, enVariables.ACCESS_TOKEN_SECRET, enVariables.ACCESS_TOKEN_EXPIRY)
    return accessToken
}