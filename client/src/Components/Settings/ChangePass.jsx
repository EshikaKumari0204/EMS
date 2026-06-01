import {useState} from 'react'
import {Loader2Icon,LockIcon,XIcon} from "lucide-react"
const ChangePass = ({open,onClose}) => {
  const [loading,setloading]=useState(false)
  const [message,setmessage]=useState({type:"",text:""})
  const handleSubmit=async(e)=>{
    e.preventDefault()
  }
  if(!open) return null
  return (
    

<div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex justify-center items-center z-50 p-2 ">
      <div className="max-w-lg w-full py-4  animate-slide-up bg-white rounded-lg flex flex-col gap-3 ">
      <div className="flex flex-col px-8  gap-4 ">
      <div className="flex justify-between">  <h1 className="flex items-center mb-3 gap-0.5 "><LockIcon size={15}/>Change Password </h1><XIcon onClick={onClose}/></div>
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 ">
     {message.text && (<div className="">
        <div className={`w-1.5 h-1.5 rounded-full mt-1.5 shrink-0 ${message.type==="success"?"bg-emerald":"bg-rose-500"}`}></div>
        </div>    )} 
<div>
  <label className="block text-sm font-medium text-slate-700 mb-2">
    Current Password
  </label>
  <input type="password" name="currentPassword" required/>
</div>

<div>
  <label className="block text-sm font-medium text-slate-700 mb-2">
    New Password
  </label>
  <input type="password" name="newPassword" required/>
</div>

<div className='flex pt-2 gap-2 mx-auto'>
  <button 
    type="button" 
    onClick={onClose} 
    className="btn-secondary flex-1 px-3 py-2"
  >
    Cancel
  </button>

  <button 
    type="submit" 
    disabled={loading} 
    className=" px-3 py-2 bg-blue-500 text-white border rounded"
  >
    {loading && <Loader2Icon className="w-4 h-4 animate-spin"/>}
    Update Password
  </button>
</div></form></div></div></div>

  )
}

export default ChangePass
