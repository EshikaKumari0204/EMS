

import { Loader2Icon, LogInIcon, LogOutIcon } from "lucide-react";
import { useState } from "react";
import api from "../../api/axios";
import {toast} from "react-hot-toast"
const Checkin = ({ todayrecord, onAction }) => {
  const [loading, setLoading] = useState(false);

  const handleAttendance =async () => {
    setLoading(true);
    try {
      await api.post("/attendance")
      onAction()
    } catch (error) {
         toast.error(error.response?.data?.error||error.message)
    }
    setLoading(false)
  };

  // Work day completed state
  if (todayrecord?.checkOut)
    return (
      <div className="flex flex-col items-center justify-center p-6 sm:p-8 bg-slate-50 border border-slate-200 rounded-2xl text-center">
        <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-3">
          <LogOutIcon size={22} className="text-green-500" />
        </div>
        <p className="text-base font-semibold text-slate-700">
          Work day completed
        </p>
        <p className="text-sm text-slate-400 mt-1">
          See you tomorrow. Have a good day ahead!
        </p>
      </div>
    );

  const isCheckedIn = !!todayrecord?.checkIn;
  

  return (
    <div className="fixed bottom-5 right-5 z-40 sm:bottom-6 sm:right-6">
      <button
        onClick={handleAttendance}
        disabled={loading}
        className={`flex items-center gap-4 px-5 py-3.5 rounded-2xl shadow-lg text-white transition-all duration-200 disabled:opacity-70 disabled:cursor-not-allowed
          ${isCheckedIn
            ? "bg-gradient-to-br from-slate-700 to-slate-900 hover:from-slate-600 hover:to-slate-800"
            : "bg-gradient-to-br from-amber-500 to-amber-700 hover:from-amber-400 hover:to-amber-600"
          }`}
      >
        {/* Icon */}
        <div className="shrink-0">
          {loading ? (
            <Loader2Icon size={22} className="animate-spin" />
          ) : isCheckedIn ? (
            <LogOutIcon size={22} />
          ) : (
            <LogInIcon size={22} />
          )}
        </div>

        {/* Text */}
        <div className="flex flex-col items-start">
          <span className="text-sm font-semibold leading-tight">
            {loading ? "Processing..." : isCheckedIn ? "Check Out" : "Check In"}
          </span>
          <span className="text-xs opacity-75 mt-0.5">
            {isCheckedIn ? "End your shift" : "Start your work day"}
          </span>
        </div>
      </button>
    </div>
  );
};

export default Checkin;
