import {Link} from "react-router-dom"
import {CalendarIcon,FileTextIcon,DollarSignIcon} from "lucide-react"
const Employeedb = ({data}) => {
 
  const cards=[{icon:CalendarIcon,value:data.currentMonthAttendance,title:"Days Present",subtitle:"This Month"},{icon:FileTextIcon,value:data.pendingLeaves,title:"Pending Leaves ",subtitle:"Awaiting Approval"},{icon:DollarSignIcon,value:data.latestPayslip?`$${data.latestPayslip.netSalary?.toLocaleString()}`:"N/A",title:"Latest payslip",subtitle:"Most Recent Payout"}]
  return (
    <div className="px-2">
      <p>Welcome, {data.employee.firstName}!</p>
      <p>{data.employee.position},{data.employee.department}</p>
      <div className="flex justify-between mt-8">{cards.map((card,index)=>(<div className="flex p-5 border rounded-md gap-4 text-sm items-center"><div><p>{card.title}</p><p className="font-bold text-xl">{card.value}</p></div><card.icon size={15}/></div>))}
    </div>
    <div className="flex gap-2 mt-4"><Link to="/attendance" className="px-4 py-3 bg-blue-500 text-white border rounded  ">Mark Attendance </Link>
     <Link to="/leave" className="px-4 py-3 border-gray-600  border rounded  ">Apply for Leave</Link></div>
     </div>
  )
}

export default Employeedb
