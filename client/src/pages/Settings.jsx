import {Lock} from "lucide-react"
import {useState,useEffect} from 'react'
import { dummyEmployeeData,  } from "../assets/assets"
import ProfileForm from "../Components/Settings/ProfileForm"
import ChangePass from "../Components/Settings/ChangePass"
const Settings = () => {
  const [profile,setProfile]=useState({})
  const [loading,setloading]=useState(true)
  const [showmodal,setShowModal]=useState(false)
  const fetchprofile=async()=>{
    setProfile(dummyEmployeeData[0])
  }
  useEffect(()=>{
    fetchprofile()
    setTimeout(()=>setloading(false),1000)
  },[])
 
  if(profile)
  return (
<div>
  <h1>Setting</h1>
  <h2>Manage Your account and preferences </h2>
       <ProfileForm initialdata={profile} onSuccess={fetchprofile}/>
    <div class="flex gap-4 items-center border rounded-lg max-w-lg justify-between p-2 " onClick={()=>setShowModal(true)}>
      <div class="flex items-center gap-4"> <Lock/>
       <div><h1> Password</h1> <h2>Update Your Account Password</h2></div></div>
       <button class="border-slate-400 border px-2 py-2 rounded-md " >Change</button>
    </div>
    {showmodal && <ChangePass open={showmodal} onClose={()=>setShowModal(false)}/>}
    </div>
  )
}

export default Settings
