import {useState,useEffect} from "react"
import {useLocation} from "react-router-dom"
import {dummyProfileData} from "../assets/assets"
import {MenuIcon,UserIcon,XIcon,LayoutGridIcon,SettingsIcon,FileTextIcon,DollarSignIcon,CalendarIcon,ChevronRightIcon,LogOutIcon} from "lucide-react"
import {Link} from "react-router-dom"
const Sidebar = () => {
    // In react-router-dom, useLocation().pathname is a property that returns the current path of the URL
  const {pathname}=useLocation();
  const [Username,setUsername]=useState("");
  const [Mobileopen,setMobileopen]=useState(false);
  const role="Admin"|| "Admin"
  const logout=()=>{
    window.location.href="/login"
  }
  const navlinks=[{name:"Dashboard",href:"/dashboard",icon:LayoutGridIcon},role==='Admin'?{name:"Employees",href:"/employees",icon:UserIcon}:{name:"Attendance",href:"/attendance",icon:CalendarIcon},{name:"Leave",href:"/leave",icon:FileTextIcon},{name:"Payslips",href:"/payslips",icon:DollarSignIcon},{name:"Settings",href:"/settings",icon:SettingsIcon},]
  
  useEffect(()=>{
    setUsername(dummyProfileData.firstName+" "+dummyProfileData.lastName);
  },[])
 useEffect(()=>{
 setMobileopen(false);
 },[pathname])
 const sidebarcontent=(<div className="flex flex-col  p-5 gap-5 h-full">
    <div className="flex gap-3 justify-center items-center">
      <UserIcon size={30}></UserIcon>
      <div className="flex flex-col gap-0 items-start justify-center "><p className="text-lg">WorkNest</p><p className="text-gray-600 text-sm">Employee Management System</p></div>
    </div>
    <button className="lg:hidden" onClick={()=>setMobileopen(false)}><XIcon/></button>
    <div className="flex gap-3  items-center">
      <span className="bg-amber-400 rounded-md px-5 py-3">{dummyProfileData.firstName.charAt(0).toUpperCase()}</span>
      <div className="flex flex-col "><p>{Username}</p><p className="text-sm text-gray-60">{role}</p></div>
    </div>
    <div className="text-sm ">NAVIGATION</div>
    <div className="flex flex-col gap-4">
      {navlinks.map((link,index)=>{
        const isActive=pathname.startsWith(link.href)
        return (<Link className="flex gap-2 justify-between" key={index} to={link.href}>
          {isActive && <div className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-5 rounded-r-full bg-white"/>}
       <div className="flex gap-2 ">   <link.icon></link.icon>
          <p>{link.name}</p></div>
          {isActive && <ChevronRightIcon/>}
        </Link>)})}
    </div>
    <div className="flex gap-2 mt-auto cursor-pointer" onClick={logout}>
      <LogOutIcon /> <p>Logout</p>
    </div>

  </div>)
  return (
   <div className="bg-amber-500 h-screen text-white"  >
   <button onClick={()=>setMobileopen(true)} className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-slate-900 text-white rounded-lg  shadow-lg border border-white/10"><MenuIcon size={20} /></button>
   {Mobileopen && <div className="lg-hidden fixed inset-0 bg-black/60 backdrop-blur-sm z-40" onClick={()=>setMobileopen(false)}/>}
   <aside className="lg:flex hidden h-full flex-col w-65 border-r border-white/4">{sidebarcontent}</aside>
   <aside className={`lg:hidden h-full fixed inset-y-0 left-0 w-72 flex flex-col transform transition-transform duration-300 ${Mobileopen?"translate-x-0 ": "-translate-x-full"}`}>{sidebarcontent}</aside>
   </div>
  )
}

export default Sidebar
