import { Inngest } from "inngest";
import { Attendance } from "../models/AttendanceSchema.js";
import { Employee } from "../models/EmployeeSchema.js";
import { Leave } from "../models/LeaveSchema.js";
import { sendEmail } from "../config/nodemailer.js";
export const inngest = new Inngest({ id: "WorkNest" });
const CheckOutRemainder=inngest.createFunction({id:"check-out-remainder",triggers:[{event:"employee/check-out"}]},
  async({event,step})=>{
    const {employeeId,attendanceId}=event.data;
    //9 hrs wait 
    await step.sleepUntil("wait-for-9-hours",new Date(new Date().getTime()+9*60*60*1000))
    let attendance=await Attendance.findById(attendanceId)
    if(!attendance?.checkOut){
      const emp=await Employee.findById(employeeId)
      await sendEmail({to:emp.email,subject:`Attendance-Check-Out-Remainder`,
        body: `
                <div style="max-width: 600px;">
                    <h2>Hi ${emp.firstName}, 👋</h2>
                    <p style="font-size: 16px;">You have a check-in in ${emp.department} today:</p>
                    <p style="font-size: 18px; font-weight: bold; color: #007bff; margin: 8px 0;">${attendance?.checkIn?.toLocaleTimeString()}</p>
                    <p style="font-size: 16px;">Please make sure to check-out in one hour.</p>
                    <p style="font-size: 16px;">If you have any questions, please contact your admin.</p>
                    <br />
                    <p style="font-size: 16px;">Best Regards,</p>
                    <p style="font-size: 16px;">EMS</p>
                </div>`
      }
      )
      await step.sleepUntil("wait-for-1-hour",new Date(new Date().getTime()+1*60*60*1000))
      attendance=await Attendance.findById(attendanceId)
      //if within 1 hr not checkout penalise by updating the checkout status by self 
       if(!attendance?.checkOut){
        attendance.checkOut=new Date(attendance.checkIn.getTime()+4*60*60*1000)
        attendance.workingHours=4;
        attendance.dayType="Half Day";
        attendance.status="LATE";
        await attendance.save();
       }
    }
  }

)
const LeaveRemainer=inngest.createFunction({id:"leave-application-remainder",triggers:[{event:"leave/pending"}]},
  async({event,step})=>{
    const {leaveId}=event.data;
    await step.sleepUntil("wait-for-24-hour",new Date(new Date().getTime()+24*60*60*1000))
    const leaveApplication=await Leave.findById(leaveId);
    if(leaveApplication?.status==="PENDING"){
    const emp=await Employee.findById(leaveApplication.employeeId)
   await sendEmail({to:process.env.ADMIN_EMAIL,subject:`Leave-Application-Remainder`,
        body:  `
            <div style="max-width: 600px;">
                <h2>Hi Admin, 👋</h2>
                <p style="font-size: 16px;">You have a leave application in ${emp.department} today:</p>
                <p style="font-size: 18px; font-weight: bold; color: #007bff; margin: 8px 0;">${leaveApplication?.startDate?.toLocaleDateString()}</p>
                <p style="font-size: 16px;">Please make sure to take action on this leave application.</p>
                <br />
                <p style="font-size: 16px;">Best Regards,</p>
                <p style="font-size: 16px;">EMS</p>
            </div>
        `
      }
      )
    }
  }
)
// Attendance Reminder Cron Workflow
// Cron: Check attendance at 11:30 AM IST (06:00 UTC) and email absent employees
const attendanceReminderCron = inngest.createFunction(
  { id: "attendance-reminder-cron" ,
  triggers:[{ cron: "TZ=Asia/Kolkata 30 11 * * *" }]}, // 06:00 UTC = 11:30 AM IST
  async ({ step }) => {
    
    // Step 1: Get today's date range (IST)
    const today = await step.run("get-today-date", () => {
      const startUTC = new Date(new Date().toLocaleDateString("en-CA", { timeZone: "Asia/Kolkata" }) + "T00:00:00+05:30");
      const endUTC = new Date(startUTC.getTime() + 24 * 60 * 60 * 1000);
      return { 
        startUTC: startUTC.toISOString(), 
        endUTC: endUTC.toISOString() 
      };
    });

    // Step 2: Get all active, non-deleted employees
    const activeEmployees = await step.run("get-active-employees", async () => {
      const employees = await Employee.find({
        isDeleted: false,
        employmentStatus: "ACTIVE",
      }).lean();
      
      return employees.map((e) => ({ 
        _id: e._id.toString(), 
        firstName: e.firstName, 
        lastName: e.lastName, 
        email: e.email, 
        department: e.department 
      }));
    });

    // Step 3: Get employee IDs on approved leave today
    const onLeaveIds = await step.run("get-on-leave-ids", async () => {
      const leaves = await Leave.find({
        status: "APPROVED",
        startDate: { $lte: new Date(today.endUTC) },
        endDate: { $gte: new Date(today.startUTC) },
      }).lean();
      
      return leaves.map((l) => l.employeeId.toString());
    });

    // Step 4: Get employee IDs who already checked in today
    const checkedInIds = await step.run("get-checked-in-ids", async () => {
      const attendances = await Attendance.find({
        date: { $gte: new Date(today.startUTC), $lt: new Date(today.endUTC) },
      }).lean();
      
      return attendances.map((a) => a.employeeId.toString());
    });

    // Step 5: Filter absent employees (not on leave & not checked in)
    const absentEmployees = activeEmployees.filter((emp) => 
      !onLeaveIds.includes(emp._id) && !checkedInIds.includes(emp._id)
    );

    // Step 6: Send reminder emails
    if (absentEmployees.length > 0) {
      await step.run("send-reminder-emails", async () => {
        const emailPromises = absentEmployees.map(async(emp) => {
         await sendEmail({to:emp.email,subject:`Attendance Remainder-Please Mark Your Attendance`,
        body:  `
                            <div style="max-width: 600px; font-family: Arial, sans-serif;">
                                <h2>Hi ${emp.firstName}, 👋</h2>
                                <p style="font-size: 16px;">We noticed you haven't marked your attendance yet today.</p>
                                <p style="font-size: 16px;">The deadline was <strong>11:30 AM</strong> and your attendance is still missing.</p>
                                <p style="font-size: 16px;">Please check in as soon as possible or contact your admin if you're facing any issues.</p>
                                <br />
                                <p style="font-size: 14px; color: #666;">Department: ${emp.department}</p>
                                <br />
                                <p style="font-size: 16px;">Best Regards,</p>
                                <p style="font-size: 16px;"><strong>QuickEMS</strong></p>
                            </div>
                        `
      }
      )
       
        });
           await Promise.all(emailPromises);
      });
  
    }

    return {
      totalActive: activeEmployees.length,
      onLeave: onLeaveIds.length,
      checkedIn: checkedInIds.length,
      absent: absentEmployees.length
    };
  }
);

export const functions = [CheckOutRemainder,LeaveRemainer,attendanceReminderCron];