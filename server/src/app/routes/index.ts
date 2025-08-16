import { Router } from "express";
import { authRoute } from "../modules/Auth/auth.route";
import { userRoute } from "../modules/User/user.route";

export const router = Router()

const moduleRoutes = [
    {
        path: "/auth",
        route: authRoute
    },
    {
        path: "/user",
        route: userRoute
    },
]
moduleRoutes.forEach(route => {
    router.use(route.path, route.route )
})