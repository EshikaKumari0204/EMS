
import { CalendarIcon, AlertCircleIcon, ClockIcon } from "lucide-react";

const Attendancestats = ({ history }) => {
  const totalLate = history.filter((h) => h.status === "LATE").length;
  const totalPresent = history.filter((h) => h.status === "PRESENT").length;

  const stats = [
    { label: "Days Present", value: totalPresent, icon: CalendarIcon },
    { label: "Late Arrivals", value: totalLate, icon: AlertCircleIcon },
    { label: "Avg Work Hours", value: "8.5hrs", icon: ClockIcon },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
      {stats.map((s) => {
        const Icon = s.icon;
        return (
          <div
            key={s.label}
            className="relative flex items-center gap-4 p-5 bg-white border border-slate-100 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-200 overflow-hidden group"
          >
            {/* Left accent bar */}
            <div className={`absolute left-0 top-0 bottom-0 w-1 rounded-r-full bg-amber-400`} />

            {/* Icon badge */}
            <div className={`p-3 rounded-xl shrink-0 bg-amber-50 text-amber-500`}>
              <Icon size={20} />
            </div>

            {/* Text */}
            <div>
              <p className="text-sm text-slate-400">{s.label}</p>
              <p className="text-2xl font-semibold text-slate-700 tracking-tight">
                {s.value}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Attendancestats;
