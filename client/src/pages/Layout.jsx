import {useContext} from "react"
import { AuthContext } from "../context/Authcontext"
import {Outlet,Navigate} from "react-router-dom"
import Sidebar from "../Components/Sidebar"
import Loading from "../Components/Loading"
const Layout = () => {
  const {loading,user}=useContext(AuthContext)
  if(loading) return <Loading/>
   if(!user) return <Navigate to="/login"/>
  return (
    <div className="flex h-screen ">
     <div> <Sidebar ></Sidebar></div>
      <main className="w-full flex-1 overflow-y-auto">
        <div className="p-4 pt-16 sm:p-6 sm:pt-6 lg:p-8 max-w-400 mx-auto"><Outlet></Outlet></div>
      </main>
    </div>
  )
}

export default Layout
