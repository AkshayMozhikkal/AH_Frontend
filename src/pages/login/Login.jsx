import React from "react";
import { LoginForm } from "../../components/loginForm/LoginForm";
import { CommonNavbar } from "../../components/navbar/CommonNavbar";
import { Footer } from "../../components/Footer/Footer";
import artist from "../../assets/images/static/an_artist.jpg"



function Login() {
  const divStyle = {
    backgroundImage:`url(${artist})` ,
    backgroundSize: 'cover', 
   };
   
  return (
    <div style={divStyle}  > 
      <CommonNavbar />
      <LoginForm></LoginForm>
      <Footer />
    </div>
  );
}

export default Login;
