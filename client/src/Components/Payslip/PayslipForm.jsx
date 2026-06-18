
import { useState } from "react";
import { Plus, X, Loader2 } from "lucide-react";
import api from "../../api/axios";
import {toast} from "react-hot-toast"
const inputClass = "w-full px-3 py-2.5 border border-slate-200 rounded-lg text-sm text-slate-700 placeholder-slate-300 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent transition";
const labelClass = "text-sm font-medium text-slate-600";

const PayslipForm = ({ employees, onSuccess }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async(e) => {
    e.preventDefault();
    setLoading(true);
    const formdata=new FormData(e.currentTarget)
    const data=Object.fromEntries(formdata.entries())
    try {
      await api.post("/payslips",data)
      setIsOpen(false)
      onSuccess()
    } catch (error) {
        toast.error(error.response?.data?.error||error.message)
    }
    setLoading(false)
  };

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="flex items-center gap-2 px-4 py-2.5 bg-amber-500 hover:bg-amber-600 text-white text-sm font-medium rounded-lg transition-colors duration-200 self-start sm:self-auto"
      >
        <Plus size={16} />
        Generate Payslip
      </button>
    );
  }

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex justify-center items-center z-50 p-4">
      <div className="max-w-lg w-full bg-white rounded-2xl shadow-2xl max-h-[90vh] overflow-y-auto">

        {/* Modal Header */}
        <div className="flex items-start justify-between px-6 pt-6 pb-4 border-b border-slate-100">
          <div>
            <h3 className="text-lg font-semibold text-slate-700">
              Generate Monthly Payslip
            </h3>
            <p className="text-sm text-slate-400 mt-0.5">
              Fill in the details to generate a payslip
            </p>
          </div>
          <button
            onClick={() => setIsOpen(false)}
            className="text-slate-400 hover:text-slate-600 transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="px-6 py-5 flex flex-col gap-5">

          {/* Employee */}
          <div className="flex flex-col gap-1.5">
            <label className={labelClass}>Employee</label>
            <select name="employeeId" required className={inputClass}>
              <option value="">Select an employee</option>
              {employees.map((emp, index) => (
                <option key={index} value={emp.id}>
                  {emp.firstName} {emp.lastName} — {emp.position}
                </option>
              ))}
            </select>
          </div>

          {/* Month + Year */}
          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-1.5">
              <label className={labelClass}>Month</label>
              <select name="month" required className={inputClass}>
                {Array.from({ length: 12 }, (_, i) => i + 1).map((m) => (
                  <option key={m} value={m}>
                    {new Date(0, m - 1).toLocaleString("default", { month: "long" })}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex flex-col gap-1.5">
              <label className={labelClass}>Year</label>
              <input
                type="number"
                name="year"
                defaultValue={new Date().getFullYear()}
                className={inputClass}
              />
            </div>
          </div>

          {/* Basic Salary */}
          <div className="flex flex-col gap-1.5">
            <label className={labelClass}>Basic Salary</label>
            <input
              type="number"
              name="basicSalary"
              placeholder="5000"
              defaultValue="0"
              min="0"
              className={inputClass}
            />
          </div>

          {/* Allowances + Deductions */}
          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-1.5">
              <label className={labelClass}>Allowances</label>
              <input
                type="number"
                name="allowances"
                placeholder="0"
                defaultValue="0"
                min="0"
                className={inputClass}
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className={labelClass}>Deductions</label>
              <input
                type="number"
                name="deductions"
                placeholder="0"
                defaultValue="0"
                min="0"
                className={inputClass}
              />
            </div>
          </div>

          {/* Divider */}
          <div className="border-t border-slate-100" />

          {/* Buttons */}
          <div className="flex flex-col-reverse sm:flex-row gap-3 sm:justify-end">
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="w-full sm:w-auto px-5 py-2.5 border border-slate-200 text-slate-600 hover:bg-slate-50 text-sm font-medium rounded-lg transition-colors duration-200"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="w-full sm:w-auto px-5 py-2.5 bg-amber-500 hover:bg-amber-600 disabled:opacity-60 disabled:cursor-not-allowed text-white text-sm font-medium rounded-lg flex items-center justify-center gap-2 transition-colors duration-200"
            >
              {loading && <Loader2 size={16} className="animate-spin" />}
              {loading ? "Generating..." : "Generate Payslip"}
            </button>
          </div>

        </form>
      </div>
    </div>
  );
};

export default PayslipForm;