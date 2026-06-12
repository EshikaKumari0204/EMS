

import { UsersIcon, Building2Icon, FileTextIcon, CalendarIcon } from "lucide-react";

const Admindb = ({ data }) => {
  const cards = [
    {
      icon: UsersIcon,
      value: data.totalEmployees,
      title: "Total Employees",
      subtitle: "Active workforce",
     
    },
    {
      icon: Building2Icon,
      value: data.totalDepartments,
      title: "Departments",
      subtitle: "Organisation units",
   
    },
    {
      icon: CalendarIcon,
      value: data.todayAttendance,
      title: "Today's Attendance",
      subtitle: "Checked in today",
     
    },
    {
      icon: FileTextIcon,
      value: data.pendingLeaves,
      title: "Pending Leaves",
      subtitle: "Awaiting approval",
   
    },
  ];

  return (
    <div className="px-4 sm:px-8 py-6 max-w-6xl w-full">

     
      <div className="mb-8">
        <h1 className="text-2xl sm:text-3xl font-semibold text-slate-700">
          Dashboard
        </h1>
        <p className="text-sm sm:text-base text-slate-400 mt-1">
          Welcome back, Admin — here's your overview
        </p>
      </div>

   
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {cards.map((card, index) => {
          const Icon = card.icon;
          return (
            <div
              key={index}
              className="flex items-center justify-between border border-slate-100 rounded-xl p-5 bg-white shadow-sm hover:shadow-md transition-shadow"
            >
              <div>
                <p className="text-sm text-slate-400">{card.title}</p>
                <p className="text-2xl font-bold text-slate-700 mt-1">
                  {card.value}
                </p>
                <p className="text-xs text-slate-300 mt-0.5">{card.subtitle}</p>
              </div>
              <div className={`p-3 rounded-xl shrink-0 bg-amber-50 text-amber-500`}>
                <Icon size={20} />
              </div>
            </div>
          );
        })}
      </div>

    </div>
  );
};

export default Admindb;