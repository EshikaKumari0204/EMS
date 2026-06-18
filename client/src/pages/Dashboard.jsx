import {useEffect,useState} from "react"
import { dummyEmployeeDashboardData ,dummyAdminDashboardData} from "../assets/assets";
import Employeedb from "../Components/Employeedb";
import Admindb from "../Components/Admindb";
import Loading from "../Components/Loading";
import {toast} from "react-hot-toast"
import api from "../api/axios";
const Dashboard = () => {
const [data,setdata]=useState(null);
const [loading,setloading]=useState(true);
useEffect(()=>{
  api.get("/dashboard").then((res)=>setdata(res.data)).catch((err)=>toast.error(err.response?.data?.error || err?.message)).finally(()=>setloading(false))
},[])

if(loading) return <Loading/>
if(!data) return <p className="text-center text-slate-500 py-12  text-center text-3xl p-10 ">Failed to load Dashboard</p>
   if (data.role=="ADMIN") return <Admindb data={data}/>
  else return <Employeedb data={data} />
}
export default Dashboard
