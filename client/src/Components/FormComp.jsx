

const FormComp = () => {
  return (
    <div className="px-3 py-5 flex flex-col gap-4">
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
    </div>
  )
}

export default FormComp
