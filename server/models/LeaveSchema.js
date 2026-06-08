import mongoose from "mongoose"
const LeaveSchema=new mongoose.Schema({
  employeeId:{type:mongoose.Schema.Types.ObjectId,ref:"Employee",required:true},
  startDate:{type:Date,required:true},
  endDate:{type:Date,required:true},
  reason:{type:Date,required:true},
  status:{type:String,enum:["PENDING","APPROVED","REJECTED"],default:"PENDING"}
  type:{type:String,enum:["SICK","CASUAL","ANNUAL"],required:true}
},{timestamps:true})
export const  Leave=mongoose.models.Leave||mongoose.model("  Leave",LeaveSchema)