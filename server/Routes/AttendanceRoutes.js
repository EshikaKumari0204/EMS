import express from "express"
import { getAttendance,  } from "../controller/AttendanceController.js"
import { clockInOut } from "../controller/AttendanceController.js"
import { protect } from "../middlewares/protect.js"
const AttendanceRouter=express.Router()
AttendanceRouter.get("/",profile,getAttendance)
AttendanceRouter.post("/",protect,clockInOut)
export default AttendanceRouter