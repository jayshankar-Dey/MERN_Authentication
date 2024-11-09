import axios from "axios"
import { useEffect, useState } from "react"
import toast from "react-hot-toast"
import { Navigate, useParams } from "react-router-dom"

const Verify_Email = () => {
    const {token}=useParams()
    const [verify,setVerify]=useState(false)

     const get_Verify_Email=async(token)=>{
      const res=await axios.post(`http://localhost:8800/api/v1/verify/gmail`,{token})
      if(res.data.success){
        setVerify(true)
        toast.success(res.data.message)
        localStorage.setItem('auth',token)
      }else{
        return setVerify(false)
      }
     }

     useEffect(()=>{
        if(Number(token.length) >40){
         get_Verify_Email(token)
        }
     },{token})
  return (
    <>
    {verify ? <Navigate to={'/home'}/>:<Navigate to={'/'}/>}
    </>
  )
}

export default Verify_Email
