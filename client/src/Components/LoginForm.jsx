import Loginleft from "./Loginleft"
import {ArrowLeftIcon,EyeOffIcon,EyeIcon,Loader2Icon} from "lucide-react"
import {useState} from "react"
import {Link} from "react-router-dom"
const LoginForm = ({title,subtitle,role}) => {
  const [email,setemail]=useState("");
    const [password,setpassword]=useState("");
      const [showPassword,setshowPassword]=useState(false);
        const [error,seterror]=useState("");
          const [loading,setloading]=useState(false   );
          const handleform=async(e)=>{
            e.preventDefault();
          }
  return (
   <div className="flex h-screen flex-col md:flex-row w-screen justify-start items-center ">
   <Loginleft   />
    <div className="flex justify-center items-center w-[50%] text-gray-600 ">
      <div className="flex flex-col gap-5 items-start justify-center ">
   <Link to={"/login"} className="flex justify-center items-center gap-2"><ArrowLeftIcon size={15}></ArrowLeftIcon> <h1>Back to Portal</h1></Link>
    <h1 className="text-3xl">{title}</h1>
    <h2>{subtitle}</h2>
    {error && (<div>{error}</div>)}
    {/* form  */}

    <form  className="flex flex-col gap-4" onSubmit={handleform}>
      <label className="block text-sm font-medium text-slate-700 mb-2" htmlFor="email">Email</label>
      <input type="email" placeholder="xyz@gmail.com" value={email} onChange={(e)=>setemail(e.target.value)} required/>
    <label className="block text-sm font-medium text-slate-700 mb-2" htmlFor="password">Password</label>
         <div class="relative"><input type={showPassword?"text":'password'} placeholder="xyzasb&$%asd" value={password} onChange={(e)=>setpassword(e.target.value)}  required/> <button className="absolute right-10 top-2" onClick={()=> setshowPassword(!showPassword)}>{showPassword?<EyeIcon/>:<EyeIcon/>}</button> </div>
      <button  type="submit"  disabled={loading} className="bg-amber-500 flex justify-center  items-center  rounded-md px-2 text-white  w-md py-3">
        {loading && <Loader2Icon className="animate-spin h-4 w-4 mr-2"/>}
        Sign In </button>
    </form>
</div>
   </div>

    </div>
  )
}

export default LoginForm

