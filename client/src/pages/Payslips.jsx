
import { dummyEmployeeData, dummyPayslipData } from "../assets/assets";
import { useEffect, useState,useCallback } from "react";
import PayslipList from "../Components/Payslip/PayslipList";
import PayslipForm from "../Components/Payslip/PayslipForm";
import Loading from "../Components/Loading";

const Payslips = () => {
  const [payslips, setPayslips] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const isAdmin = true;

  const fetchPayslips = useCallback(async () => {
    setPayslips(dummyPayslipData);
  },[])

  useEffect(() => {
    fetchPayslips();
    setTimeout(() => setLoading(false), 1000);
  }, [fetchPayslips]);

  useEffect(() => {
    if (isAdmin) setEmployees(dummyEmployeeData);
  }, [isAdmin]);
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
