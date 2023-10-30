import React from 'react'
import { SimpleRegistrationForm } from '../../components/Signupform/Signup'
import { CommonNavbar } from '../../components/navbar/CommonNavbar'
import { Footer } from '../../components/Footer/Footer'
import { GoogleLogin } from '@react-oauth/google'





function Signup() {

  
  return (
    <div>
        <CommonNavbar/>
        
        <SimpleRegistrationForm></SimpleRegistrationForm>
        
       
        <Footer/>
    </div>
  )
}

export default Signup
