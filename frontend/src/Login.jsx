import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import Input from "./Input"
import LoginValidate from "./LoginValidate"
import axios from 'axios'
import toast from "react-hot-toast";
import { CircularProgress } from "@mui/material"

const Login = () => {
  const navigate=useNavigate()
    const[loading,setLoading]=useState(false)
    const[refress,setRefress]=useState(false)
    const[capta,setCapta]=useState("")
    ///login
    const [email,setEmail]=useState("")
    const [password,setPassword]=useState("")
    const [code,setCode]=useState("")

    const [velidate,setValidate]=useState({
      email:"",
      password:"",
      code:""
    })


    useEffect(() => {
        const code=Math.random().toString(36).substring(2,8)
        setCapta(code)
    }, [refress])

    const HandleSubmit=async(e)=>{
      e.preventDefault()
     try {
      setRefress(!refress)
       const valide=await LoginValidate(email,password,code,capta,setValidate)
       if(valide){
        setLoading(true)
            const res=await axios.post(`http://localhost:8800/api/v1/login`,{email,password})
            if(res.data.success){
               setLoading(false)
               toast.success(res.data.message)
               localStorage.setItem('auth',res.data.token)
               navigate('/home')
            }else{
              setLoading(false)
              toast.error(res.data.message)
            }
       }else return
     } catch (error) {
      console.log(error)
      setLoading(false)
     }

    }
  return (
 
  
    <div className="w-full z-30 h-full p-12  bg-zinc-100 flex justify-center items-center overflow-scZoom">
   
   <div className="w-[30rem] flex flex-col h-fit bg-white rounded shadow">



<div>
  <img src="https://media.istockphoto.com/id/1201144331/vector/icon-design-element-logo-for-technology-innovation-company-tech-icon-and-symbol.jpg?s=612x612&w=0&k=20&c=Q-zPPtCY9aNohWqcUTB-rEBSd3xoC6fqSEgWDgulrf8=" className="h-24" alt="" />
</div>
 
 <div className="p-4 ">
   <h2 className="font-semibold text-2xl">Login your Account</h2>
   <p className="text-sm text-zinc-800">Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam, porro!</p>
 </div>

 <form onSubmit={HandleSubmit} className="flex flex-col p-4 gap-y-4 *:outline-none ">
  
  <Input  label={"Enter Email:"} placeholder={"Enter Email"}onChange={setEmail} type={"email"}  value={email} velidate={velidate.email}/>

  <Input  label={"Enter Password:"} placeholder={"Enter Email"} onChange={setPassword} value={password} type={"password"} velidate={velidate.password}/>


   <div className="flex flex-col ">
      <div className="flex gap-x-3 mb-1">
         <div className="w-32 select-none h-10 flex justify-center items-center font-semibold  border bg-zinc-900 text-white rounded">
               {capta}
         </div>
         <button type="button" onClick={()=>setRefress(!refress)} className={`duration-200 text-xl ${refress&&"Zoom-180"}`}><ion-icon name="refresh-outline"></ion-icon></button>
      </div>
        <Input  label={"Enter Capta:"} placeholder={capta} onChange={setCode} value={code} type={"text"} velidate={velidate.code}/>
   </div>

    
    <div className="flex justify-between  cursor-pointer">
      <div className="gap-x-4 flex items-center">
      <label htmlFor="check" className="font-semibold">Remember me</label>
      <input type="checkbox" id="check" className="h-6 w-6 text-green-500" required/>
      </div>

      <div>
          <Link to={`/get/link/forget/password`} className="text-sm text-blue-600  underline underline-offset-4">Forgot Password?</Link>
      </div>
    </div>


   <div className="flex justify-between gap-x-4 my-1">
      <Link to={'/register'} className="text-sm underline underline-offset-2">Not Any Account please <span className="text-blue-600">Register</span></Link>
      {
          loading?<button type="submit" disabled className=" bg-green-500 w-36 font-semibold text-white py-2 px-6 shadow-lg rounded-md hover:bg-green-600 flex justify-center items-center"><CircularProgress variant="determinate" size={22}  value={100} /></button>:<button type="submit" className=" bg-green-500 w-36 font-semibold text-white py-2 px-6 shadow-lg rounded-md hover:bg-green-600">Login</button>
         }
   </div>

 </form>
  
  <div className="flex justify-center font-semibold gap-3 p-3 items-center">
      <span className="w-full h-[.05rem] bg-zinc-400"></span><span>or</span><span className="w-full h-[.05rem] bg-zinc-400"></span>
  </div>



<div className="pb-10 flex flex-col gap-y-5">

   <button  onClick={()=>{window.open("http://localhost:8800/api/v1/auth/google","_self")}} className="flex gap-x-3 justify-start p-3 items-center mx-auto w-96 h-12 border rounded cursor-pointer shadow">
    <img src="https://cdn-icons-png.flaticon.com/512/2702/2702602.png" alt="" className="h-7" />
    <h3>Continue with Google</h3>
   </button>

   <button onClick={()=>{window.open("http://localhost:8800/api/v1/auth/facebook","_self")}} className="flex gap-x-3 justify-start p-3 items-center mx-auto w-96 h-12 border rounded cursor-pointer shadow">
    <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b8/2021_Facebook_icon.svg/1200px-2021_Facebook_icon.svg.png" alt="" className="h-7" />
    <h3>Continue with Facebook</h3>
   </button>


</div>


</div>
    </div>
   
  )
}

export default Login
