import { useState } from "react"
import Input from "./Input"
import Forgate_Password_Validation from "./Forgate_Password_Validation"
import toast from "react-hot-toast"
import axios from "axios"
import { CircularProgress } from "@mui/material"
import {  useNavigate, useParams } from "react-router-dom"
const Forgate_Password = () => {
    const [password,setPassword]=useState("")
    const [cnfpassword,setCnfpassword]=useState("")

    const{token,id}=useParams()

    const navigate=useNavigate()

    const [velidate,setValidate]=useState({
        password:"",
        cnfpassword:""
      })
  const[loading,setLoading]=useState(false)

    const HandleSubmit=async(e)=>{
     e.preventDefault()
     const valide =await Forgate_Password_Validation(password,cnfpassword,setValidate)
     if(valide){
      setLoading(true)
       const res=await axios.post('http://localhost:8800/api/v1/forgate/password',{password,cnfpassword,token,id})
       console.log(res.data.url)
    if(res.data.success){
         toast.success(res.data.message)
         setPassword("")
         setCnfpassword("")
         setLoading(false)
         navigate('/')
       }else{
         toast.error(res.data.message)
         setLoading(false)
      }
     }else return setLoading(false)
    }

  return (
    <div className="h-screen w-screen flex justify-center items-center">
    <div className=" h-screen w-screen bg-zinc-100 flex justify-center items-center">
    <form onSubmit={HandleSubmit} className="w-[30rem]  h-fit p-3 bg-white flex-col shadow rounded  ">
    <img src="https://media.istockphoto.com/id/1201144331/vector/icon-design-element-logo-for-technology-innovation-company-tech-icon-and-symbol.jpg?s=612x612&w=0&k=20&c=Q-zPPtCY9aNohWqcUTB-rEBSd3xoC6fqSEgWDgulrf8=" className="h-24" alt="" />
      <h3 className="font-semibold text-xl mb-7">Forget password</h3>
      
      <Input label={"Enter Password:"} placeholder={"************"} onChange={setPassword} type={"password"} value={password} velidate={velidate.password}/>
  
    <Input label={"Enter cnfPassword:"} placeholder={"**********"} onChange={setCnfpassword} type={"password"} value={cnfpassword} velidate={velidate.cnfpassword}/>


      {
        loading?<button disabled className="float-end my-4 bg-blue-600 font-semibold text-white w-32 h-10 rounded shadow hover:bg-blue-700 duration-300 "><CircularProgress variant="determinate" size={22}  value={100} /></button>:<button className="float-end my-4 bg-blue-600 font-semibold text-white w-32 h-10 rounded shadow hover:bg-blue-700 duration-300 ">Forgate</button>
      }
      
    </form>
  </div>
  </div>
  )
}

export default Forgate_Password
