import express from "express"
import cors from "cors"
import multer from "multer"
import "dotenv/config"
import { connectDb } from "./config/db.js"
import EmployeeRouter from "./Routes/EmployeeRoutes.js"
import AuthRouter from "./Routes/AuthRoutes.js"
import ProfileRouter from "./Routes/ProfileRoutes.js"
import LeaveRouter from "./Routes/LeaveRoutes.js"

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
 await connectDb()
app.listen(port,()=>{
  console.log(`server is listening on port num ${port}`)
})