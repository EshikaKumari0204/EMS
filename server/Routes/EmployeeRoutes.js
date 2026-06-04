import express from "express"
import { createEmployee, deleteEmployee, getEmployee, updateEmployee } from "../controller/UserController"
const EmployeeRouter=express.Router()
EmployeeRouter.get("/",getEmployee)
EmployeeRouter.post("/",createEmployee)
EmployeeRouter.put("/",updateEmployee)
EmployeeRouter.delete("/",deleteEmployee)
export default EmployeeRouter
