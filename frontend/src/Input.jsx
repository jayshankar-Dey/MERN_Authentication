/* eslint-disable react/prop-types */
import { useState } from "react"


const Input = ({type,label,placeholder,onChange,value,velidate}) => {
    const [seen,setseen]=useState(false)
  return (
   <>
   {
    type=="password"? <div className="flex flex-col gap-y-2 relative">
    <label htmlFor="password" className="font-semibold">{label}</label>
     <input type={`${seen?"text":"password"}`} value={value} onChange={(e)=>onChange(e.target.value)} name="" id="password" placeholder="********************" className={`border ${velidate&&"border-2 border-red-500"} h-14 px-6 focus:outline-green-800`} required/>
     <button type="button" onClick={()=>setseen(!seen)} className="absolute top-12 right-2 text-xl">{seen?<ion-icon name="eye-outline"></ion-icon>:<ion-icon name="eye-off-outline"></ion-icon>}</button>
     { velidate&&<span className="text-sm text-red-500">{velidate}</span>}
     </div>: <div className="flex flex-col gap-y-2">
    <label htmlFor="name" className="font-semibold">{label}</label>
<input type={type} name="" id="name" value={value} placeholder={placeholder} onChange={(e)=>onChange(e.target.value)} className={`border ${velidate&&"border-2 border-red-500"} h-14 px-6 focus:outline-green-800`} required/>
  { velidate&&<span className="text-sm text-red-500">{velidate}</span>}
   </div>
   }
   </>

  )
}

export default Input
