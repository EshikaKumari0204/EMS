import express from "express"
import cors from "cors"
import multer from "multer"
import "dotenv/config"
import { serve } from "inngest/express";
import { inngest, functions } from "./inngest/index.js"
import { connectDb } from "./config/db.js"
import EmployeeRouter from "./Routes/EmployeeRoutes.js"
import AuthRouter from "./Routes/AuthRoutes.js"
import ProfileRouter from "./Routes/ProfileRoutes.js"
import LeaveRouter from "./Routes/LeaveRoutes.js"
import DashboardRouter from "./Routes/DashboardRoute.js";
import AttendanceRouter from "./Routes/AttendanceRoutes.js";
import PayslipRouter from "./Routes/PayslipRoutes.js";

const app=express()
const port=process.env.PORT||4000
app.use(cors())  
app.use(express.json())
app.use(multer().none())
app.get("/",(req,res)=>res.send("hey"))
app.use("/api/employees",EmployeeRouter)
app.use("/api/auth",AuthRouter)
app.use("/api/profile",ProfileRouter)
app.use("/api/leaves",LeaveRouter)
app.use("/api/dashboard",DashboardRouter)
app.use("/api/inngest", serve({ client: inngest, functions }));
app.use("/api/attendance",AttendanceRouter)
app.use("/api/payslips",PayslipRouter)

connectDb().catch((err) => {
  console.error("DB connection failed:", err.message)
})
app.listen(port,()=>{
  console.log(`server is listening on port num ${port}`)
})
export default app
//https://ems-server-sage.vercel.app/