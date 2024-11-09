import { useState } from "react"
import OTPInput from "otp-input-react";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
const Otp_Verify = () => {
  const navigate=useNavigate()
  const [otp, setOTP] = useState("");
  const {token,id}=useParams()

  const handleVerify=async()=>{
    try {
      if(!otp)return toast.error('please enter Valide OTP')
        const res=await axios.post(`http://localhost:8800/api/v1/otp/verify`,{token,id,otp})
    
      if(res.data.success){
        toast.success(res.data.message)
        setOTP("")
        localStorage.setItem('auth',res.data.token)
        navigate('/home')
      }else{
        toast.error(res.data.message)
      }
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <div className=" h-screen w-screen bg-zinc-100 flex justify-center items-center">
      <div className="w-fit h-fit p-3 bg-white flex-col shadow rounded ">
      <img src="https://media.istockphoto.com/id/1201144331/vector/icon-design-element-logo-for-technology-innovation-company-tech-icon-and-symbol.jpg?s=612x612&w=0&k=20&c=Q-zPPtCY9aNohWqcUTB-rEBSd3xoC6fqSEgWDgulrf8=" className="h-24" alt="" />
        <h3 className="font-semibold text-xl my-3">Verify Your OTp</h3>
      <OTPInput value={otp} onChange={setOTP} inputClassName={"border-2 focus:outline-blue-500 mb-6 rounded-lg"} autoFocus OTPLength={6} otpType="number" disabled={false} secure inputStyles={{
        height:"2.5rem",
        width:"2.5rem",
      }}/>
     <span className="text-sm text-red-500 m-1 cursor-pointer">OTP expire in 2 min</span>
        <button onClick={handleVerify} className="float-end my-4 bg-blue-600 font-semibold text-white w-32 h-10 rounded shadow hover:bg-blue-700 duration-300 ">Verify</button>
      </div>
    </div>
  )
}

export default Otp_Verify
