import {dummyEmployeeData, dummyPayslipData} from "../assets/assets"
import {useEffect,useState} from "react"
import PayslipList from "../Components/Payslip/PayslipList"
import PayslipForm from "../Components/Payslip/PayslipForm"
const Payslips = () => {
  const [payslips,setPayslips]=useState([])
  const [employees,setEmployees]=useState([])
  const [loading,setLoading]=useState(true)
  const isAdmin=true;
  const fetchpayslips=async()=>{
    setPayslips(dummyPayslipData)
  }
  useEffect(()=>{
    fetchpayslips()
     setTimeout(()=>{
      setLoading(false)
    },1000)
  },[])
  useEffect(()=>{
  if(isAdmin) setEmployees(dummyEmployeeData)
  },[isAdmin])
  return (
    <div>
      <div className="flex justify-between mb-4">
      <div><h1>Payslips</h1>
        <h2>{isAdmin?"Generate and Manage employee Payslip":"Your Payslip History"}</h2></div>
          {isAdmin && <PayslipForm employees={employees} onSuccess={fetchpayslips} />} 
      </div>
      <PayslipList isAdmin={isAdmin} payslips={payslips}/>
    </div>
  )
}
export default Payslips
