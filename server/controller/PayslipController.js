import { Employee } from "../models/EmployeeSchema.js";
import { Payslip } from "../models/PayslipSchema.js";
import { User } from "../models/UserSchema.js";
export const createPayslip=async(req,res)=>{
  try {
    const {employeeId,month,year,basicSalary,allowances,deductions}=req.body;
    if(!employeeId || !month || !year || !basicSalary){
      return res.status(400).json({error:"Missing fields"})
      
    }
    
    const netSalary=Number(basicSalary)+Number(allowances||0) -Number(deductions||0)
    const payslip=await Payslip.create({employeeId,month:Number(month),year:Number(year),basicSalary:Number(basicSalary),allowances:Number(allowances || 0),deductions:Number(deductions || 0),netSalary})
    return res.json({success:true,data:payslip})
  } catch (error) {
    console.log("error get create payslip",error)
    return res.status(500).json({error:"Failed"})
  }
}
export const getPayslipById=async(req,res)=>{
  try {
    const payslip=await Payslip.findById(req.params.id).populate("employeeId").lean();
    if(!payslip)  return res.status(404).json({error:"not found"})
      const result={...payslip,id:payslip._id.toString(),employee:payslip.employeeId}
   return res.json({success:true, data:result})
  } catch (error) {
    console.log("error get payslip by id ",error)
    return res.status(500).json({error:"Failed"})
  }
}
export const getpayslip=async(req,res)=>{
  try {
    const session=req.session;
    const isAdmin=session.role==="ADMIN"
    if(isAdmin) {
      const payslips=await Payslip.find().populate("employeeId").sort({createdAt:-1})
      const data=payslips.map((p)=>{
        const obj=p.toObject();
        return {...obj,id:obj._id.toString()}
      })
      return res.json({data})
    }
   const userId = session.userId;
if (!userId) {
  return res.status(403).json({ error: "Access denied" });
}

const employee = await Employee.findOne({ userId }); // find Employee by its userId field
if (!employee) {
  return res.status(404).json({ error: "Employee not found" });
}

const payslips = await Payslip.find({ employeeId: employee._id })
  .populate("employeeId")
  .sort({ createdAt: -1 });

const data = payslips.map((p) => {
  const obj = p.toObject();
  return { ...obj, id: obj._id.toString() };
});

return res.json({ data });

  } catch (error) {
    console.log("error get payslip  ", error);
    return res.status(500).json({ error: "Failed" });
  }
}