import { Link } from "react-router-dom";
import { CalendarIcon, FileTextIcon, DollarSignIcon } from "lucide-react";

const Employeedb = ({ data }) => {
  const cards = [
    {
      icon: CalendarIcon,
      value: data.currentMonthAttendance,
      title: "Days Present",
      subtitle: "This month"
     
    },
    {
      icon: FileTextIcon,
      value: data.pendingLeaves,
      title: "Pending Leaves",
      subtitle: "Awaiting approval"
    
    },
    {
      icon: DollarSignIcon,
      value: data.latestPayslip
        ? `$${data.latestPayslip.netSalary?.toLocaleString()}`
        : "N/A",
      title: "Latest Payslip",
      subtitle: "Most recent payout"
     
    },
  ];

  return (
    <div className="px-4 sm:px-8 py-6 max-w-5xl w-full">

   
      <div className="mb-8">
        <h1 className="text-2xl sm:text-3xl font-semibold text-slate-700">
          Welcome, {data.employee.firstName}!
        </h1>
        <p className="text-sm sm:text-base text-slate-400 mt-1">
          {data.employee.position} · {data.employee.department}
        </p>
      </div>

      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
        {cards.map((card, index) => {
          const Icon = card.icon;
          return (
            <div
              key={index}
              className="flex items-center justify-between border border-slate-100 rounded-xl p-5 shadow-sm hover:shadow-md transition-shadow bg-white"
            >
              <div>
                <p className="text-sm text-slate-400">{card.title}</p>
                <p className="text-2xl font-bold text-slate-700 mt-1">
                  {card.value}
                </p>
                <p className="text-xs text-slate-300 mt-0.5">{card.subtitle}</p>
              </div>
              <div className={`p-3 rounded-xl bg-amber-50 text-amber-500`}>
                <Icon size={20} />
              </div>
            </div>
          );
        })}
      </div>

     
      <div className="flex flex-col sm:flex-row gap-3">
        <Link
          to="/attendance"
          className="px-6 py-2.5 bg-amber-500 hover:bg-amber-600 text-white text-sm font-medium rounded-lg text-center transition-colors duration-200"
        >
          Mark Attendance
        </Link>
        <Link
          to="/leave"
          className="px-6 py-2.5 border border-slate-300 hover:border-amber-400 hover:text-amber-500 text-slate-600 text-sm font-medium rounded-lg text-center transition-colors duration-200"
        >
          Apply for Leave
        </Link>
      </div>
    </div>
  );
};

export default Employeedb;

