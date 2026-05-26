import {Loader2Icon,LogInIcon,LogOutIcon}
import {useState} from 'react'
const Checkin = ({todayrecord,onAction}) => {
  const [loading,setloading]=useState(false)
  const handleAttendance=()=>{
        setloading(true)
        setTimeout(()=>{
        setloading(false)
          },1000)
       }
       if(todayrecord?.checkout) return (<div>
        <p>Work Day completed </p>
        <p> Great Job ! See you tomorrow</p>
       </div>)
     const isCheckedIn = ! !todayrecord?.isCheckedIn;
return (
  <div className='absolute bottom-4 right-4 flex flex-col z-1'>
    <button onClick={handleAttendance} disabled={loading} className={`w-full max-w-xs flex justify-between items-center gap-8 p-4 rounded-xl bg-linear-to-br text-white ${isCheckedIn ? "from-slate-700 to-slate-900" : "from-indigo-600 to-indigo-700"}`}>
      
      {loading ? <Loader2Icon className="size-7 animate-spin"/> : isCheckedIn ? <LogOutIcon className="size-7"/> : <LogInIcon className="size-7"/>}

      <div className='relative flex flex-col items-center text-center'>
        <h2 className='text-lg font-medium mb-1'>{loading ? "Processing..." : isCheckedIn ? "Clock Out" : "Clock In"}</h2>
        <p className='text-xs opacity-80'>{isCheckedIn ? "Click to end your shift" : "Start your work day"}</p>
      </div>
    </button>
  </div>
)
}
  


export default Checkin

