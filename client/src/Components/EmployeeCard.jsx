import {PencilIcon,Trash2Icon} from "lucide-react"
import {toast} from "react-hot-toast"
import api from "../api/axios";
const EmployeeCard = ({emp,ondelete,setonEdit}) => {
  const delete_emp=async()=>{
    if(!confirm("Are you sure you want to delete this employee "))
      return;
    try {
      await api.delete(`/employees/${emp.id}`)
      ondelete()
    } catch (error) {
         toast.error(error.response?.data?.error||error.message)
      

    }}

  return (
    <div className="border rounded-md w-60 px-2 relative group">
      <div className="flex justify-center px-20 py-25 "><span className="rounded-full p-7 bg-gray-100 border border-none text-xl ">{emp.firstName[0]}{emp.lastName[0]}</span></div>
     <div className="absolute top-3 left-3 bg-gray-100 rounded-md px-1.5 py-0.5">
    <span className="text-xs text-gray-600">{emp.department ? emp.department : "Remote"}</span>
  </div>

  {/* DELETED badge — top right, separate from department */}
  {emp.isDeleted && (
    <div className="absolute top-3 right-3 bg-red-100 rounded-md px-1.5 py-0.5">
      <span className="text-xs text-red-600 font-medium">DELETED</span>
    </div>
  )}
      {/* edit and delete feature */}
      <div className="inset-0 absolute opacity-0 group-hover:opacity-100 flex items-end justify-center pb-14 gap-3 transition">
       {!emp.isDeleted && (<button onClick={setonEdit}><PencilIcon size={18} className="text-green-950"></PencilIcon></button>)} 
        <button onClick={delete_emp}><Trash2Icon size={18} className="text-red-900"></Trash2Icon></button>
      </div>
      <div className="flex gap-1 flex-col items-center ">
        <p className="text-md text-gray-500">{emp.firstName} {emp.lastName}</p>
        <p className="text-sm ">{emp.position}</p>
      </div>
    </div>
  )
}

export default EmployeeCard
