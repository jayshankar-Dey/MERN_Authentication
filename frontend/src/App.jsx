import { lazy } from "react"
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import  { Toaster } from 'react-hot-toast';
import ProtectedRoute from "./ProtectedRoute";
import PublicRoute from "./PublicRoute";
const Login =lazy(()=>import("./Login"))
const Register=lazy(()=>import("./Register"))
const Otp_Verify =lazy(()=>import('./Otp_Verify'))
const Get_ForgetPassword_Link =lazy(()=>import('./Get_ForgetPassword_Link'))
const Forget_Password =lazy(()=>import('./Forgate_Password'))
const Home=lazy(()=>import('./Home'))
const Verify_Email=lazy(()=>import('./Verify_Email'))
const Error_Page=lazy(()=>import('./Error_Page'))
const App = () => {
  return (
    <BrowserRouter>
    <Toaster/>
      <Routes>
        <Route path="/home" element={<ProtectedRoute><Home /></ProtectedRoute>} />
        <Route path="/" element={<PublicRoute><Login /></PublicRoute>} />
        <Route path="/register" element={<PublicRoute><Register /></PublicRoute>} />
        <Route path="/otp/:token?/:id?" element={<PublicRoute><Otp_Verify /></PublicRoute>} />
        <Route path="/get/link/forget/password" element={<PublicRoute><Get_ForgetPassword_Link /></PublicRoute>} />
        <Route path="/forget/password/:token?/:id?" element={<PublicRoute><Forget_Password /></PublicRoute>} />
        <Route path="/:token?" element={<PublicRoute><Verify_Email /></PublicRoute>} />
        <Route path="*" element={<PublicRoute><Error_Page /></PublicRoute>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
