import { Employee } from "../models/EmployeeSchema.js";
import { User } from "../models/UserSchema.js";
import bcrypt from 'bcryptjs';
export const getEmployee=async(req,res)=>{
  try {
     const {department}=req.query;
  const where={};
  if(department) where.department=department
  const employees= (await Employee.find(where)).toSorted({createdAt:-1}).populate("userId","email","role").lean();
  const result=employees.map((emp)=>({...emp,id:emp._id.toString(),user:emp.userId?{email:emp.userId.email,role:emp.userId.role}:null}))
  return res.json(result)
  } 
 
  catch (error) {
    console.log(error.message)
    return res.status(500).json({message:"Error occured in getting employees",success:false})
    
  }
}
export const createEmployee=async(req,res)=>{
  try {
     const {firstName,lastName,email,phone,position,department,basicSalary,allowances,dedictions,joinDate,password,role,bio}=req.body;
  if(!firtsName|| !password||!email||!lastName){
    res.status(400).json({message:"missing required fields ",success:false})
  }
  const hashed=await bcrypt.hash(password,10)
  const user=await User.create({email,password:hashed,role:role||"EMPLOYEE"})
  const emp=await Employee.create({userId:user._id,firstName,lastName,email,phone,position,department,basicSalary:Number(basicSalary)||0,deductions:Number(deductions)||0,allowances:Number(allowances)||0,joinDate:new Date(joinDate),password,bio:bio||""})
  return res.status(201).json({message:"Employee created successfully",sucess:true})
  } 
 
  catch (error) {
    if(error.code===11000){
    res.status(400).json("email already exists")
    }
    console.log("create employee error",err.message)
     res.status(500).json("Erorr in creating employee")
  }
}
export const updateEmployee=async(req,res)=>{
  try {
  const {id}=req.params
  const {firstName,lastName,email,phone,position,department,basicSalary,allowances,dedictions,joinDate,password,role,bio}=req.body;
  const emp=await Employee.findById(id)
  if(!emp)  return res.status(404).json("Employee doesnt exist")
  const hashed=await bcrypt.hash(password,10)
  const userupdate=await User.findByIdAndUpdate({email,role:role||"Engineering",password:hashed})
    const updatesEmp=await Employee.findByIdAndUpdate({userId:user._id,firstName,lastName,email,phone,position,department,basicSalary:Number(basicSalary)||0,deductions:Number(deductions)||0,allowances:Number(allowances)||0,joinDate:new Date(joinDate),password,bio:bio||""})
     return res.status(201).json({message:"Employee updated successfully",sucess:true})
  } catch (error) {
   console.log("create employee error",err.message)
     res.status(500).json("Erorr in updating employee")
  }
}
export const deleteEmployee=async(req,res)=>{
  try {
     const {id}=req.params;
  const emp=await Employee.findById({id})
  if(!emp)  return res.status(404).json("Employee doesnt exist")
    emp.isDeleted=true;
  emp.employmentStatus="INACTIVE"
  return res.status(201).json({message:"Employee deleted successfully",sucess:true})
  } catch (error) {
     console.log("create employee error",err.message)
     res.status(500).json("Erorr in deleting employee")
  }
 

}