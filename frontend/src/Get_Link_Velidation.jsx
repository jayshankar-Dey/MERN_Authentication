

const Get_Link_Velidation = (email,code,capta,setValidate) => {
    if(email.length==0 || email.length < 6){
        setValidate({email:"please enter valide email"})
        return false
       }else setValidate({email:""})

       if(code.length==0 || capta !==code){
        setValidate({code:"Please enter valide capta code"})
        return false
       }else setValidate({code:""})

       return true
}

export default Get_Link_Velidation
