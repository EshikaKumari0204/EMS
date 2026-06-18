
import { Lock } from "lucide-react";
import { useState, useEffect,useContext } from "react";

import ProfileForm from "../Components/Settings/ProfileForm";
import ChangePass from "../Components/Settings/ChangePass";
import Loading from "../Components/Loading";
import { AuthContext } from "../context/Authcontext";
import api from "../api/axios";
import {toast} from "react-hot-toast"
const Settings = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const {user}=useContext(AuthContext)
  const fetchProfile = async () => {
  try {
    const res=await api.get("/profile")
    const profile=res.data
    if(profile) setProfile(profile)
  } catch (error) {
     toast.error(error.response?.data?.error||error.message)
  }
  finally{
setLoading(false)
  }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  if (loading) return <Loading />;
  if (!profile) return null;

  return (
    <div className="px-4 sm:px-8 py-6 max-w-4xl w-full flex flex-col gap-6">

      {/* Header */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-semibold text-slate-700">
          Settings
        </h1>
        <p className="text-sm text-slate-400 mt-1">
          Manage your account and preferences
        </p>
      </div>

      {/* Profile Form Card */}{user.role!=="ADMIN"  &&
      <div className="bg-white border border-slate-100 rounded-2xl shadow-sm overflow-hidden">
        <div className="flex items-center gap-2 px-6 py-4 border-b border-slate-100">
          <div className="w-7 h-7 bg-amber-50 rounded-lg flex items-center justify-center">
            <Lock size={14} className="text-amber-500" />
          </div>
          <h2 className="text-sm font-semibold text-slate-700">
            Public Profile
          </h2>
        </div>
        <div className="px-6 py-5">
          <ProfileForm initialdata={profile} onSuccess={fetchProfile} />
        </div>
      </div>}

      {/* Password Card */}
      <div className="bg-white border border-slate-100 rounded-2xl shadow-sm px-5 py-4 flex items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 bg-slate-100 rounded-xl flex items-center justify-center shrink-0">
            <Lock size={18} className="text-slate-500" />
          </div>
          <div>
            <p className="text-sm font-semibold text-slate-700">Password</p>
            <p className="text-xs text-slate-400 mt-0.5">Update your password</p>
          </div>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="px-4 py-2 border border-slate-200 text-slate-600 hover:border-amber-400 hover:text-amber-500 text-sm font-medium rounded-lg transition-colors duration-200 shrink-0"
        >
          Change
        </button>
      </div>

      {/* Change Password Modal */}
      {showModal && (
        <ChangePass open={showModal} onClose={() => setShowModal(false)} />
      )}

    </div>
  );
};

export default Settings;
