import {useState} from "react"
import {XIcon,FileText,CalendarDays,Loader2,Send} from "lucide-react"
const LeaveForm = ({open,onClose,onSuccess}) => {
  const [loading,setLoading]=useState(false)
  const today=new Date();
  const tomorrow=new Date(today)
  tomorrow.setDate(today.getDate()+1)
  const minDate=tomorrow.toISOString().split('T')[0];
  const handleSubmit=async(e)=>{
    e.preventDefault();
  }
 
  if(!open) return null

  return (
    
    <div onClick={onClose}  className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 ">
      <div onClick={(e)=>e.stopPropagation()} className="flex gap-4 flex-col relative p-5 bg-white rounded-2xl shadow-2xl w-full max-w-lg animate-fade-in">
        <div class="flex justify-between">
          <div>
          <h1>Apply for Leave</h1>
          <p>Submit your leave request for approval </p></div>
           <button onClick={onClose}> <XIcon/></button>
        </div>
        <div>
       <label className='flex items-center gap-2 text-sm font-medium text-slate-700 mb-2'>
    <FileText className="w-4 h-4 text-slate-400"/>
    Leave
  </label>
          <select name="" id="">
            <option value="SICK">Sick Leave</option>
            <option value="CASUAL">Casual Leave</option>
            <option value="ANNUAL">Annual Leave</option>
          </select>
        </div>
       {/* ------ duration ------ */}
<div>
  <label className='flex items-center gap-2 text-sm font-medium text-slate-700 mb-2'>
    <CalendarDays className="w-4 h-4 text-slate-400"/>
    Duration
  </label>
  <div className='grid grid-cols-2 gap-4'>
    <div>
      <span className="block text-xs text-slate-400 mb-1">From</span>
      <input type="date" name="startDate" required min={minDate} />
    </div>
    <div>
      <span className="block text-xs text-slate-400 mb-1">To</span>
      <input type="date" name="endDate" required min={minDate} />
    </div>
  </div>
</div>

{/*------ reason ------ */}
<div>
  <label className='text-sm font-medium text-slate-700 mb-2 block'>
    Reason
  </label>
  <textarea
    name="reason"
    required
    rows={3}
    className="resize-none"
    placeholder="Briefly describe why you need this leave..."
  />
</div>

{/*------ buttons ------ */}
<div className="flex gap-3 pt-2">
  <button
    onClick={onClose}
    type='button'
    className="btn-secondary flex-1">
    Cancel
  </button>

  <button
    onClick={onClose}
    disabled={loading}
    type='submit'
    className="btn-primary flex-1 flex items-center justify-center gap-2">
    {loading ? <Loader2 className='w-4 h-4 animate-spin'/> : <Send />}
  </button>
</div>
       
      </div>
     
    </div>
  )
}

export default LeaveForm
