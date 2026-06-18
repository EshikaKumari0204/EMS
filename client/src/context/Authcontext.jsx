import {createContext,useState,useEffect} from "react"
import api from "../api/axios"
import {useNavigate} from "react-router-dom"
export const AuthContext=createContext()
export function AuthProvider({children}){
  const [user,setUser]=useState(null)
  const [token,setToken]=useState(null)
  const [loading,setLoading]=useState(true)
  const refreshSession=async()=>{
    const gettoken=localStorage.getItem("token")
    if(!gettoken){
      setUser(null);setToken(null);setLoading(false) ;
      return;
    }
    try {
    const {data}=await api.get("/auth/session")
    const user=data.user;
    setUser(user)
      } catch (error) {
        setUser(null);setToken(null);localStorage.removeItem("token")
    }
    finally{
      setLoading(false)
    }
  }
  useEffect(()=>{
    refreshSession()
  },[])
  const login=async(email,password,role_type)=>{
    try {
      
   
    const {data}=await api.post("/auth/login",{email,password,role_type})
    localStorage.setItem("token",data.token)
    setToken(data.token)
    setUser(data.user)
    return data.user
     } catch (error) {
      console.log("error during login",error.message)
      throw error
    }
  }
  const logout=async()=>{
    localStorage.removeItem("token");  setUser(null);setToken(null);return;

  }
  const Navigate=useNavigate()
  const value={login,logout,refreshSession,token,loading,user,Navigate}
  
return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>

}