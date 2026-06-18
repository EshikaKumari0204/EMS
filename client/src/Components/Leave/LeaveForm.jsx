
import { useState } from "react";
import { FileText, CalendarDays, Loader2, Send } from "lucide-react";
import api from "../../api/axios";
import {toast} from "react-hot-toast"
const inputClass = "w-full px-3 py-2.5 border border-slate-200 rounded-lg text-sm text-slate-700 placeholder-slate-300 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent transition";

const LeaveForm = ({ onClose, onSuccess ,open}) => {
  const [loading, setLoading] = useState(false);

  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(today.getDate() + 1);
  const minDate = tomorrow.toISOString().split("T")[0];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const formData=new FormData(e.currentTarget)
    const data=Object.fromEntries(formData.entries())
    try {
      await api.post("/leaves",data)
      onSuccess()
      onClose()
    } catch (error) {
         toast.error(error.response?.data?.error||error.message)
    }
  };
  if(!open) return null;

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5">

      {/* Leave Type */}
      <div className="flex flex-col gap-1.5">
        <label className="flex items-center gap-2 text-sm font-medium text-slate-700">
          <FileText size={15} className="text-slate-400" />
          Leave Type
        </label>
        <select name="type" required className={inputClass}>
          <option value="SICK">Sick Leave</option>
          <option value="CASUAL">Casual Leave</option>
          <option value="ANNUAL">Annual Leave</option>
        </select>
      </div>

      {/* Duration */}
      <div className="flex flex-col gap-1.5">
        <label className="flex items-center gap-2 text-sm font-medium text-slate-700">
          <CalendarDays size={15} className="text-slate-400" />
          Duration
        </label>
        <div className="grid grid-cols-2 gap-3">
          <div className="flex flex-col gap-1">
            <span className="text-xs text-slate-400">From</span>
            <input
              type="date"
              name="startDate"
              required
              min={minDate}
              className={inputClass}
            />
          </div>
          <div className="flex flex-col gap-1">
            <span className="text-xs text-slate-400">To</span>
            <input
              type="date"
              name="endDate"
              required
              min={minDate}
              className={inputClass}
            />
          </div>
        </div>
      </div>

      {/* Reason */}
      <div className="flex flex-col gap-1.5">
        <label className="text-sm font-medium text-slate-700">Reason</label>
        <textarea
          name="reason"
          required
          rows={3}
          placeholder="Briefly describe why you need this leave..."
          className={`${inputClass} resize-none`}
        />
      </div>

      {/* Buttons */}
      <div className="flex flex-col-reverse sm:flex-row gap-3 pt-1">
        <button
          type="button"
          onClick={onClose}
          className="w-full sm:w-auto flex-1 px-4 py-2.5 border border-slate-200 text-slate-600 hover:bg-slate-50 text-sm font-medium rounded-lg transition-colors duration-200"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={loading}
          className="w-full sm:w-auto flex-1 px-4 py-2.5 bg-amber-500 hover:bg-amber-600 disabled:opacity-60 disabled:cursor-not-allowed text-white text-sm font-medium rounded-lg flex items-center justify-center gap-2 transition-colors duration-200"
        >
          {loading ? (
            <Loader2 size={16} className="animate-spin" />
          ) : (
            <Send size={16} />
          )}
          {loading ? "Submitting..." : "Submit Request"}
        </button>
      </div>

    </form>
  );
};

export default LeaveForm;

