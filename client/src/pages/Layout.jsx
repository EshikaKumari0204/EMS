
import {Outlet} from "react-router-dom"
const Layout = () => {
  return (
    <div>
      <p>Sidebar</p>
      <main>
        <div><Outlet></Outlet></div>
      </main>
    </div>
  )
}

export default Layout
