
import {useState,useEffect,useCallback} from "react"
import { DEPARTMENTS, dummyEmployeeData } from "../assets/assets";
import {Plus,Search,XIcon} from "lucide-react"
import EmployeeCard from "../Components/EmployeeCard";
import Loading from "../Components/Loading"
import FormComp from "../Components/FormComp";
const Employees = () => {
  const [employees,setEmployees]=useState([]);
  const [loading ,setloading]=useState(false);
  const [search,setsearch]=useState("");
  const [selectdept,setSelecteddept]=useState("")
  const [onedit,setonEdit]=useState(false);
  const [showCreateModel,setShowCreateModel]=useState(false)
  const fetchEmployees=useCallback(async ()=>{
    setloading(true)
    setEmployees( dummyEmployeeData.filter((emp)=>selectdept? emp.department===selectdept:emp));
    setTimeout(()=>{
     setloading(false)
    },1000)


  },[])
  useEffect(()=>{
fetchEmployees();
  },[])
  //get the employees whose name is included in search bar 

  const filtered= employees.filter((emp)=> `${emp.firstName}${emp.lastName}${emp.position}`.toLowerCase().includes(search.toLowerCase()))
  console.log("filtered",filtered,"employees",employees)
  const ondelete=async()=>{
    if(!confirm("Are you sure you want to delete this employee "))
      return;
  }
 
  return (
    <div className="p-5 flex gap-5 flex-col">
      <div className="flex justify-between">
      <div>
        <p className="bold text-md">Employees</p>
        <p className="bold text-sm">Manage your Team Members</p>
      </div>
      <div ><button className="flex px-3 py-2 bg-blue-500 text-white border rounded items-center gap-0.5  " onClick={()=>setShowCreateModel(true)}><Plus size={18}></Plus> Add Employee</button></div>
      </div>
      {/* search part  */}
      <div  className="flex  justify-between items-center gap-4 ">
        <div className="flex-1 items-center relative  justify-center ">
          <Search size={18} className=" absolute left-5 top-3"></Search>
          <input type="text " placeholder="Search Employees"  className="pl-12" value={search} onChange={(e)=>setsearch(e.target.value)}/>
        </div>
        <select value={selectdept} onChange={(e)=>setSelecteddept(e.target.value)} className="max-w-40 ">
          <option value="">All Departments</option>
          {DEPARTMENTS.map((dept,index)=>(<option key={dept} value={dept}>{dept}</option>))}
        </select>
      </div>
      {/* employee card */}
      <div>
      {filtered.length===0 ? (<Loading/>): 
     ( <div className="flex gap-2">{filtered.map((emp,index)=><EmployeeCard emp={emp} key={index} setonEdit={setonEdit} ondelete={ondelete}></EmployeeCard>)}</div>)
      }
      </div>
      {/* show the form for creating the employee and editing employees */}
      {showCreateModel &&
      (<div onClick={()=>setShowCreateModel(false)} className="fixed bg-black/40 backdrop-blur-sm inset-0 z-50 flex items-center justify-center p-4 ">
       <div onClick={(e)=>e.stopPropagation()} className="relative bg-white rounded-2xl shadow-2xl w-full  max-w-2xl my-8 animate-fade-in p-4"> <div className="flex  justify-between"><div><h2>Add New Employee</h2> <p>Create an employee account and profile</p>
        </div>
        <button onClick={()=>setShowCreateModel(false)}><XIcon></XIcon></button></div>
        <FormComp/></div>
      </div>)
       }
         {onedit &&
      (<div onClick={()=>setonEdit(false)} className="fixed bg-black/40 backdrop-blur-sm inset-0 z-50 flex items-center justify-center p-4 ">
       <div onClick={(e)=>e.stopPropagation()} className="relative bg-white rounded-2xl shadow-2xl w-full  max-w-2xl my-8 animate-fade-in p-4"> <div className="flex  justify-between"><div><h2>Edit Employee</h2> <p> Update Employee Details</p>
        </div>
        <button onClick={()=>setonEdit(false)}><XIcon></XIcon></button></div>
        <FormComp/></div>
      </div>)
       }
      
    </div>
  )
}

export default Employees
