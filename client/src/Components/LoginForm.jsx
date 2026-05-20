import Loginleft from "./Loginleft"
import {ArrowLeftIcon,EyeOffIcon,EyeIcon} from "lucide-react"
import {useState} from "react"
import {Link} from "react-router-dom"
const LoginForm = ({title,subtitle}) => {
  const [email,setemail]=useState("");
    const [password,setpassword]=useState("");
      const [showPassword,setshowPassword]=useState(false);
        const [error,seterror]=useState("");
          const [loading,setloading]=useState("");
          const handleform=(e)=>{
            e.preventDefault();
          }
  return (
   <div className="flex h-screen w-screen justify-start items-center ">
   <Loginleft   />
    <div className="flex justify-center items-center w-[50%] text-gray-600 ">
      <div className="flex flex-col gap-5 items-start justify-center ">
   <Link to={"/login"} className="flex justify-center items-center gap-2"><ArrowLeftIcon size={15}></ArrowLeftIcon> <h1>Back to Portal</h1></Link>
    <h1 className="text-3xl">{title}</h1>
    <h2>{subtitle}</h2>
    {error && (<div>{error}</div>)}
    {/* form  */}

    <form action="" className="flex flex-col gap-4">
      <label htmlFor="email">Email</label>
      <input type="email" placeholder="xyz@gmail.com" value={email} onChange={(e)=>setemail(e.target.value)}/>
       <label htmlFor="password">Password</label>
      <input type={showPassword?"text":'password'} placeholder="xyzasb&$%asd" value={password} onChange={(e)=>setpassword(e.target.value)}  /> 
      <button onSubmit={(e)=>handleform(e)} className="bg-amber-500 flex justify-center  items-center  rounded-md px-2 text-white  w-md py-3">Sign In </button>
    </form>
</div>
   </div>

    </div>
  )
}

export default LoginForm

