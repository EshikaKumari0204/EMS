
import {useState} from 'react'
import {DEPARTMENTS} from "../assets/assets"
import {Loader2Icon} from "lucide-react"
const FormComp = () => {
  const [isedit,setisedit]=useState(false)
  const [loading,setloading]=useState(false)
  
  return (
    <div className="px-3 py-5 flex flex-col gap-4 overflow-y-scroll">
      <h1>Personal Information</h1>
      <div className="flex  justify-between "><div className="flex flex-col gap-2 w-[40%]"><label htmlFor="firstName">First Name</label>
      <input type="text"  /></div>
      <div className="flex flex-col gap-2 w-[40%]"><label htmlFor="LastName">Last Name</label>
      <input type="text"  />
      </div>
      </div>
       <div className="flex justify-between "><div className="flex flex-col gap-2 w-[40%]"><label htmlFor="phone">Phone Number</label>
      <input type="phone"  /></div>
      <div className="flex flex-col gap-2 w-[40%]"><label htmlFor="joindate">Join Date </label>
      <input type="date"  />
      </div>
      </div>
      <label htmlFor="bio" className="flex flex-col gap-2 ">Bio (Optional)</label>
      <textarea rows="6" cols="2"  className="max-w-md ">
  
</textarea>
{/* <div class="flex flex-col gap-4">
  <p>Employee Details</p>
  <div class="flex justify-between">
    <div className="flex flex-col gap-2 w-[40%]">
      <label htmlFor="dept">Department</label> 
      <select className="max-w-40 ">
              <option value="">All Departments</option>
              {DEPARTMENTS.map((dept,index)=>(<option key={dept} value={dept}>{dept}</option>))}
            </select></div>
             <div className="flex flex-col gap-2 w-[40%]"><label htmlFor="position">Position </label>
      <input type="text"  />
      </div>
  </div>

   <div class="flex  justify-between">
    <div className="flex flex-col gap-2 w-[40%]">
      <label htmlFor="basicsalary">Basic Salary</label> 
     <input type="text"  /></div>
             <div className="flex flex-col gap-2 w-[40%]"><label htmlFor="allowances">Allowances </label>
      <input type="number"  min="1" step="0.01" />
      </div>
  </div>
   <div class="flex justify-between ">
    <div className="flex flex-col gap-2 w-[40%]">
      <label htmlFor="status">Status</label> 
      <select className="max-w-40 ">
              
             <option key="active" >Active</option>    <option key="inactive" >Inactive</option>
            </select></div>
             <div className="flex flex-col gap-2 w-[40%]"><label htmlFor="deduction">Deduction </label>
      <input type="text"  />
      </div>
  </div>

</div> */}

{/* <div class="flex flex-col  gap-4"> <p>Account Set Up</p>
<div className="flex flex-col gap-2 w-[40%]"><label htmlFor="work">Work Email</label>
      <input type="email"  />
      </div>
      <div class="flex justify-between ">
    <div className="flex flex-col gap-2 w-[40%]">
      <label htmlFor="changepass">Change Password (Optional)</label> 
       <input type="password"  />
     </div>
             <div className="flex flex-col gap-2 w-[40%]"><label htmlFor="sysrole">System Role</label>
      <select className="max-w-40 ">
              
             <option key="employee" >Employee</option>    <option key="admin" >Admin</option>
            </select>
      </div>
  </div>
</div> */}
<div class="flex gap-2">
  <button className="px-3 py-2 bg-blue-500 text-white border rounded"> Cancel</button>
  <button className="px-3 py-2   border  border-gray-500 rounded">{loading ?<Loader2Icon></Loader2Icon>: `${isedit?'Edit Employee':'Add Employee'}`}</button>
</div>
    </div>
  )
}

export default FormComp
