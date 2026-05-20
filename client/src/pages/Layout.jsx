
import {Outlet} from "react-router-dom"
import Sidebar from "../Components/Sidebar"
const Layout = () => {
  return (
    <div className="flex gap-5">
      <Sidebar ></Sidebar>
      <main>
        <div><Outlet></Outlet></div>
      </main>
    </div>
  )
}

export default Layout
