import {useEffect,useState,} from 'react'
import {useParams} from 'react-router-dom'
import { dummyPayslipData } from '../assets/assets'
import { dummyProfileData } from '../assets/assets'
import Loading from '../Components/Loading'
import {format} from "date-fns"
const PrintPayslips = () => {
  const [payslip,setPayslip]=useState([])
  const [loading,setloading]=useState(true)
  const {id}=useParams()
  console.log(id,dummyPayslipData)
  const getpayslip=async()=>{
    setPayslip(dummyPayslipData.find((data)=>data._id===id))
  }
  useEffect(()=>{
    getpayslip(dummyProfileData)
    setTimeout(()=>setloading(false),1000)
  },[id])
    console.log(payslip)
if(loading) return <Loading/>
if(!payslip) return <div>Payslip not found</div>
else 
  return (
    <div className="flex flex-col gap-3 max-w-2xl mx-auto p-8 bg-white ">
      <div>
        <h1 className="text-center">PAYSLIP</h1>
        <h2 className="text-center">{payslip?.year && payslip?.month ?format(new Date(payslip.year,payslip.month-1),"MMMM yyyy"):""}</h2>

      </div>
      <hr />
      <div className="flex justify-between">
        <div className="flex flex-col "><h2>Employee Name</h2> <h2>{payslip.employee.firstName} {payslip.employee.lastName}</h2></div>
         <div className="flex flex-col"><h2>Position</h2> <h2>{payslip.employee.position} </h2></div>
      </div>
       <div className="flex justify-between">
        <div className="flex flex-col "><h2>Email</h2> <h2>{payslip.employee.email} </h2></div>
         <div className="flex flex-col"><h2>Period</h2> <h2>{format(new Date(payslip.year,payslip.month-1),"MMMM yyyy")} </h2></div>
      </div>
      <div className="flex flex-col">
        <div className="flex justify-between">
          <h1 >Basic Salary</h1>
          <h1 >${payslip.basicSalary}</h1>
        </div>
        <div className="flex justify-between">
          <h1>Allowances</h1>
          <h1>${payslip.allowances}</h1>
        </div>
        <div className="flex justify-between">
          <h1>Deductions</h1>
          <h1>${payslip.deductions}</h1>
        </div><hr />
        <div className="flex justify-between">
          <h1>Net Salary</h1>
          <h1>${payslip.netSalary}</h1>
        </div>

      </div>
      <button className="px-6 py-2 mt-3 bg-blue-500 text-white border rounded mx-auto"onClick={()=>window.print()}>Print</button>
     
    </div>
  )
}

export default PrintPayslips
