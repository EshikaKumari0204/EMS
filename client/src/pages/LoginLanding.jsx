import Loginleft from "../Components/Loginleft"
import {ArrowRightIcon,ShieldIcon,UserIcon} from "lucide-react"
import {Link} from "react-router-dom"
const LoginLanding = () => {
const portals=[{to:"/login/admin",title:"Admin Portal",description:"Manage Employees,department ,payroll and system cofiguration",icon:ShieldIcon},{to:"/login/employee" ,title:"Employee Portal",description:"View Your profile ,track attendance ,request timeoff and access payslips",icon:UserIcon}]
  return (
    <div className="flex h-screen w-screen justify-start items-center ">
   <Loginleft  />
   <div className="flex flex-col gap-5 justify-center items-center px-5 w-[50%] text-slate-600 ">
    <h1 className="text-3xl md:text-4xl">Welcome Back</h1>
    <p className="text-slate-500">Select your portal to securely access the system</p>
    <div className="flex-col flex gap-4">
      {portals.map((portal,index)=>(<Link to={portal.to} key={index}><div className="flex justify-between items-center border rounded-md  p-2 w-md py-4"><h3>{portal.title}</h3><ArrowRightIcon size={18}/></div></Link>))} 
    </div>
    <div className="mt-12 text-center md:text-left text-sm text-slate-400"><p>&copy2026 Worknest.All rights reserved </p></div>
   </div>
    </div>
  )
}

export default LoginLanding
