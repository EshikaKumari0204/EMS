import { User } from "../models/UserSchema.js";
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
export const login=async(req,res)=>{
  try {
  const {email,password,role_type}=req.body;
  if(!email || !password){
    return res.status(400).json({error:"Email and password are required "})
  }
  const user =await User.findOne({email})
   if(!user){
    return res.status(401).json({error:"Invalid credentials "})
  }
  if(user.role==="EMPLOYEE" && role_type==="ADMIN"){
    return res.status(401).json({error:"Not authorised as admin"})
  }
   if(user.role==="ADMIN" && role_type==="EMPLOYEE"){
    return res.status(401).json({error:"Not authorised as employee"})
  }
  const valid=await bcrypt.compare(password,user.password)
   if(!valid){
    return res.status(401).json({error:"Invalid credentials"})
  }
  const payload={userId:user._id.toString(),role:user.role,email:user.email};
  const token=jwt.sign(payload,process.env.JWT_SECRET,{expiresIn:"7d"})
  return res.json({user:payload,token})
}
  catch (error) {
    console.log("error in login",error)
      return res.status(500).json({error:"Login failed "})
  }
}
export const session=async(req,res)=>{
  const session=req.session;   
  return res.json({user:session})}
export const changePassword=async(req,res)=>{
  try {
    const session=req.session;
    const {currentPassword,newPassword}=req.body;
    if(!currentPassword || !newPassword){
    return res.status(400).json({error:"Both password are required "})
  }
  const user =await User.findById(session.userId)
   if(!user){
    return res.status(401).json({error:"User not found "})
  }
  const valid=await bcrypt.compare(currentPassword,user.password)
   if(!valid){
    return res.status(401).json({error:"Current password is wrong"})
  }
  const hashed=await bcrypt.hash(newPassword,10)
  const updatedUser=await User.findByIdAndUpdate(session.userId,{password:hashed})
    return res.json({success:true})
  } catch (error) {
    console.log("error in login",error)
      return res.status(500).json({error:"Changing Password failed"})
  }
}
