import { useEffect, useState } from "react"
import Input from "./Input"
import Get_Link_Velidation from "./Get_Link_Velidation"
import toast from "react-hot-toast"
import axios from "axios"
import { CircularProgress } from "@mui/material"


const Get_ForgetPassword_Link = () => {

    const[refress,setRefress]=useState(false)
    const[capta,setCapta]=useState("")
    const [loading,setLoading]=useState(false)
    ///login
    const [email,setEmail]=useState("")
    const [code,setCode]=useState("")

    const [velidate,setValidate]=useState({
      email:"",
      code:""
    })


    useEffect(() => {
        const code=Math.random().toString(36).substring(2,8)
        setCapta(code)
    }, [refress])

    const HandleSubmit=async(e)=>{
      e.preventDefault()
       const valide=await Get_Link_Velidation(email,code,capta,setValidate)
       console.log(valide)
       setRefress(!refress)
      if(valide){
       setLoading(true)
        const res=await axios.post('http://localhost:8800/api/v1/get/link/forgate',{email})
        console.log(res.data.url)
     if(res.data.success){
          toast.success(res.data.message)
          setEmail("")
          setCode("")
          setRefress(false)
          setLoading(false)
        }else{
          toast.error(res.data.message)
          setLoading(false)
       }
      }else return setLoading(false)
    }
  return (
    <div className="h-screen w-screen flex justify-center items-center">
      <div className=" h-screen w-screen bg-zinc-100 flex justify-center items-center">
      <form onSubmit={HandleSubmit} className="w-[30rem] h-fit p-3 bg-white flex-col shadow rounded  ">
      <img src="https://media.istockphoto.com/id/1201144331/vector/icon-design-element-logo-for-technology-innovation-company-tech-icon-and-symbol.jpg?s=612x612&w=0&k=20&c=Q-zPPtCY9aNohWqcUTB-rEBSd3xoC6fqSEgWDgulrf8=" className="h-24" alt="" />
        <h3 className="font-semibold text-xl my-3">Forget password link</h3>
        
        <Input  label={"Enter Email:"} placeholder={"Enter Email"}onChange={setEmail} type={"email"}  value={email} velidate={velidate.email}/>


   <div className="flex flex-col mt-3">
      <div className="flex gap-x-3 mb-1">
         <div className="w-32 select-none h-10 flex justify-center items-center font-semibold  border bg-zinc-900 text-white rounded">
               {capta}
         </div>
         <button type="button" onClick={()=>setRefress(!refress)} className={`duration-200 text-xl ${refress&&"Zoom-180"}`}><ion-icon name="refresh-outline"></ion-icon></button>
      </div>
        <Input  label={"Enter Capta:"} placeholder={capta} onChange={setCode} value={code} type={"text"} velidate={velidate.code}/>
   </div>


        {loading?<button disabled className="float-end my-4 bg-blue-600 font-semibold text-white w-32 h-10 rounded shadow hover:bg-blue-700 duration-300 "><CircularProgress variant="determinate" size={22}  value={100} /></button>:<button className="float-end my-4 bg-blue-600 font-semibold text-white w-32 h-10 rounded shadow hover:bg-blue-700 duration-300 ">GetLink</button>}
      </form>
    </div>
    </div>
  )
}

export default Get_ForgetPassword_Link
