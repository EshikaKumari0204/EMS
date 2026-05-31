import {useState,useEffect} from 'react'
import {Plus,X} from "lucide-react"
const PayslipForm = ({employees,onSuccess}) => {
  const [isOpen,setIsOpen]=useState(false)
  if(!isOpen){
    return <button onClick={()=>setIsOpen(true)}className="flex gap-0.5 px-3 py-2 bg-blue-500 text-white border rounded items-center"><Plus/>Generate Payslip</button>
  }
  else 
  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex justify-center items-center z-50 p-4 ">
      <div className="max-w-lg w-full p-6 animate-slide-up bg-white rounded-lg flex flex-col gap-3 justify-center">
      <div className="flex justify-between items-center mb-6 ">
        <h3>Generate Monthly Slip</h3>
        <button onClick={()=>setIsOpen(false)}> <X/></button>
      </div>
      <label htmlFor="">Employee</label>
      <select name="" id="">
        {employees.map((emp,index)=>(<option>{emp.firstName}{emp.lastName}{emp.position}</option>))}
      </select>
      <div className="flex justify-between">
        <div>  <label htmlFor="">Month</label>
      <select name="month" id="">
        {Array.from({length:12},(_,i)=>i+1).map((m)=>(<option>{m}</option>))}
      </select></div>
      <div>  <label htmlFor="">Year</label>
      <input type="number" defaultValue={new Date().getFullYear()} />
      </div>
      </div>
      <label htmlFor="">Basic Salary</label>
      <input type="number" placeholder="5000" defaultValue="0"/>
      <div className="flex justify-between"><div><label htmlFor="">Allowances</label>
      <input type="number" placeholder="0" defaultValue="0"/></div>
      <div><label htmlFor="">Deductions</label>
      <input type="number" placeholder="0" defaultValue="0"/></div></div>
      <div class="flex justify-end"><button className="px-2 ">Cancel</button> <button className="px-2 py-2  bg-blue-500 text-white border rounded ">Generate</button></div>
      </div>
    </div>
  )
}

export default PayslipForm
