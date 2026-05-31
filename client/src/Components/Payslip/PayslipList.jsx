import {format} from "date-fns"
import { Download } from 'lucide-react';
const PayslipList = ({isAdmin,payslips}) => {
  return (
    <div>
      <table className="flex gap-2 flex-col ">
        <tr className="flex justify-between items-center">
         {isAdmin && <th>Employee</th>} 
           <th>Period</th>
            <th>Basic Salary</th>
             <th>Net Salary</th>
              <th>Action</th>
               
        </tr>
        {payslips.map((slip,index)=>(<tr className="flex justify-between items-center" key={index}><td className="text-center">{slip.employee.firstName} {slip.employee.lastName}</td><td className="text-center">{format(new Date(slip.year,slip.month-1),"MMMM yyyy")}</td><td className="text-center">${slip.basicSalary}</td><td className="text-center">${slip.netSalary}</td><td className="text-center"><button className="flex items-center gap-2"><Download size={15}/>Download</button></td></tr>))}
      </table>
      
    </div>
  )
}

export default PayslipList
