import { Attendance } from "../models/AttendanceSchema";

export const clockInOut=async(req,res)=>{
  try {
    const session=req.session;
      const emp=await Employee.findOne({userId:session.userId})
      //not an employee 
      if(!emp){
       return res.status(404).json({error:"Employee not found"})
      }
       if(emp.isDeleted){
       return res.status(403).json({error:"Employee is deleted so profile cannot clock in/out"})
      }
      const today=new Date();
      today.setHours(0,0,0,0)
      const existing = await Attendance.findOne({employeeId:emp._id,date:today})
      const now=new Date();
      if(!existing){
        const islate=now.getHours>=9 && now.getMinutes()>0;
        const attendance=await Attendance.create({employeeId:emp._id,date:today,checkIn:now,status:islate?"LATE":"PRESENT"})
        return res.json({data:attendance,type:"CHECK_IN",success:true})
      }
      else if(!existing.checkOut){
        const checkInTime=new Date(existing.checkIn).getTime()
        const diffMs=now.getTime()-checkInTime
        const diffHr=diffMs/(1000*60*60)
        existing.checkOut=now
        const workingHours=parseFloat(diffHours.toFixed(2))
        let  dayType="Half Day"
        if(workingHours>=8) dayType="Full Day"
         else if(workingHours>=8) dayType="Three Quarters Day"
          else if(workingHours>=4) dayType="Half  Day"
           else dayType="Short Day"
           existing.workingHours=workingHours;
           existing.dayType=dayType
           await existing.save();
            return res.json({data:existing,type:"CHECK_OUT",success:true})
      }
      else{
        return res.json({data:existing,type:"CHECK_OUT",success:true})
      }
    
  } catch (error) {
     console.log(error,"check in /out  attendance")
     return res.status(500).json({error:"Operation Failed"})
    
  }
}
export const getAttendance==async(req,res)=>{
  try {
     const session=req.session;
      const emp=await Employee.findOne({userId:session.userId})
      if(!emp){
       return res.status(404).json({error:"Employee not found"})
      }
      const limit=parseInt(req.query.limit||30)
      const history=await Attendance.find({employeeId:employee._id}).sort({date:-1}.limit(limit))
    return res.json({data:history,employee:{isDeleted:employee.isDeleted}})
  } catch (error) {
    console.log(error,"get attendance")
    return res.status(500).json({error:"Failed to fetch attendance "})
  }
}