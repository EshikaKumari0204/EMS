// import {useState} from 'react'
// import {Loader2Icon,LockIcon,XIcon} from "lucide-react"
// const ChangePass = ({open,onClose}) => {
//   const [loading,setloading]=useState(false)
//   const [message,setmessage]=useState({type:"",text:""})
//   const handleSubmit=async(e)=>{
//     e.preventDefault()
//   }
//   if(!open) return null
//   return (
    

// <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex justify-center items-center z-50 p-2 " onClick={onClose}>
//       <div className="max-w-lg w-full py-4  animate-slide-up bg-white rounded-lg flex flex-col gap-3 " onClick={(e)=>e.stopPropagation()}>
//       <div className="flex flex-col px-8  gap-4 ">
//       <div className="flex justify-between">  <h1 className="flex items-center mb-3 gap-0.5 "><LockIcon size={15}/>Change Password </h1><XIcon onClick={onClose}/></div>
//     <form onSubmit={handleSubmit} className="flex flex-col gap-4 ">
//      {message.text && (<div className="">
//         <div className={`w-1.5 h-1.5 rounded-full mt-1.5 shrink-0 ${message.type==="success"?"bg-emerald-500":"bg-rose-500"}`}>{message.text}</div>
//         </div>    )} 
// <div>
//   <label className="block text-sm font-medium text-slate-700 mb-2">
//     Current Password
//   </label>
//   <input type="password" name="currentPassword" required/>
// </div>

// <div>
//   <label className="block text-sm font-medium text-slate-700 mb-2">
//     New Password
//   </label>
//   <input type="password" name="newPassword" required/>
// </div>

// <div className='flex pt-2 gap-2 mx-auto'>
//   <button 
//     type="button" 
//     onClick={onClose} 
//     className="btn-secondary flex-1 px-3 py-2"
//   >
//     Cancel
//   </button>

//   <button 
//     type="submit" 
//     disabled={loading} 
//     className=" px-3 py-2 bg-blue-500 text-white border rounded"
//   >
//     {loading && <Loader2Icon className="w-4 h-4 animate-spin"/>}
//     Update Password
//   </button>
// </div></form></div></div></div>

//   )
// }

// export default ChangePass
import { useState } from "react";
import { Loader2Icon, LockIcon, XIcon } from "lucide-react";

const inputClass = "w-full px-3 py-2.5 border border-slate-200 rounded-lg text-sm text-slate-700 placeholder-slate-300 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent transition";

const ChangePass = ({ open, onClose }) => {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setMessage({ type: "success", text: "Password updated successfully." });
    }, 1000);
  };

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 bg-black/40 backdrop-blur-sm flex justify-center items-center z-50 p-4"
      onClick={onClose}
    >
      <div
        className="w-full max-w-md bg-white rounded-2xl shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 pt-6 pb-4 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 bg-amber-50 rounded-lg flex items-center justify-center">
              <LockIcon size={14} className="text-amber-500" />
            </div>
            <h2 className="text-base font-semibold text-slate-700">
              Change Password
            </h2>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 transition-colors"
          >
            <XIcon size={18} />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="px-6 py-5 flex flex-col gap-5">

          {/* Message banner */}
          {message.text && (
            <div className={`flex items-start gap-3 px-4 py-3 rounded-xl text-sm border ${
              message.type === "success"
                ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                : "bg-rose-50 text-rose-700 border-rose-200"
            }`}>
              <div className={`w-1.5 h-1.5 rounded-full mt-1.5 shrink-0 ${
                message.type === "success" ? "bg-emerald-500" : "bg-rose-500"
              }`} />
              {message.text}
            </div>
          )}

          {/* Current Password */}
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-slate-600">
              Current Password
            </label>
            <input
              type="password"
              name="currentPassword"
              required
              placeholder="••••••••"
              className={inputClass}
            />
          </div>

          {/* New Password */}
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-slate-600">
              New Password
            </label>
            <input
              type="password"
              name="newPassword"
              required
              placeholder="••••••••"
              className={inputClass}
            />
          </div>

          {/* Buttons */}
          <div className="flex flex-col-reverse sm:flex-row gap-3 pt-1">
            <button
              type="button"
              onClick={onClose}
              className="w-full sm:w-auto flex-1 px-4 py-2.5 border border-slate-200 text-slate-600 hover:bg-slate-50 text-sm font-medium rounded-lg transition-colors duration-200"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="w-full sm:w-auto flex-1 px-4 py-2.5 bg-amber-500 hover:bg-amber-600 disabled:opacity-60 disabled:cursor-not-allowed text-white text-sm font-medium rounded-lg flex items-center justify-center gap-2 transition-colors duration-200"
            >
              {loading && <Loader2Icon size={16} className="animate-spin" />}
              {loading ? "Updating..." : "Update Password"}
            </button>
          </div>

        </form>
      </div>
    </div>
  );
};

export default ChangePass;
