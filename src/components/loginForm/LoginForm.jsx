import { Card, Input, Button, Typography } from "@material-tailwind/react";
import Loader from "../Loading/Loading";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { userLoginURL } from "../../constants/constants";
import { toast } from "react-toastify";
import jwtDecode from "jwt-decode";
import googleLogo from "../../assets/images/icons/icons8-google.svg";
import { useGoogleLogin } from "@react-oauth/google";
import { userGoogleLogin } from "../../services/userAPIs";




export function LoginForm() {
  
  const navigate = useNavigate();
  const [user, setUser] = useState({ email: "", password: "" });


  const handleForgotPassword = () => {
    
    const dataToSend = { email: user?.email };
    navigate('/forgot_password', {state: { data: dataToSend }});
  };  

// For loading
const [loading, setLoading] = useState(false);
const handleLoading = () => setLoading((cur) => !cur);

// Google Login Handler
const [guser, setgUser] = useState();

const login = useGoogleLogin({
  onSuccess: (codeResponse) => setgUser(codeResponse),
  onError: (error) => console.log("Login Failed:", error),
});

useEffect(() => {
  const log = async () => {
    try {
      if (guser) {
        handleLoading();
        const res = await axios.get(
          `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${guser.access_token}`,
          {
            headers: {
              Authorization: `Bearer ${guser.access_token}`, 
              Accept: "application/json",
            },
          }
        );

        
        const response = await userGoogleLogin(res.data);
        
        const token = JSON.stringify(response.data);

        localStorage.setItem("token", token);
        

        handleLoading();
        toast.success("Signed in with Google..!!")
        navigate("/");
      }
    } catch (err) {
      handleLoading();
      console.log(err);
      if (err.response.data){
        toast.error(err.response.data.email[0])
      }
      else{
        toast.error("Google verification failed..");
      }
      
    }
  };

  log(); // Call the function
}, [guser]);


  // email validation
  const validEmail = (email) => {
    const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return regex.test(email);
  };
  // Form validation
  const validForm = () => {
    if (user.email.trim() == "") {
      toast.error("Email should not be blank");
      return false;
    } else if (!validEmail(user.email.trim())) {
      toast.error("Enter Valid Email ID");
      return false;
    } else if (user.password.trim() == "") {
      toast.error("password should be filled");
      return false;
    }
    return true;
  };

  // Login with details
  const handleLogin = async (e) => {
    if (validForm()) {
      handleLoading();
      try {
        const response = await axios.post(userLoginURL, user);    
        const token = JSON.stringify(response.data);
        const decoded = jwtDecode(token);
        toast.success(`Welcome ${decoded.first_name}..!!`);
        localStorage.setItem("token", token);
        handleLoading();
        if (decoded.is_admin) {
          navigate("/");
        } else {
          navigate("/");
        }
      } catch (error) {
        handleLoading();

        if (error.response.data.detail) {
          toast.error(error.response.data.detail);
        } else {
          toast.error("An error occured , please try again.");
        }
      }
    }
  };

  return (
    <div className="pt-24 flex items-center justify-center">
      {loading && <Loader />}

      <Card className="p-4" color="transparent" shadow={true}>
        <Button
          className="bg-white m-5   flex justify-center align-middle gap-3 p-2 text-gray-600"
          onClick={() => login()}
        >
          {" "}
          <img src={googleLogo} alt="" />{" "}
          <span className="text-xl font-medium normal-case  text-blue-gray-300 ">
            Sign in with Google
          </span>{" "}
        </Button>

        <Typography variant="h4" color="indigo">
          Sign In
        </Typography>
        <Typography color="gray" className="mt-1 font-normal">
          Enter your details.
        </Typography>
        <form className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96">
          <div className="mb-4 flex flex-col gap-6">
            <Input
              size="lg"
              label="Email"
              name="email"
              value={user.email}
              onChange={(e) =>
                setUser({ ...user, [e.target.name]: e.target.value })
              }
            />
            <Input
              type="password"
              size="lg"
              label="Password"
              name="password"
              value={user.password}
              onChange={(e) =>
                setUser({ ...user, [e.target.name]: e.target.value })
              }
            />
          </div>

          <Button
            className="mt-6 bg-pink-800	"
            fullWidth
            onClick={(e) => handleLogin()}
          >
            Login
          </Button>
          <Typography color="gray" className="mt-4 text-center font-normal">
            Forgot Password ?{" "}
            <a href="#" className="font-medium text-light-blue-900" onClick={handleForgotPassword}>
              Reset
            </a>
          </Typography>
          <Typography color="gray" className="mt-4 text-center font-normal">
            Dont have an account ?{" "}
            <a
              href="#"
              className="font-medium text-light-blue-900"
              onClick={() => navigate("/signup")}
            >
              Signup
            </a>
          </Typography>
        </form>
      </Card>
    </div>
  );
}
