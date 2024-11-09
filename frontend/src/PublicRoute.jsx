/* eslint-disable react/prop-types */
import { Navigate } from "react-router-dom"


const PublicRoute = ({children}) => {
 const token=localStorage.getItem('auth')
 if(!token) return children
 else return <Navigate to={'/home'}/>
}

export default PublicRoute
