import {UsersIcon,Building2Icon,FileTextIcon} from "lucide-react"
const Admindb = ({data}) => {
  const cards=[{icon:UsersIcon,value:data.totalEmployees,title:"Total Employees ",subtitle:"Active Workforce "},{icon:Building2Icon,value:data.totalDepartments,title:"Departments  ",subtitle:"Organisation units"},{icon:FileTextIcon,value:data.pendingLeaves,title:"Pending Leaves ",subtitle:"Awaiting Approval "}]
  return (
    <div className="px-2">
      <p>Dashboard</p>
      <p>Welcome back Admin - here's your overview </p>
      <div className="flex justify-between mt-8">{cards.map((card,index)=>(<div className="flex p-5 border rounded-md gap-4 text-sm items-center"><div><p>{card.title}</p><p className="font-bold text-xl">{card.value}</p></div><card.icon size={15}/></div>))}
    </div>
   
     </div>
  )
}

export default Admindb
