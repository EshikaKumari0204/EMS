import express from "express"
import cors from "cors"
import multer from "multer"
import "dotenv/config"
import { connectDb } from "./config/db.js"
import EmployeeRouter from "./Routes/EmployeeRoutes.js"
const app=express()
const port=process.env.PORT||4000
app.use(cors())
app.use(express.json())
app.use(multer().none())
app.get("/",(req,res)=>res.send("hey"))
app.use("/api/employees",EmployeeRouter)
 connectDb()
app.listen(port,()=>{
  console.log(`server is listening on port num ${port}`)
})