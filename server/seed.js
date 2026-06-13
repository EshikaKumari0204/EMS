import { connectDb } from "./config/db.js";
import { User } from "./models/UserSchema.js";
import bcrypt from "bcryptjs"
import "dotenv/config"
const tempPassword=process.env.ADMIN_TEMP_PASSWORD
async function registerAdmin(){
  try {
    const adminEmail=process.env.ADMIN_EMAIL
    if(!adminEmail){
      console.log("admin email missing in env variables")
      process.exit(1);
    }
    await connectDb();
    const existing=await User.findOne({email:adminEmail})
    if(existing){
      console.log("user already present with role",existing.role);
       process.exit(1);
    }
    const hashed=await bcrypt.hash(tempPassword,10);
    const user=await  User.create({email:adminEmail,password:hashed,role:"ADMIN"});
    console.log("admin user created ");
    console.log("admin email ",user.email);
    console.log("admin password ",tempPassword);
    console.log("Plz change password of admin after login ");
    process.exit(0);
  } catch (error) {
    console.log("error while registering the admin",error)
     process.exit(1)
  }
}
registerAdmin()