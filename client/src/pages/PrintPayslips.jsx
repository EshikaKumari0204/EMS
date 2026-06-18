
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { dummyPayslipData } from "../assets/assets";
import Loading from "../Components/Loading";
import { format } from "date-fns";
import { PrinterIcon, BuildingIcon } from "lucide-react";
import api from "../api/axios";

const PrintPayslips = () => {
  const [payslip, setPayslip] = useState(null);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();
 

  const getPayslip = async () => {
    await api.get(`/payslips/${id}`).then((res)=>setPayslip(res.data.data)).catch(console.error).finally(()=>setLoading(false))
  };

  useEffect(() => {
    getPayslip();
   
  }, [id]);
 console.log(payslip)
  if (loading) return <Loading />;
  if (!payslip)
    return (
      <div className="flex items-center justify-center min-h-screen text-slate-400">
        Payslip not found
      </div>
    );

  const period = format(new Date(payslip.year, payslip.month - 1), "MMMM yyyy");

  return (
    <div className="min-h-screen bg-slate-50 flex items-start justify-center px-4 py-10 print:bg-white print:p-0">
      <div className="w-full max-w-2xl bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden print:shadow-none print:border-none print:rounded-none">

        {/* Top amber accent bar */}
        <div className="h-1.5 bg-amber-500 print:hidden" />

        <div className="p-8 flex flex-col gap-6">

          {/* Header */}
          <div className="flex flex-col items-center gap-1 text-center">
            <div className="w-10 h-10 bg-amber-100 rounded-xl flex items-center justify-center mb-1 print:hidden">
              <BuildingIcon size={20} className="text-amber-500" />
            </div>
            <p className="text-xs font-semibold tracking-widest text-slate-400 uppercase">
              WorkNest
            </p>
            <h1 className="text-2xl font-bold text-slate-700 tracking-tight">
              Payslip
            </h1>
            <p className="text-sm text-slate-400">{period}</p>
          </div>

          <hr className="border-slate-100" />

          {/* Employee Info */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex flex-col gap-0.5">
              <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                Employee Name
              </p>
              <p className="text-sm font-medium text-slate-700">
                {payslip.employee.firstName} {payslip.employee.lastName}
              </p>
            </div>
            <div className="flex flex-col gap-0.5 sm:text-right">
              <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                Position
              </p>
              <p className="text-sm font-medium text-slate-700">
                {payslip.employee.position}
              </p>
            </div>
            <div className="flex flex-col gap-0.5">
              <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                Email
              </p>
              <p className="text-sm font-medium text-slate-700">
                {payslip.employee.email}
              </p>
            </div>
            <div className="flex flex-col gap-0.5 sm:text-right">
              <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                Period
              </p>
              <p className="text-sm font-medium text-slate-700">{period}</p>
            </div>
          </div>

          <hr className="border-slate-100" />

          {/* Salary Breakdown */}
          <div className="flex flex-col gap-3">
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">
              Salary Breakdown
            </p>

            {[
              { label: "Basic Salary", value: payslip.basicSalary, muted: true },
              { label: "Allowances", value: payslip.allowances, muted: true },
              { label: "Deductions", value: `-${payslip.deductions}`, muted: true },
            ].map((row) => (
              <div key={row.label} className="flex justify-between items-center">
                <p className="text-sm text-slate-500">{row.label}</p>
                <p className="text-sm text-slate-600">
                  ${row.label === "Deductions" ? payslip.deductions.toLocaleString() : row.value.toLocaleString()}
                </p>
              </div>
            ))}

            <hr className="border-slate-100 my-1" />

            {/* Net Salary */}
            <div className="flex justify-between items-center bg-amber-50 border border-amber-100 rounded-xl px-4 py-3">
              <p className="text-sm font-semibold text-slate-700">Net Salary</p>
              <p className="text-lg font-bold text-amber-600">
                ${payslip.netSalary.toLocaleString()}
              </p>
            </div>
          </div>

          {/* Footer note */}
          <p className="text-xs text-slate-300 text-center">
            This is a system-generated payslip. No signature required.
          </p>

          {/* Print Button */}
          <button
            onClick={() => window.print()}
            className="flex items-center justify-center gap-2 px-6 py-2.5 bg-amber-500 hover:bg-amber-600 text-white text-sm font-medium rounded-lg transition-colors duration-200 mx-auto print:hidden"
          >
            <PrinterIcon size={16} />
            Print Payslip
          </button>

        </div>
      </div>
    </div>
  );
};

export default PrintPayslips;
