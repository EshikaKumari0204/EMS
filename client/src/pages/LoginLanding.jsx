import Loginleft from "../Components/Loginleft";
import { ArrowRightIcon, ShieldIcon, UserIcon } from "lucide-react";
import { Link } from "react-router-dom";

const LoginLanding = () => {
  const portals = [
    {
      to: "/login/admin",
      title: "Admin Portal",
      description: "Manage employees, departments, payroll and system configuration",
      icon: ShieldIcon,
    },
    {
      to: "/login/employee",
      title: "Employee Portal",
      description: "View your profile, track attendance, request time off and access payslips",
      icon: UserIcon,
    },
  ];

  return (
    <div className="flex flex-col md:flex-row min-h-screen w-screen">
      <Loginleft />

     
      <div className="flex flex-col justify-center min-h-screen items-center items-center px-6 sm:px-12 py-12 w-full md:w-1/2 text-slate-600">
        
       
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-semibold text-slate-700 mb-2">
            Welcome Back
          </h1>
          <p className="text-slate-400 text-sm sm:text-base">
            Select your portal to securely access the system
          </p>
        </div>

       
        <div className="flex flex-col gap-4 w-full max-w-md">
          {portals.map((portal, index) => {
            const Icon = portal.icon;
            return (
              <Link to={portal.to} key={index}>
                <div className="flex items-center justify-between border border-slate-200 rounded-xl p-4 hover:border-amber-400 hover:shadow-md transition-all duration-200 cursor-pointer group">
                  <div className="flex items-center gap-4">
                    <div className="bg-amber-50 p-2 rounded-lg">
                      <Icon size={20} className="text-amber-500" />
                    </div>
                    <div>
                      <h3 className="font-medium text-slate-700 text-sm sm:text-base">
                        {portal.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-slate-400 mt-0.5">
                        {portal.description}
                      </p>
                    </div>
                  </div>
                  <ArrowRightIcon
                    size={18}
                    className="text-slate-400 group-hover:text-amber-500 group-hover:translate-x-1 transition-all duration-200 shrink-0 ml-3"
                  />
                </div>
              </Link>
            );
          })}
        </div>

        
        <p className="mt-12 text-xs text-slate-300">
          &copy; {new Date().getFullYear()} WorkNest. All rights reserved.
        </p>
      </div>
    </div>
  );
};

export default LoginLanding;
