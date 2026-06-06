import express from "express"
import { getProfile, updateProfile } from "../controller/ProfileController.js"
import { protect } from "../middlewares/protect.js"
const ProfileRouter=express.Router()
ProfileRouter.get("/",profile,getProfile)
ProfileRouter.post("/",protect,updateProfile)

export default ProfileRouter