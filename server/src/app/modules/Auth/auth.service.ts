import { createNewAccessTokenUsingRefreshToken } from "../../utils/tokenProvider"

const getNewAccessToken = async (refreshToken: string) => {
    const newAccessToken = await createNewAccessTokenUsingRefreshToken(refreshToken)
    return {
        accessToken: newAccessToken
    }
}

export const authServices = {
    getNewAccessToken
}