
import {toast} from "react-hot-toast"
import { dummyAttendanceData } from "../assets/assets";
import { useState, useEffect, useCallback } from "react";
import Loading from "../Components/Loading";
import Checkin from "../Components/attendance/Checkin";
import Attendancestats from "../Components/attendance/Attendancestats";
import AttendanceHistory from "../Components/attendance/AttendanceHistory";
import { AlertCircleIcon } from "lucide-react";
import api from "../api/axios";

const Attendance = () => {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isDeleted, setIsDeleted] = useState(false);

  const fetchData = useCallback(async () => {
    try {
      const res=await api.get("/attendance")
      const json=res.data
      setHistory(json.data || [])
      if(json?.employee?.isDeleted) setIsDeleted(true)
      
    } catch (error) {
         toast.error(error.response?.data?.error||error.message)
    }
    finally{
      setLoading(false)
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  if (loading) return <Loading />;

  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const todayRecord = history.find(
    (r) => new Date(r.date).toDateString() === today.toDateString()
  );

  return (
    <div className="px-4 sm:px-8 py-6 max-w-5xl w-full flex flex-col gap-6">

      {/* Header */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-semibold text-slate-700">
          Attendance
        </h1>
        <p className="text-sm text-slate-400 mt-1">
          Daily check-ins and work hours
        </p>
      </div>

      {/* Deleted employee banner */}
      {isDeleted ? (
        <div className="flex items-center gap-3 bg-red-50 border border-red-200 text-red-600 text-sm rounded-xl px-4 py-3">
          <AlertCircleIcon size={18} className="shrink-0" />
          <p>
            Unable to check in or out — this employee record has been deleted.
          </p>
        </div>
      ) : (
        <Checkin todayrecord={todayRecord} onAction={fetchData} />
      )}

      <Attendancestats history={history} />
      <AttendanceHistory history={history} />
    </div>
  );
};

export default Attendance;