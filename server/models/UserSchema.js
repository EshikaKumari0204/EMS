import mongoose from "mongoose"
const userSchema=new mongoose.Schema({
  email:{type:String,unique:true,required:true},
  password:{type:String,required:true},
  role:{type:String,enum:["ADMIN","EMPLOYEE"],default:"EMPLOYEE"}
},{timestamps:true})
export const User=mongoose.models.User||mongoose.model("User",userSchema)