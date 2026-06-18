
import { Send, Loader2 } from "lucide-react";
import { useState } from "react";

import {toast} from "react-hot-toast"
import api from "../../api/axios";
const inputClass = "w-full px-3 py-2.5 border border-slate-200 rounded-lg text-sm text-slate-700 placeholder-slate-300 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent transition";
const disabledInputClass = "w-full px-3 py-2.5 border border-slate-200 rounded-lg text-sm bg-slate-50 text-slate-400 placeholder-slate-300 cursor-not-allowed";
const labelClass = "text-sm font-medium text-slate-600";

const ProfileForm = ({ initialdata, onSuccess }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
     setError("");
      setMessage("");
      const formdata=new FormData(e.currentTarget)
   try {
    await api.post("/profile",formdata)
    setMessage("Profile updated successfully")
    onSuccess?.()
   } catch (error) {
    toast.error(error.response?.data?.error||error.message)
   }
   finally{
     setLoading(false)
   }
     
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5">

      {/* Error banner */}
      {error && (
        <div className="bg-rose-50 text-rose-700 px-4 py-3 rounded-xl text-sm border border-rose-200 flex items-start gap-3">
          <div className="w-1.5 h-1.5 rounded-full bg-rose-500 mt-1.5 shrink-0" />
          {error}
        </div>
      )}

      {/* Success banner */}
      {message && (
        <div className="bg-emerald-50 text-emerald-700 px-4 py-3 rounded-xl text-sm border border-emerald-200 flex items-start gap-3">
          <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-1.5 shrink-0" />
          {message}
        </div>
      )}

      {/* First Name + Email */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="flex flex-col gap-1.5">
          <label className={labelClass}>First Name</label>
          <input
            type="text"
            placeholder="Alex Doe"
            defaultValue={initialdata?.firstName}
            className={disabledInputClass} disabled
          />
        </div>
        <div className="flex flex-col gap-1.5">
          <label className={labelClass}>Email</label>
          <input
            type="email"
            placeholder="abc@gmail.com"
            defaultValue={initialdata?.email}
            className={disabledInputClass} disabled
          />
        </div>
      </div>

      {/* Position */}
      <div className="flex flex-col gap-1.5">
        <label className={labelClass}>Position</label>
        <input
          type="text"
          defaultValue={initialdata?.position}
          placeholder="e.g. Software Engineer"
          className={disabledInputClass} disabled
        />
      </div>

      {/* Bio */}
      <div className="flex flex-col gap-1.5">
        <label className={labelClass}>Bio</label>
        <textarea
          rows={6}
          placeholder="Write a brief bio..."
          defaultValue={initialdata?.bio}
          className={`${inputClass} resize-none`} name="bio"
        />
        <p className="text-xs text-slate-400">
          This will be displayed on your profile
        </p>
      </div>

      {/* Deactivated state or Save button */}
      {initialdata?.isDeleted ? (
        <div className="p-4 bg-rose-50 border border-rose-200 rounded-xl text-center">
          <p className="text-rose-600 font-medium">Account Deactivated</p>
          <p className="text-sm text-rose-400 mt-0.5">
            You can no longer update your profile
          </p>
        </div>
      ) : (
        <button
  type="submit"
  disabled={loading}
  className="self-start px-6 py-2.5 bg-amber-500 hover:bg-amber-600 disabled:opacity-60 disabled:cursor-not-allowed text-white text-sm font-medium rounded-lg flex items-center gap-2 transition-colors duration-200"
>
  {loading ? <Loader2 size={16} className="animate-spin" /> : <Send size={16} />}
  {loading ? "Saving..." : "Save Changes"}
</button>
      )}

    </form>
  );
};

export default ProfileForm;
