import { Router } from "express";
import { authControllers } from "./auth.controller";

const router = Router()

router.post("/login", authControllers.login)
router.post("/refresh-token", authControllers.getNewAccessToken)
router.post("/logout", authControllers.logout)

export const authRoute = router