import { DEPARTMENTS } from "../constants/dept.js";
import { Attendance } from "../models/AttendanceSchema.js";
import { Employee } from "../models/EmployeeSchema.js";
import { Leave } from "../models/LeaveSchema.js";
import { Payslip } from "../models/PayslipSchema.js";
export const getDashboard=async(req,res)=>{
  try {
  const session=req.session;

  if(session.role==="ADMIN"){
    const [totalEmployees,todayAttendance,pendingLeaves]=await Promise.all(
      [
        Employee.countDocuments({isDeleted:{$ne:true}}),
        Attendance.countDocuments({date:{$gte:new Date(new Date().setHours(0,0,0,0)),$lt:new Date(new Date().setHours(24,0,0,0))}}),
        Leave.countDocuments({status:"PENDING"})
      ]
    )
    return res.json({role:"ADMIN",totalEmployees,todayAttendance,pendingLeaves,totalDepartments:DEPARTMENTS.length})
  }
  else{
    const empid=session.userId;
    const emp=await Employee.findOne({userId:empid}).lean();
    if(!emp){
      return res.status(400).json({error:"Employee not found"})
    }
    const today=new Date();
    const [currentMonthAttendance,pendingLeaves,latestPayslip]=await Promise.all([
      Attendance.countDocuments({employeeId:emp._id,date:{$gte:new Date(today.getFullYear(),today.getMonth(),1),$lt:new Date(today.getFullYear(),today.getMonth()+1,1)}}),
      Leave.countDocuments({employeeId:emp._id,status:"PENDING"}),
      Payslip.findOne({employeeId:emp._id}).sort({createdAt:-1}).lean()
    ])
return res.json({role:"EMPLOYEE",employee:{...emp,id:emp._id.toString()},currentMonthAttendance,pendingLeaves,latestPayslip:latestPayslip?{...latestPayslip,id:latestPayslip._id.toString()}:null})
  }
   } catch (error) {
    console.log("error in get dashboard",error);
    return res.status(500).json({error:"Failed"})
    
  }

}