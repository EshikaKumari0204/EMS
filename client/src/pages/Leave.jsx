
import {useState,useEffect} from "react"
import { dummyLeaveData } from "../assets/assets";
import {PlusIcon,ThermometerIcon,PalmtreeIcon,UmbrellaIcon} from "lucide-react"
import LeaveHistory from "../Components/Leave/leaveHistory";
import LeaveForm from "../Components/Leave/LeaveForm";
const Leave  = () => {
  const [leaves,setleaves]=useState([]);
   const [showmodal,setshowmodal]=useState(false);
    const [loading,setloading]=useState(false);
     const [isdeleted,setisdeleted]=useState(false);
     const isAdmin=false;
     const fetchLeaves=async()=>{
       setleaves(dummyLeaveData)
     }
     useEffect(()=>{
      setloading(true);
      fetchLeaves()
      setTimeout(()=>{
        setloading(false)
      },1000)
     },[fetchLeaves])
     const approvedleaves=leaves.filter((data)=> data.status=== "APPROVED")
     const sickCount=approvedleaves.filter((data)=> data.type=== "SICK").length
    const annualCount=approvedleaves.filter((data)=> data.type=== "ANNUAL").length
    const casualCount=approvedleaves.filter((data)=> data.type=== "CASUAL").length
const cards=[{label:"Sick Leave",value:sickCount,icon:ThermometerIcon},{label:"Casual Leave",value:casualCount,icon:UmbrellaIcon},{label:"Annual Leave",value:annualCount,icon:PalmtreeIcon}]
  return (
    <div>
      {/*Heading */}
      <div className="flex justify-between">
        <div>
          <p>Leave Management</p>
          <p>{isAdmin?" Manage Leave Application":"Your Leave History and Request"}</p>
        </div>
        {!isAdmin && <button className="flex  bgflex px-3 py-2 bg-blue-500 text-white border rounded items-center gap-0.5 " onClick={()=>setshowmodal(true)}><PlusIcon></PlusIcon>Apply for Leave</button>}
      </div>
      {/* Cards */}
    {!isAdmin && <div className="flex justify-between mt-5 "> {cards.map((item,index)=>(<div key={index} className="flex justify-between items-center gap-2 border border-slate-500 rounded-md px-2 py-4"> <item.icon></item.icon><div><p>{item.label}</p> <p>{item.value} token</p></div></div>))}</div>}
 
      {/* Table */}
      <LeaveHistory isAdmin={isAdmin} leaves={leaves} onUpdate={fetchLeaves}></LeaveHistory>
      <LeaveForm open={showmodal} onClose={()=>setshowmodal(false)}  />
    </div>
  )
}
export default Leave
