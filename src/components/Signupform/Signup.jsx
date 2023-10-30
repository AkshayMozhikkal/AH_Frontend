import React, { useState } from 'react'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import axios from "axios";


import {
    Card,
    Input,
    Checkbox,
    Button,
    Typography,
    
  } from "@material-tailwind/react";
import { userRegisterURL } from '../../constants/constants';
import Loader from '../Loading/Loading';



   
  export function SimpleRegistrationForm() {
    
    const navigate = useNavigate()

    const [other, setOther] = useState({Conf_Password:"", check: false})

    const [formData, setFormData] = useState({
      first_name : "",
      last_name : "",
      username : "",
      email : "",
      password : "",
      is_artisan : false
    })

    // For Google Login
    const [ user, setUser ] = useState([]);
   

    //  For loading
    const [loading, setLoading] = useState(false);
    const handleLoading = () => setLoading((cur) => !cur);


    // Email Validation Handler
    const validEmail = (email)=>{
      const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
      return regex.test(email);
    }


   // Form Data Validation Handler
    const validForm = (e) => {
      if (formData.first_name.trim()==""){ 
        toast.error("First name should not be empty.!")
        return false;
      }
      else if(formData.last_name.trim()==""){
        toast.error("Last name should not be empty.!")
        return false;
      }
      else if(formData.last_name.trim()==""){
        toast.error("Last name should not be empty.!")
        return false;
      }
      else if(formData.username.trim()==""){
        toast.error("Username should not be empty.!")
        return false;
      }
      else if(formData.email.trim()==""){
        toast.error("Email should not be empty.!")
        return false;
      }
      else if(!validEmail(formData.email.trim())){
        toast.error("Enter valid email.!")
        return false;
      }
      else if(formData.password.trim()==""){
        toast.error("Password should not be empty.!")
        return false;
      }
      else if(other.Conf_Password.trim()==""){
        toast.error("Please confirm Password.!")
        return false;
      }
      else if(formData.password != other.Conf_Password){
        toast.error("Password Missmatch.!")
        return false;
      }
      else if(!other.check){
        toast.error("Please agree T&C..!")
        return false;
      }
    
      return true;
    }


  // Form submit Handler

    const handleSubmit = async (e) => {
      
      if(validForm()){

        handleLoading();

        try {
          const response = await axios.post(userRegisterURL, formData);
          
         
          toast.success("Registration Success..!!");
          
          
          setFormData({
            first_name : "",
            last_name : "",
            username : "",
            email : "",
            password : "",
            is_artisan : false
          })
          setOther({Conf_Password:"", check: false})
          handleLoading();
          navigate("/confirm")

        }catch (error){
          handleLoading();
          if (error.response.data){
            console.log(error.response.data)
            if (error.response.data.email){
              toast.error(error.response.data.email[0])
            }
            if (error.response.data.username){
              toast.error(error.response.data.username[0])
            }
          }
          else{
            toast.error("An error occurred during registration..!");
          }
        }
      }
    }

 

    return (
      <div className='h-screen  flex items-center justify-center '>
        {loading && <Loader />}
      <Card className='p-5' color="transparent" shadow={true}>
        <Typography variant="h4" color="light-blue">
          Sign Up
        </Typography>
        <Typography color="gray" className="mt-1 font-normal">
          Enter your details to register.
        </Typography>
        <form className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-auto" >
          <div className="mb-4 flex flex-col gap-6 ">
            <div className=" flex flex-row  gap-6">
              <Input size="lg" label="First name" value={formData.first_name} name='first_name' onChange={(e)=>{setFormData({...formData,[e.target.name]:e.target.value})}} />
              <Input size="lg" label="Last name" value={formData.last_name} name='last_name' onChange={(e)=>{setFormData({...formData,[e.target.name]:e.target.value})}} />
            </div>
            <div className="flex flex-row gap-6">
              <Input size="lg" label="Username" value={formData.username} name='username' onChange={(e)=>{setFormData({...formData,[e.target.name]:e.target.value})}} />
              <Input size="lg" label="Email" value={formData.email} name='email' onChange={(e)=>{setFormData({...formData,[e.target.name]:e.target.value})}} />
            </div> 
            <div className="mb-4 flex flex-row gap-6">
              <Input type="password" size="lg" value={formData.password} label="Password" name='password' onChange={(e)=>{setFormData({...formData,[e.target.name]:e.target.value})}} />
              <Input type="password" size="lg" value={other.Conf_Password} label="Confirm Password" name='Conf_Password' onChange={(e)=>{setOther({...other, [e.target.name]:e.target.value})}}   />
            </div>  
          </div>
          <Checkbox
            name='is_artisan'
            onChange={(e)=>{setFormData({...formData,[e.target.name]: e.target.checked})}}
            label={
              <Typography
                variant="small"
                color="gray"
                className="flex items-center font-normal"
              >
                Are You an Artisan ?
                
              </Typography>
            }
            containerProps={{ className: "-ml-2.5" }}
          />
          <Checkbox
          name='check'
          onChange={(e)=>{setOther({...other,[e.target.name]:e.target.checked})}}
            label={
              <Typography
                variant="small"
                color="gray"
                className="flex items-center font-normal"
                
              >
                I agree the
                <a
                  href="#"
                  className="font-medium transition-colors hover:text-gray-900"
                >
                  &nbsp;Terms and Conditions
                </a>
              </Typography>
            }
            containerProps={{ className: "-ml-2.5" }}
          />

          <Button className="mt-6 bg-deep-purple-700" fullWidth
          onClick={(e)=>{handleSubmit()}}

          
          >
            Register
          </Button>
         

          <Typography color="gray" className="mt-4 text-center font-normal">
            Already have an account?{" "}
            <a href="#" className="font-medium text-blue-700" onClick={(e)=>{navigate("/login")}}>
              Sign In
            </a>
          </Typography>
          
          
        </form>
              
        
      </Card>
    </div>

    );
  }


