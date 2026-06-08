import express from "express"
import { protect } from "../middlewares/protect.js"
import { protectAdmin } from "../middlewares/protect.js"
import { createleave, getLeaves, updateLeaveStatus } from "../controller/LeaveController.js"
const LeaveRouter=express.Router()
LeaveRouter.post("/",protect,createleave)
LeaveRouter.get("/",protect,getLeaves)
LeaveRouter.patch("/:id",protect,protectAdmin,updateLeaveStatus)
export default LeaveRouter