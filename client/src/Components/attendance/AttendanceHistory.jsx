

import { getWorkingHoursDisplay, getDayTypeDisplay } from "../../assets/assets";
import { format } from "date-fns";

const statusStyles = {
  PRESENT: "bg-green-50 text-green-600 border border-green-200",
  LATE: "bg-amber-50 text-amber-600 border border-amber-200",
  ABSENT: "bg-red-50 text-red-600 border border-red-200",
};

const AttendanceHistory = ({ history }) => {
  return (
    <div className="bg-white border border-slate-100 rounded-xl shadow-sm overflow-hidden">

      {/* Header */}
      <div className="px-5 py-4 border-b border-slate-100">
        <h3 className="font-semibold text-slate-700">Recent Activity</h3>
        <p className="text-xs text-slate-400 mt-0.5">Your attendance log</p>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-slate-50 text-left">
              <th className="px-5 py-3 text-xs font-semibold text-slate-400 uppercase tracking-wider whitespace-nowrap">Date</th>
              <th className="px-5 py-3 text-xs font-semibold text-slate-400 uppercase tracking-wider whitespace-nowrap">Check-In</th>
              <th className="px-5 py-3 text-xs font-semibold text-slate-400 uppercase tracking-wider whitespace-nowrap">Check-Out</th>
              <th className="px-5 py-3 text-xs font-semibold text-slate-400 uppercase tracking-wider whitespace-nowrap">Working Hours</th>
              <th className="px-5 py-3 text-xs font-semibold text-slate-400 uppercase tracking-wider whitespace-nowrap">Day Type</th>
              <th className="px-5 py-3 text-xs font-semibold text-slate-400 uppercase tracking-wider whitespace-nowrap">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {history.length === 0 ? (
              <tr>
                <td colSpan={6} className="text-center py-12 text-slate-400 text-sm">
                  No records found
                </td>
              </tr>
            ) : (
              history.map((h) => {
                const dayType = getDayTypeDisplay(h);
                return (
                  <tr
                    key={h._id || h.id}
                    className="hover:bg-slate-50 transition-colors duration-150"
                  >
                    <td className="px-5 py-3.5 text-slate-700 font-medium whitespace-nowrap">
                      {format(new Date(h.date), "MMM dd, yyyy")}
                    </td>
                    <td className="px-5 py-3.5 text-slate-500 whitespace-nowrap">
                      {h.checkIn ? format(new Date(h.checkIn), "hh:mm a") : "-"}
                    </td>
                    <td className="px-5 py-3.5 text-slate-500 whitespace-nowrap">
                      {h.checkOut ? format(new Date(h.checkOut), "hh:mm a") : "-"}
                    </td>
                    <td className="px-5 py-3.5 text-slate-500 whitespace-nowrap">
                      {getWorkingHoursDisplay(h)}
                    </td>
                    <td className="px-5 py-3.5 text-slate-500 whitespace-nowrap">
                      {dayType.label !== "-" ? (
                        <span className="px-2.5 py-1 bg-slate-100 text-slate-600 rounded-full text-xs font-medium">
                          {dayType.label}
                        </span>
                      ) : "-"}
                    </td>
                    <td className="px-5 py-3.5 whitespace-nowrap">
                      <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${statusStyles[h.status] || "bg-slate-100 text-slate-600"}`}>
                        {h.status}
                      </span>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AttendanceHistory;