import { useNavigate } from "react-router-dom"


const Home = () => {
  const navigate=useNavigate()
  return (
    <div className='h-screen w-screen bg-zinc-100'>
        <div className='w-full h-16 bg-white shadow px-10 flex justify-between items-center'>
           <h2 className='font-semibold text-2xl'>LOGO</h2>
           <button onClick={()=>{
            localStorage.removeItem('auth')
               navigate('/')
           }} className='bg-blue-500 rounded p-2 text-white font-semibold'>Logout</button>
        </div>
    </div>
  )
}

export default Home
