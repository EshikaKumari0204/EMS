import {useNavigate}  from "react-router-dom"
import { useState } from 'react';
import { DEPARTMENTS } from "../assets/assets";
import { Loader2Icon } from "lucide-react";
import  {toast} from "react-hot-toast"

import api from "../api/axios";

const inputClass = "w-full px-3 py-2.5 border border-slate-200 rounded-lg text-sm text-slate-700 placeholder-slate-300 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent transition";
const labelClass = "text-sm font-medium text-slate-600";
const selectClass = "w-full px-3 py-2.5 border border-slate-200 rounded-lg text-sm text-slate-600 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent transition bg-white";
const sectionClass = "text-sm font-semibold text-slate-500 uppercase tracking-wider";

const FormComp = ({initialData,onSuccess,onCancel }) => {
  
  const [loading, setLoading] = useState(false);
  const navigate=useNavigate();
  const handleSubmit=async(e)=>{
    e.preventDefault();
    setLoading(true)
    const formData=new FormData(e.currentTarget)
    if(isEdit) {
      const pwd=formData.get("password")
      if(!pwd) formData.delete("password")
    }
  try {
    console.log(initialData)
    const url=isEdit?`/employees/${initialData.id}`:"/employees"
    const method=isEdit?"put":"post"
    await api[method](url,formData)
    onSuccess?onSuccess():navigate("/employees")

    
  } catch (err) {
    toast.error(err.response?.data?.error||err.message)

  }
  finally{

    setLoading(false)
    onCancel()
  }

  }
  const isEdit=!!initialData
  

  return (
    <form onSubmit={(e)=>handleSubmit(e)} className="flex flex-col gap-6">

      {/* Personal Information */}
      <div className="flex flex-col gap-4">
        <p className={sectionClass}>Personal Information</p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="flex flex-col gap-1.5">
            <label className={labelClass} htmlFor="firstName">First Name</label>
            <input id="firstName" type="text" placeholder="John"  name="firstName" className={inputClass}  defaultValue={initialData?.firstName} required/>
          </div>
          <div className="flex flex-col gap-1.5">
            <label className={labelClass} htmlFor="lastName">Last Name</label>
            <input id="lastName" type="text" placeholder="Doe" name="lastName" className={inputClass} defaultValue={initialData?.lastName} required/>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="flex flex-col gap-1.5">
            <label className={labelClass} htmlFor="phone">Phone Number</label>
            <input id="phone" type="tel" name="phone" placeholder="+1 234 567 8900" className={inputClass} defaultValue={initialData?. phone} required/>
          </div>
          <div className="flex flex-col gap-1.5">
            <label className={labelClass} htmlFor="joinDate">Join Date</label>
            <input id="joinDate" name="joinDate" type="date" className={inputClass}  required/>
          </div>
        </div>

        <div className="flex flex-col gap-1.5">
          <label className={labelClass} htmlFor="bio">Bio (Optional)</label>
          <textarea
            id="bio"
            name="bio"
            rows={4}
            placeholder="A short bio about the employee..."
            className={`${inputClass} resize-none`} defaultValue={initialData?.bio}
          />
        </div>
      </div>

      {/* Divider */}
      <div className="border-t border-slate-100" />

      {/* Employee Details */}
      <div className="flex flex-col gap-4">
        <p className={sectionClass}>Employee Details</p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="flex flex-col gap-1.5">
            <label className={labelClass} htmlFor="department">Department</label>
            <select id="department" className={selectClass} name="department" required>
              
              {DEPARTMENTS.map((dept) => (
                <option key={dept} value={dept}>{dept}</option>
              ))}
            </select>
          </div>
          <div className="flex flex-col gap-1.5">
            <label className={labelClass} htmlFor="position">Position</label>
            <input id="position" type="text" name="position" placeholder="e.g. Software Engineer" className={inputClass} defaultValue={initialData?. position} />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="flex flex-col gap-1.5">
            <label className={labelClass} htmlFor="basicSalary">Basic Salary</label>
            <input id="basicSalary" type="number" min="0" step="0.01" placeholder="0.00" name="basicSalary" className={inputClass} defaultValue={initialData?. basicSalary} required/>
          </div>
          <div className="flex flex-col gap-1.5">
            <label className={labelClass} htmlFor="allowances">Allowances</label>
            <input id="allowances" name="allowances" type="number" min="0" step="0.01" placeholder="0.00" className={inputClass} defaultValue={initialData?. allowances} />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {isEdit && (<div className="flex flex-col gap-1.5">
            <label className={labelClass} htmlFor="status">Status</label>
            <select id="status" name="status" className={selectClass} required>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>)}
          <div className="flex flex-col gap-1.5">
            <label className={labelClass} htmlFor="deductions">Deductions</label>
            <input id="deductions" name="deductions" type="number" min="0" step="0.01" placeholder="0.00" className={inputClass} defaultValue={initialData?. deductions} />
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className="border-t border-slate-100" />

      {/* Account Setup */}
      <div className="flex flex-col gap-4">
        <p className={sectionClass}>Account Set Up</p>

        <div className="flex flex-col gap-1.5">
          <label className={labelClass} htmlFor="email">Work Email</label>
          <input id="email" type="email" name="email" placeholder="john.doe@company.com" className={inputClass} defaultValue={initialData?.email} required/>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {!isEdit && ( <div className="flex flex-col gap-1.5">
            <label className={labelClass} htmlFor="password">
             Temporary Password
            </label>
            <input id="changePass"  name="password" type="password" placeholder="••••••••" className={inputClass} required/>
          </div>)} 
          {isEdit && ( <div className="flex flex-col gap-1.5">
            <label className={labelClass} htmlFor="password">
            Change Password(Optional)
            </label>
            <input id="changePass" type="password" name="password" placeholder="••••••••" className={inputClass} required/>
          </div>)} 
          <div className="flex flex-col gap-1.5">
            <label className={labelClass} htmlFor="role">System Role</label>
            <select  name="role" id="role" className={selectClass} required>
              <option value="EMPLOYEE">Employee</option>
              <option value="ADMIN">Admin</option>
            </select>
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className="border-t border-slate-100" />

      {/* Action Buttons */}
      <div className="flex flex-col-reverse sm:flex-row gap-3 sm:justify-end">
        <button
          type="button"
          onClick={()=>{(onCancel?onCancel():navigate(-1))}}
          className="w-full sm:w-auto px-6 py-2.5 border border-slate-200 text-slate-600 hover:border-slate-300 hover:bg-slate-50 text-sm font-medium rounded-lg transition-colors duration-200"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={loading}
          className="w-full sm:w-auto px-6 py-2.5 bg-amber-500 hover:bg-amber-600 disabled:opacity-60 disabled:cursor-not-allowed text-white text-sm font-medium rounded-lg flex justify-center items-center gap-2 transition-colors duration-200"
        >
          {loading && <Loader2Icon size={16} className="animate-spin" />}
          {isEdit? "Save Changes" : "Add Employee"}
        </button>
      </div>

    </form>
  );
};

export default FormComp;
