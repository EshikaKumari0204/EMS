// import {User,Send,Loader2} from "lucide-react"
// import {useState} from 'react'
// const ProfileForm = ({initialdata,onSuccess}) => {
//   const [loading,setloading]=useState(false)
//   const [error,setError]=useState("")
//   const [message,setmessage]=useState("")
//   const handleSubmit=async(e)=>{
//   e.preventDefault()
//   }
  
//   return (
//     <form  onSubmit={()=>handleSubmit}>
//     <div class="mt-2 mb-4 px-6 flex gap-4 flex-col border border-slate-700 rounded-lg p-4 "> 
//       {error && (<div className="bg-rose-50 text-rose-700 p-4 rounded-xl text-sm border border-rose-200 mb-6 flex items-start gap-3 "><div className="w-1.5 h-1.5 rounded-full bg-rose-500 mt-1.5 shrink-0"/>{error}</div>)}
//      {message && (<div className="bg-emerald-50 text-emerald-700 p-4 rounded-xl text-sm border border-emerald-200 mb-6 flex items-start gap-3 "><div className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-1.5 shrink-0"/>{message}</div>)}
//       <div class="flex justify-between "> <div><label htmlFor="">First Name</label> <input type="text" placeholder="Alex Doe" defaultValue={initialdata?.name} /></div>
//         <div><label htmlFor="">Email</label> <input type="email" placeholder="abc@gmail.com" defaultValue={initialdata?.email}/></div></div>
//         <label htmlFor="">Position</label>
//         <input type="text" defaultValue={initialdata?.position}/>
//          <label htmlFor="">Bio</label>
//        <textarea name="" id="" rows={8} cols={1} className="w-2xl" placeholder="write a brief bio" defaultValue={initialdata?.bio}></textarea>
//        <p className="text-slate-700">This will be displayed on your profile</p>
//        {initialdata.iseDeleted?(<div className="pt-2"><div className="p-4 bg-rose-50 border border-rose-200 rounded-xl text-center "><p className="text-rose-600 font-medium tracking-tight"> Account Deactivated</p><p>You can no longer update your profile</p></div></div>):(  <button
//           type="submit"
//           disabled={loading}
//           className="w-full sm:w-auto flex-1 px-4 py-2.5 bg-amber-500 hover:bg-amber-600 disabled:opacity-60 disabled:cursor-not-allowed text-white text-sm font-medium rounded-lg flex items-center justify-center gap-2 transition-colors duration-200"
//         >
//           {loading ? (
//             <Loader2 size={16} className="animate-spin" />
//           ) : (
//             <Send size={16} />
//           )}
//           Save Changes
//         </button>)}
      
//        </div>
//     </form>
//   )
// }

// export default ProfileForm
import { Send, Loader2 } from "lucide-react";
import { useState } from "react";

const inputClass = "w-full px-3 py-2.5 border border-slate-200 rounded-lg text-sm text-slate-700 placeholder-slate-300 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent transition";
const labelClass = "text-sm font-medium text-slate-600";

const ProfileForm = ({ initialdata, onSuccess }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setMessage("Profile updated successfully.");
    }, 1000);
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
            className={inputClass}
          />
        </div>
        <div className="flex flex-col gap-1.5">
          <label className={labelClass}>Email</label>
          <input
            type="email"
            placeholder="abc@gmail.com"
            defaultValue={initialdata?.email}
            className={inputClass}
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
          className={inputClass}
        />
      </div>

      {/* Bio */}
      <div className="flex flex-col gap-1.5">
        <label className={labelClass}>Bio</label>
        <textarea
          rows={6}
          placeholder="Write a brief bio..."
          defaultValue={initialdata?.bio}
          className={`${inputClass} resize-none`}
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
