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
import LoginForm from "./Components/LoginForm"

const App = () => {
  return (
   <>
   <Toaster/>
    <Routes>
      <Route path="/login" element={<LoginLanding></LoginLanding>}></Route>
       <Route path="/login/admin" element={<LoginForm role="admin" title="Admin Portal" subtitle="Sign in to manage the employees"></LoginForm>}></Route>
        <Route path="/login/employee" element={<LoginForm role="employee" title="Employee Portal" subtitle="Sign in to access your account "></LoginForm>}></Route>
      <Route element={<Layout/>}> 
       <Route path="/dashboard" element={<Dashboard/>}></Route>
         <Route path="/employees" element={<Employees/>}></Route>
           <Route path="/attendance" element={<Attendance/>}></Route>
             <Route path="/leave" element={<Leave/>}></Route>
               <Route path="/payslips" element={<Payslips/>}></Route>
                 <Route path="/settings" element={<Settings/>}></Route>        
      </Route>
        <Route path="/print/payslips/:id" element={<PrintPayslips/>}></Route>
        {/*  It automatically redirects users to the /dashboard page if they type in or land on a URL that does not match any of your defined routes */}
           <Route path="*" element={<Navigate to="/dashboard" replace/>}></Route>
    </Routes>
   </>
  )
}
export default App


