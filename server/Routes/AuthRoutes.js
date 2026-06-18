import express from "express"
import { changePassword, login, session } from "../controller/AuthController.js"
import { protect } from "../middlewares/protect.js"
const AuthRouter=express.Router()
AuthRouter.post("/login",login)
AuthRouter.get("/session",protect,session)
AuthRouter.post("/change-password",protect,changePassword)
export default AuthRouter