
import { Employee } from "../models/EmployeeSchema.js";
export const getProfile=async(req,res)=>{
  try {
  const session=req.session;
  const user=await Employee.findOne({userId:session.userId})
  if(!user){
   return res.json({firstName:"ADMIN",lastName:"",email:session.email})
  }
  return res.json(user)
}
  catch (error) {
    console.log("error while getting profile",error)
    return res.json({error:"error while getting profile"})
  }
}
export const updateProfile=async(req,res)=>{
  try {
  const session=req.session;
  const {bio}=req.body
  const emp=await Employee.findOne({userId:session.userId})
  //not an employee 
  if(!emp){
   return res.status(404).json({error:"Employee not found"})
  }
   if(emp.isDeleted){
   return res.status(403).json({error:"Employee is deleted so profile cant be updated"})
  }
  const updatedemp=await Employee.findByIdAndUpdate(session.userId,{bio:bio})
  return res.json({success:true})
   } catch (error) {
     console.log("error while updating profile",error)
    return res.status(500).json({error:"Failed to update profile"})
  }
}