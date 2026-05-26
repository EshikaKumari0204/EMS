import {dummyAttendanceData} from "../assets/assets"
import {useState,useEffect,useCallback} from "react"
import Loading from "../Components/Loading"
const Attendance = () => {
  const [history,sethistory]=useState([])
    const [loading,setloading]=useState(false)
      const [isdeleted,setisdeleted]=useState(false)
      const fetchdata=useCallback(async()=>{
        setloading(true)
         sethistory(dummyAttendanceData)
         setTimeout(()=>{
setloading(false)
         },1000)
      },[])
      const today=new Date();
      today.setHours(0,0,0,0)
      const todayrecord=history.find((r)=>new Date(r.date).toDateString===today.toDateString())
      if(loading) return <Loading/>
  return (
    <div>
      <div>
        <p>Attendance</p>
        <p>Track your work hours and daily check-ins</p>
      </div>
    </div>
  )
}

export default Attendance
