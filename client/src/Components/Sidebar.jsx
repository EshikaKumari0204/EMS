import { useState, useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import { dummyProfileData } from "../assets/assets";
import {
  MenuIcon, UserIcon, XIcon, LayoutGridIcon, SettingsIcon,
  FileTextIcon, DollarSignIcon, CalendarIcon, ChevronRightIcon, LogOutIcon,
} from "lucide-react";

const Sidebar = () => {
  const { pathname } = useLocation();
  const [username, setUsername] = useState("");
  const [mobileOpen, setMobileOpen] = useState(false);
  const role = "EMPLOYEE"  || "EMPLOYEE";

  const logout = () => {
    window.location.href = "/login";
  };

  const navlinks = [
    { name: "Dashboard", href: "/dashboard", icon: LayoutGridIcon },
    role === "ADMIN"
      ? { name: "Employees", href: "/employees", icon: UserIcon }
      : { name: "Attendance", href: "/attendance", icon: CalendarIcon },
    { name: "Leave", href: "/leave", icon: FileTextIcon },
    { name: "Payslips", href: "/payslips", icon: DollarSignIcon },
    { name: "Settings", href: "/settings", icon: SettingsIcon },
  ];

  useEffect(() => {
    setUsername(dummyProfileData.firstName + " " + dummyProfileData.lastName);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  const SidebarContent = (
    <div className="flex flex-col h-full p-3   gap-6 ">

      
      <div className="flex items-center justify-between px-2">
        <div className="flex gap-3 items-center">
          <UserIcon size={28} />
          <div >
            <p className="text-base font-semibold leading-tight ">WorkNest</p>
            <p className="text-xs text-amber-100 ">Employee Management System</p>
          </div>
        </div>
        <button
          className="lg:hidden text-white hover:text-amber-200 transition-colors"
          onClick={() => setMobileOpen(false)}
        >
          <XIcon size={20} />
        </button>
      </div>

   
      <div className="flex gap-3 items-center bg-amber-600/40 rounded-xl px-3 py-2.5">
        <span className="bg-amber-400 rounded-lg w-10 h-10 flex items-center justify-center font-semibold text-white shrink-0">
          {dummyProfileData.firstName.charAt(0).toUpperCase()}
        </span>
        <div className="flex flex-col min-w-0">
          <p className="text-sm font-medium truncate">{username}</p>
          <p className="text-xs text-amber-100">{role}</p>
        </div>
      </div>

      
      <p className="text-xs  text-white font-semibold tracking-widest  uppercase px-1">
        Navigation
      </p>

    
      <nav className="flex flex-col gap-1">
        {navlinks.map((link, index) => {
          const isActive = pathname.startsWith(link.href);
          return (
            <Link
              key={index}
              to={link.href}
              className={`relative flex items-center justify-between px-3 py-2.5 rounded-lg transition-all duration-150 ${
                isActive
                  ? "bg-white/15 text-white font-medium"
                  : "text-amber-100 hover:bg-white/10 hover:text-white"
              }`}
            >
             
              {isActive && (
                <div className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-5 rounded-r-full bg-white" />
              )}
              <div className="flex items-center gap-3 pl-1">
                <link.icon size={18} className="text-white font-bold" />
                <span className="text-sm text-white font-semibold">{link.name}</span>
              </div>
              {isActive && <ChevronRightIcon size={16} />}
            </Link>
          );
        })}
      </nav>

      
      <button
        onClick={logout}
        className="flex items-center gap-3 mt-auto px-3 py-2.5 rounded-lg text-amber-100 hover:bg-white/10 hover:text-white transition-all duration-150 w-full text-sm"
      >
        <LogOutIcon size={18} />
        <span>Logout</span>
      </button>

    </div>
  );

  return (
    <>
    
      <button
        onClick={() => setMobileOpen(true)}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-amber-500 text-white rounded-lg shadow-lg"
      >
        <MenuIcon size={20} />
      </button>

      
      {mobileOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
          onClick={() => setMobileOpen(false)}
        />
      )}

      
      <aside className="hidden lg:flex flex-col pt-4 bg-amber-500 text-white h-screen w-72 shrink-0 border-r border-white/10">
        {SidebarContent}
      </aside>

     
      <aside
        className={`lg:hidden fixed inset-y-0 left-0 pt-4  z-50 w-72 bg-amber-500 text-white flex flex-col transform transition-transform duration-300 ${
          mobileOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {SidebarContent}
      </aside>
    </>
  );
};

export default Sidebar;
