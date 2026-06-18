
import { dummyEmployeeData, dummyPayslipData } from "../assets/assets";
import { useEffect, useState,useCallback,useContext } from "react";
import PayslipList from "../Components/Payslip/PayslipList";
import PayslipForm from "../Components/Payslip/PayslipForm";
import Loading from "../Components/Loading";
import { AuthContext } from "../context/Authcontext";
import api from "../api/axios";
import {toast} from "react-hot-toast"
const Payslips = () => {
  const [payslips, setPayslips] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const {user}=useContext(AuthContext)
  const isAdmin = user?.role==="ADMIN"

  const fetchPayslips = useCallback(async () => {
   try {
    const res=await api.get("/payslips")
    setPayslips(res.data.data || [])
    
   } catch (error) {
      toast.error(error.response?.data?.error||error.message)
   }
   finally{
    setLoading(false)
   }
  },[])

  useEffect(() => {
    fetchPayslips();
    setTimeout(() => setLoading(false), 1000);
  }, [fetchPayslips]);

  useEffect(() => {
    if (isAdmin) api.get("/employees").then((res)=>setEmployees(res.data.filter((e)=>!e.isDeleted))).catch((error)=>{toast.error(error.response?.data?.error||error.message)}).finally(()=>setLoading(false))
   }
 

  
   
  , [isAdmin]);
if(loading) return (<Loading/>)
  return (
    <div className="px-4 sm:px-8 py-6 max-w-6xl w-full flex flex-col gap-6">

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-semibold text-slate-700">
            Payslips
          </h1>
          <p className="text-sm text-slate-400 mt-1">
            {isAdmin
              ? "Generate and manage employee payslips"
              : "Your payslip history"}
          </p>
        </div>
        {isAdmin && (
          <PayslipForm employees={employees} onSuccess={fetchPayslips} />
        )}
      </div>

      {/* Payslip Table */}
      <PayslipList isAdmin={isAdmin} payslips={payslips} />

    </div>
  );
};

export default Payslips;
