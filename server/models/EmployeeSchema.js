import mongoose from "mongoose"
import { DEPARTMENTS } from "../constants/dept"
const empSchema=new mongoose.Schema({
  userId:{type:mongoose.Schema.Types.ObjectId,ref:"User",unique:true,required:true},
  firstName:{type:String,required:true},
  lastName:{type:String,required:true},
    email:{type:String,required:true},
     phone:{type:String,required:true},
    position:{type:String,required:true},
  basicSalary:{type:Number,required:true},
  allowances:{type:Number,required:true},
   deductions:{type:Number,required:true},
   employmentStatus:{type:String,enum:["ACTIVE","INACTIVE"],default:"ACTIVE"},
   department:{type:String,enum:DEPARTMENTS}
},{timestamps:true})
export const Employee=mongoose.models.Employee||mongoose.model(" Employee",empSchema)