import {PencilIcon,Trash2Icon} from "lucide-react"
const EmployeeCard = ({emp,ondelete,setonEdit}) => {
  return (
    <div className="border rounded-md w-60 px-2 relative group">
      <div className="flex justify-center px-20 py-25 "><span className="rounded-full p-5 bg-gray-100 border border-none ">{emp.firstName[0]}{emp.lastName[0]}</span></div>
      <div className="absolute top-3 left-3 border border-none  bg-gray-100 rounded-md px-1 ">
        <span className="text-sm">{emp.department?emp.department:"Remote"}</span>
        {emp.isdeleted && <span>DELETED</span>}
      </div>
      {/* edit and delete feature */}
      <div className="inset-0 absolute opacity-0 group-hover:opacity-100 flex items-end justify-center pb-14 gap-3 transition">
        <button onClick={()=>setonEdit(true)}><PencilIcon size={18} className="text-green-950"></PencilIcon></button>
        <button onClick={ondelete}><Trash2Icon size={18} className="text-red-900"></Trash2Icon></button>
      </div>
      <div className="flex gap-1 flex-col ">
        <p className="text-md text-gray-500">{emp.firstName} {emp.lastName}</p>
        <p className="text-sm">{emp.position}</p>
      </div>
    </div>
  )
}
export default EmployeeCard
