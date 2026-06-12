// import {Lock} from "lucide-react"
// import {useState,useEffect} from 'react'
// import { dummyProfileData} from "../assets/assets"
// import ProfileForm from "../Components/Settings/ProfileForm"
// import ChangePass from "../Components/Settings/ChangePass"
// import Loading from "../Components/Loading"
// const Settings = () => {
//   const [profile,setProfile]=useState(null)
//   const [loading,setloading]=useState(true)
//   const [showmodal,setShowModal]=useState(false)
//   const fetchprofile=async()=>{
//     setProfile(dummyProfileData)
//     setTimeout(()=>{setloading(false)},1000)
//   }
//   useEffect(()=>{
//     fetchprofile()
    
//   },[])
//   if(loading) return <Loading/>
 
//   if(profile)
//   return (
// <div>
//  <div> <h1>Setting</h1>  <h2>Manage Your account and preferences </h2></div>
//       {profile && <ProfileForm initialdata={profile} onSuccess={fetchprofile}/>} 
//     <div class="flex gap-4 items-center border rounded-lg max-w-lg justify-between p-2 " >
//       <div class="flex items-center gap-4"> <Lock/>
//        <div><h1> Password</h1> <h2>Update  Password</h2></div></div>
//        <button class="border-slate-400 border px-2 py-2 rounded-md " onClick={()=>setShowModal(true)} >Change</button>
//     </div>
//     {showmodal && <ChangePass open={showmodal} onClose={()=>setShowModal(false)}/>}
//     </div>
//   )
// }

// export default Settings
import { Lock } from "lucide-react";
import { useState, useEffect } from "react";
import { dummyProfileData } from "../assets/assets";
import ProfileForm from "../Components/Settings/ProfileForm";
import ChangePass from "../Components/Settings/ChangePass";
import Loading from "../Components/Loading";

const Settings = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);

  const fetchProfile = async () => {
    setProfile(dummyProfileData);
    setTimeout(() => setLoading(false), 1000);
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

      {/* Profile Form Card */}
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
      </div>

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
