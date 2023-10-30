import React from "react";
import { LoginForm } from "../../components/loginForm/LoginForm";
import { CommonNavbar } from "../../components/navbar/CommonNavbar";
import { Footer } from "../../components/Footer/Footer";

function Login() {
  return (
    <div>
      <CommonNavbar />
      <LoginForm></LoginForm>
      <Footer />
    </div>
  );
}

export default Login;
