/* eslint-disable react/prop-types */

import { Navigate } from "react-router-dom"


const ProtectedRoute = ({children}) => {
  const token = localStorage.getItem('auth')
  if (!token){
     return <Navigate to={'/'}/>
    }
  else {
    return children
  }
}

export default ProtectedRoute
