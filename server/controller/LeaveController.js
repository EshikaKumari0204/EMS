import { Leave } from "../models/LeaveSchema.js";
import { Employee } from "../models/EmployeeSchema.js";
import { inngest } from "../inngest/index.js";
export const createleave=async(req,res)=>{
  try {
    const session=req.session;
      const emp=await Employee.findOne({userId:session.userId})
      if(!emp){
       return res.status(404).json({error:"Employee not found"})
      }
       if(emp.isDeleted){
       return res.status(403).json({error:"Employee is deleted so leave cant be created"})
      }
      const {type,startDate,endDate,reason}=req.body;
      if(!type || !startDate || !endDate || !reason){
      return res.status(400).json({error:"All fields are required "})
      }
      const today=new Date();
      today.setHours(0,0,0,0);
      if(new Date(startDate)<=today || new  Date(endDate)<= today){  return res.status(400).json({error:"Leave Date must be in future "})}
      const leave=await Leave.create({employeeId:emp._id,type,startDate:new Date(startDate),endDate:new Date(endDate),reason,status:"PENDING"})
      await inngest.send({name:"leave/pending",data:{leaveId:leave._id}})
      return res.json({success:true,data:leave})
    
  } catch (error) {
    console.log("error in creating leave ")
    res.status(500).json({error:"error in  creating leave"})
    
  }
}
export const getLeaves=async(req,res)=>{
  try {
    const session=req.session;
    const isAdmin=session.role==="ADMIN";
    if(isAdmin){
      const status=req.query.status;
      const where=status?{status}:{};
      const leaves =await Leave.find(where).populate("employeeId").sort({createdAt:-1})
      const data=leaves.map((leave)=>{
        const obj=leave.toObject();
        return {...obj,id:obj._id.toString(),employee:obj.employeeId,employeeId:obj.employeeId?._id?.toString()}
      })
      return res.json({data})
    }
    else{
      const emp=await Employee.findOne({userId:session.userId}).lean();
      if(!emp){
       return res.status(404).json({error:"Employee not found"})
      }
      const leaves = await Leave.find({employeeId:emp._id}).sort({createdAt:-1})
      return res.json({data:leaves,employee:{...emp,employeeId:emp._id.toString()}})
    }
    
  } catch (error) {
    return res.status(500).json({error:"failed"})
    
  }
}
export const updateLeaveStatus=async(req,res)=>{
  try {
    const {status}=req.body;
    if(!["APPROVED","REJECTED","PENDING"].includes(status)){
      return res.status(400).json({error:"Invalid status"})
    }
    const leave=await Leave.findByIdAndUpdate(req.params.id, {status}, {new:true})
    return res.json({success:true,data:leave})
  } catch (error) {
    return res.status(500).json({error:"Failed"})
  }
}