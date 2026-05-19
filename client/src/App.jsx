import {Toaster} from "react-hot-toast"
import {Routes,Route,Navigate} from "react-router-dom"
import LoginLanding from "./pages/LoginLanding"
import Layout from "./pages/Layout"
import Dashboard from "./pages/Dashboard"
import Employees from "./pages/Employees"
import Attendance from "./pages/Attendance"
import Leave from "./pages/Leave"
import Payslips from "./pages/Payslips"
import Settings from "./pages/Settings"
import PrintPayslips from "./pages/PrintPayslips"

const App = () => {
  return (
   <>
   <Toaster/>
    <Routes>
      <Route path="/login" element={<LoginLanding></LoginLanding>}></Route>
      <Route element={<Layout/>}>
       <Route path="/dashboard" element={<Dashboard/>}></Route>
         <Route path="/employees" element={<Employees/>}></Route>
           <Route path="/attendance" element={<Attendance/>}></Route>
             <Route path="/leave" element={<Leave/>}></Route>
               <Route path="/payslips" element={<Payslips/>}></Route>
                 <Route path="/settings" element={<Settings/>}></Route>        
      </Route>
        <Route path="/print/payslips/:id" element={<PrintPayslips/>}></Route>
           <Route path="/*" element={<Navigate to="/dashboard" replace/>}></Route>
    </Routes>
   </>
  )
}

export default App


