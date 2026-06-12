import { format } from "date-fns";
import {useState} from "react"
import {Loader2,Check,Trash} from "lucide-react"
const LeaveHistory = ({isAdmin,leaves,onUpdate}) => {
  const [processing,setprocessing]=useState("")
  const statusUpdate=(id,status)=>{
    setprocessing(id)
  }
  return (
      <div className="mt-6 overflow-x-auto">
      <table className="w-full text-sm text-left border-collapse">
        <thead className="bg-gray-100 text-gray-600 uppercase text-xs">
          <tr>
            {isAdmin && (
              <th className="px-4 py-3 border-b">Employee</th>
            )}
            <th className="px-4 py-3 border-b">Type</th>
            <th className="px-4 py-3 border-b">Dates</th>
            <th className="px-4 py-3 border-b">Reason</th>
            <th className="px-4 py-3 border-b">Status</th>
            {isAdmin && (
              <th className="px-4 py-3 border-b">Action</th>
            )}
          </tr>
        </thead>

        <tbody>
          {leaves.map((leave, index) => (
            <tr
              key={leave._id || index}
              className="border-b hover:bg-gray-50 transition-colors"
            >
              {isAdmin && (
                <td className="px-4 py-3">
                  {leave.employee?.firstName}
                </td>
              )}
              <td className="px-4 py-3">{leave.type}</td>
              <td className="px-4 py-3">
                {format(new Date(leave.startDate), "MMM dd")} -{" "}
                {format(new Date(leave.endDate), "MMM dd")}
              </td>
              <td className="px-4 py-3">{leave.reason}</td>
              <td className="px-4 py-3">
                <span className={`px-2 py-1 rounded-full text-xs font-semibold
                  ${leave.status === "APPROVED" 
                    ? "bg-green-100 text-green-700"
                    : leave.status === "REJECTED"
                    ? "bg-red-100 text-red-700"
                    : "bg-yellow-100 text-yellow-700"
                  }`}>
                  {leave.status}
                </span>
              </td>
              {isAdmin && (
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2">
                    <button  disabled={!!processing}
                      onClick={() => statusUpdate(
                        leave.id || leave._id, "APPROVED"
                      )}
                      className="p-1 rounded hover:bg-green-100 
                        text-green-600 transition-colors"
                    >
                      {processing === (leave.id || leave._id)
                        ? <Loader2 size={20} className="animate-spin"/>
                        : <Check size={20}/>
                      }
                    </button>
                    <button
                      onClick={() => statusUpdate(
                        leave.id || leave._id, "REJECTED"
                      )}
                      className="p-1 rounded hover:bg-red-100 
                        text-red-600 transition-colors" disabled={!!processing}
                    >
                      {processing === (leave.id || leave._id)
                        ? <Loader2 size={20} className="animate-spin"/>
                        : <Trash size={20}/>
                      }
                    </button>
                  </div>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
  


export default LeaveHistory
