const formValidation=async(name,email,password,cnfpassword,code,capta,setValidate)=>{
    if(name.length==0 || name.length < 3){
      setValidate({name:"name atlist 3 charectetr"})
      return false
     }else setValidate({name:""})
     if(email.length==0 || email.length < 6){
       setValidate({email:"please enter valide email"})
       return false
      }else setValidate({email:""})
      if(password.length==0 || password.length < 6){
       setValidate({password:"Password atlist 6 charectetr"})
       return false
      }else setValidate({password:""})
      if(cnfpassword.length==0 || cnfpassword.length < 6 || cnfpassword !==password){
       setValidate({cnfpassword:"Password and CnfPassword are not match"})
       return false
      }else setValidate({cnfpassword:""})
      if(code.length==0 || capta !==code){
       setValidate({code:"Please enter valide capta code"})
       return false
      }else setValidate({code:""})
   return true
}

export default formValidation
