import {User,Save} from "lucide-react"
import {useState} from 'react'
const ProfileForm = ({initialdata,onSuccess}) => {
  const [loading,setloading]=useState(true)
  const [error,setError]=useState("")
  const [message,setmessage]=useState("")
  const handleSubmit=async(e)=>{
  e.preventDefault()
  }
  console.log(initialdata)
  return (
    <form action="" onSubmit={()=>handleSubmit}>
    <div class="mt-2 mb-4 px-6 flex gap-4 flex-col border border-slate-700 rounded-lg p-4 "> <h2 className="flex items-center gap-0.5"><User/>Public Profile</h2>
      {error && (<div>{error}</div>)}
       {message && (<div>{message}</div>)}
      <div class="flex justify-between "> <div><label htmlFor="">First Name</label> <input type="text" placeholder="Alex Doe" /></div>
        <div><label htmlFor="">Email</label> <input type="text" placeholder="abc@gmail.com"/></div></div>
        <label htmlFor="">Position</label>
        <input type="text" />
         <label htmlFor="">Bio</label>
       <textarea name="" id="" rows={8} cols={1} className="w-2xl"placeholder="write a brief bio"></textarea>
       <p className="text-slate-700">This will be displayed on your profile</p>
       <button className="flex px-3 py-2 bg-blue-500 text-white border rounded items-center gap-0.5 m-auto   "><Save size={15}/><p>Save Changes</p></button>
       </div>
    </form>
  )
}

export default ProfileForm
