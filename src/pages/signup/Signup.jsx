import React from 'react'
import { SimpleRegistrationForm } from '../../components/Signupform/Signup'
import { CommonNavbar } from '../../components/navbar/CommonNavbar'
import { Footer } from '../../components/Footer/Footer'
import { GoogleLogin } from '@react-oauth/google'
import artisan from "../../assets/images/static/an_artist.jpg"





function Signup() {
  const divStyle = {
    backgroundImage:`url(${artisan})` ,
    backgroundSize: 'cover', 
   
   };

  
  return (
    <div style={divStyle}>
        <CommonNavbar/>
        
        <SimpleRegistrationForm></SimpleRegistrationForm>
        
       
        <Footer/>
    </div>
  )
}

export default Signup
