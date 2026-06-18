import axios from "axios"
//prepend this url before every request
const api=axios.create({baseURL:(import.meta.env.VITE_BACKEND_URL || "http://localhost:4000")+"/api"})
// runs before every single request is sent. It grabs the JWT token from localStorage and attaches it as an Authorization header automatically.
api.interceptors.request.use((config)=>{
  const token=localStorage.getItem("token")
  if(token){
    config.headers.Authorization=`Bearer ${token}`
  }
  return config
})
export default api;