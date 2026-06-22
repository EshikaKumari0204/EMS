
import { useState, useEffect ,useContext,useCallback} from "react";
import { dummyLeaveData } from "../assets/assets";
import { PlusIcon, ThermometerIcon, PalmtreeIcon, UmbrellaIcon, XIcon } from "lucide-react";
import LeaveHistory from "../Components/Leave/LeaveHistory";
import LeaveForm from "../Components/Leave/LeaveForm";
import Loading from "../Components/Loading";
import { AuthContext } from "../context/Authcontext";
import api from "../api/axios";
import {toast} from "react-hot-toast"
const Leave = () => {
  const [leaves, setLeaves] = useState([]);
  const [showmodal, setShowmodal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isdeleted, setIsdeleted] = useState(false);
  const{user}=useContext(AuthContext)
  const isAdmin =user?.role==="ADMIN" ;

  const fetchLeaves = useCallback(async () => {
    try {

    const res=await api.get("/leaves")
    setLeaves(res.data.data || [])
    if(res.data.employee?.isDeleted) setIsdeleted(true)
     } catch (error) {
       toast.error(error.response?.data?.error||error.message)
    }
    finally{  
      setLoading(false)
    }
  },[])

  useEffect(() => {
    setLoading(true);
    fetchLeaves();
   
  }, []);
 

  const approvedleaves = leaves.filter((data) => data.status === "APPROVED");
  const sickCount = approvedleaves.filter((data) => data.type === "SICK").length;
  const annualCount = approvedleaves.filter((data) => data.type === "ANNUAL").length;
  const casualCount = approvedleaves.filter((data) => data.type === "CASUAL").length;
  const cards = [
    { label: "Sick Leave", value: sickCount, icon: ThermometerIcon },
    { label: "Casual Leave", value: casualCount, icon: UmbrellaIcon },
    { label: "Annual Leave", value: annualCount, icon: PalmtreeIcon }
  ];
  if(loading) return  (<Loading/>)

  return (
    <div className="px-4 sm:px-8 py-6 max-w-5xl w-full flex flex-col gap-6">

      {/* Heading */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-semibold text-slate-700">
            Leave Management
          </h1>
          <p className="text-sm text-slate-400 mt-1">
            {isAdmin ? "Manage leave applications" : "Your leave history and requests"}
          </p>
        </div>
        {!isAdmin && (
          <button
            onClick={() => setShowmodal(true)}
            className="flex items-center gap-2 px-4 py-2.5 bg-amber-500 hover:bg-amber-600 text-white text-sm font-medium rounded-lg transition-colors duration-200 self-start sm:self-auto"
          >
            <PlusIcon size={16} />
            Apply for Leave
          </button>
        )}
      </div>

      {/* Cards */}
      {!isAdmin && (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {cards.map((item, index) => {
            const Icon = item.icon;
            return (
              <div
                key={index}
                className="relative flex items-center gap-4 p-5 bg-white border border-slate-100 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-200 overflow-hidden"
              >
                <div className={`absolute left-0 top-0 bottom-0 w-1 rounded-r-full bg-amber-400`} />
                <div className={`p-3 rounded-xl shrink-0  bg-amber-50 text-amber-500` }>
                  <Icon size={20} />
                </div>
                <div>
                  <p className="text-sm text-slate-400">{item.label}</p>
                  <p className="text-xl font-semibold text-slate-700">
                    {item.value}{" "}
                    <span className="text-sm font-normal text-slate-400">
                      token{item.value !== 1 ? "s" : ""}
                    </span>
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Table */}
      <LeaveHistory isAdmin={isAdmin} leaves={leaves} onUpdate={fetchLeaves} />

      {/* Modal */}
      {showmodal && (
        <div
          onClick={() => setShowmodal(false)}
          className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-4"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto"
          >
            <div className="flex items-start justify-between px-6 pt-6 pb-4 border-b border-slate-100">
              <div>
                <h2 className="text-lg font-semibold text-slate-700">Apply for Leave</h2>
                <p className="text-sm text-slate-400 mt-0.5">Submit a new leave request</p>
              </div>
              <button
                onClick={() => setShowmodal(false)}
                className="text-slate-400 hover:text-slate-600 transition-colors"
              >
                <XIcon size={20} />
              </button>
            </div>
            <div className="px-6 py-5">
              <LeaveForm open={showmodal} onClose={() => setShowmodal(false) } onSuccess={fetchLeaves} />
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default Leave;

     