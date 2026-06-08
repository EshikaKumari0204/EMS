import express from "express"
import { protect } from "../middlewares/protect.js"
import { protectAdmin } from "../middlewares/protect.js"
import { createPayslip, getpayslip, getPayslipById } from "../controller/PayslipController.js"

const PayslipRouter=express.Router()
PayslipRouter.post("/",protect,protectAdmin,createPayslip)
PayslipRouter.get("/",protect,getpayslip)
PayslipRouter.patch("/:id",protect,getPayslipById)
export default PayslipRouter