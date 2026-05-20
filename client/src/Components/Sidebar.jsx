import {useState,useEffect} from "react"
import {useLocation} from "react-router-dom"
import {dummyProfileData} from "../assets/assets"
import {MenuIcon,UserIcon,XIcon,LayoutGridIcon,SettingsIcon,FileTextIcon,DollarSignIcon,CalendarIcon,ChevronRightIcon,LogOutIcon} from "lucide-react"
import {Link} from "react-router-dom"
const Sidebar = () => {

  const [Username,setUsername]=useState("");
  const {pathname}=useLocation();
  const [Mobileopen,setMobileopen]=useState(false);
  const role="Admin"|| "Employee"
  const logout=()=>{
    window.location.href="/login"
  }
  const navlinks=[{name:"Dashboard",href:"/dashboard",icon:LayoutGridIcon},role==='Admin'?{name:"Employees",href:"/employee",icon:UserIcon}:{name:"Attendance",href:"/attendance",icon:CalendarIcon},{name:"Leave",href:"/leave",icon:FileTextIcon},{name:"Payslips",href:"/payslips",icon:DollarSignIcon},{name:"Settings",href:"/settings",icon:SettingsIcon},]
  const sidebarcontent=(<div className="flex flex-col  p-5 gap-5 h-full">
    <div className="flex gap-3 justify-center items-center">
      <UserIcon size={30}></UserIcon>
      <div className="flex flex-col gap-0 items-start justify-center "><p className="text-lg">WorkNest</p><p className="text-gray-600 text-sm">Employee Management System</p></div>
    </div>
    <button className="lg:hidden"><XIcon/></button>
    <div className="flex gap-3  items-center">
      <span className="bg-amber-400 rounded-md px-5 py-3">{dummyProfileData.firstName.charAt(0).toUpperCase()}</span>
      <div className="flex flex-col "><p>{Username}</p><p className="text-sm text-gray-60">{role}</p></div>
    </div>
    <div className="text-sm ">NAVIGATION</div>
    <div className="flex flex-col gap-4">
      {navlinks.map((link)=>{
        const isActive=pathname.startsWith(link.href)
        return (<Link className="flex gap-2 justify-between" to={link.name}>
       <div className="flex gap-2 ">   <link.icon></link.icon>
          <p>{link.name}</p></div>
          {isActive && <ChevronRightIcon/>}
        </Link>)})}
    </div>
    <div className="flex gap-2 mt-auto cursor-pointer" onClick={logout}>
      <LogOutIcon /> <p>Logout</p>
    </div>

  </div>)
  useEffect(()=>{
    setUsername(dummyProfileData.firstName+" "+dummyProfileData.lastName);
  },[])
 useEffect(()=>{
 setMobileopen(false);
 },[pathname])
  return (
   <div className="bg-amber-500 h-screen text-white"  >
   <button onClick={()=>setMobileopen(true)} className="lg:hidden"><MenuIcon /></button>
   <aside className="lg:flex hidden h-full">{sidebarcontent}</aside>
   <aside className="lg:hidden h-full">{sidebarcontent}</aside>
   </div>
  )
}

export default Sidebar
