import toast from "react-hot-toast"
import { Navigate } from "react-router-dom"


const Error_Page = () => {
 const token=localStorage.getItem('auth')
 if(token){
   toast.error('Please enter Valide url')
    return <Navigate to={'/home'}/>
 }else{
   toast.error('Please enter Valide url')
    return <Navigate to={'/'}/>
 }
}

export default Error_Page
