import {useEffect,useState} from "react"
import { dummyEmployeeDashboardData ,dummyAdminDashboardData} from "../assets/assets";
import Employeedb from "../Components/Employeedb";
import Admindb from "../Components/Admindb";
import Loading from "../Components/Loading";
const Dashboard = () => {
const [data,setdata]=useState(null);
const [loading,setloading]=useState(true);

useEffect(()=>{
  setdata(dummyAdminDashboardData)
 setTimeout(()=>{
  setloading(false);
 },1000)
},[])
if(loading) return <Loading/>
if(!data) return <p className="text-center text-black text-center text-3xl p-10 ">Data about to load ...</p>
  
   if (data.role=="ADMIN") return <Admindb data={data}/>
  else return <Employeedb data={data} />
}

export default Dashboard
