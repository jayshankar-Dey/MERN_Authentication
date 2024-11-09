

const Forgate_Password_Validation = (password,cnfpassword,setValidate) => {
        if(password.length==0 || password.length < 6){
         setValidate({password:"Password atlist 6 charectetr"})
         return false
        }else setValidate({password:""})
        if(cnfpassword.length==0 || cnfpassword.length < 6 || cnfpassword !==password){
         setValidate({cnfpassword:"Password and CnfPassword are not match"})
         return false
        }else setValidate({cnfpassword:""})

        return true
}

export default Forgate_Password_Validation
