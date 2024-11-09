const LoginValidate=async(email,password,code,capta,setValidate)=>{
     if(email.length==0 || email.length < 6){
       setValidate({email:"please enter valide email"})
       return false
      }else setValidate({email:""})
      if(password.length==0 || password.length < 6){
       setValidate({password:"Password atlist 6 charectetr"})
       return false
      }else setValidate({password:""})
     
      if(code.length==0 || capta !==code){
       setValidate({code:"Please enter valide capta code"})
       return false
      }else setValidate({code:""})
   return true
}

export default LoginValidate
