import express from "express"
import { protect,protectAdmin } from "../middlewares/protect.js"
import { getDashboard } from "../controller/DashboardController.js"
const DashboardRouter=express.Router()
DashboardRouter.get("/",protect,getDashboard)

export default DashboardRouter