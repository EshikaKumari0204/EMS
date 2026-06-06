import express from "express"
import { createEmployee, deleteEmployee, getEmployee, updateEmployee } from "../controller/EmployeeController.js"
import { protect,protectAdmin } from "../middlewares/protect.js"
const EmployeeRouter=express.Router()
EmployeeRouter.get("/",protect,protectAdmin,getEmployee)
EmployeeRouter.post("/",protect,protectAdmin,createEmployee)
EmployeeRouter.put("/:id",protect,protectAdmin,updateEmployee)
EmployeeRouter.delete("/:id",protect,protectAdmin,deleteEmployee)
export default EmployeeRouter
