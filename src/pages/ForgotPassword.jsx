import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { userBaseURL } from '../constants/constants';
import { CommonNavbar } from '../components/navbar/CommonNavbar';
import { Footer } from '../components/Footer/Footer';
import { useLocation } from 'react-router-dom';
import { Button } from '@material-tailwind/react';
import { Input } from 'postcss';


const ForgotPasswordForm = () => {
  const location = useLocation()
  const data = location.state && location.state.data;
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(`${userBaseURL}password_reset/`, { email });
      if (response.status === 200) {
        setMessage('Password reset email sent.');
      } else {
        setMessage('Password reset request failed. Please check your email address.');
      }
    } catch (error) {
        console.log(error);
      setMessage('An error occurred while sending the request.');
    }
  };

  useEffect(()=>{
    console.log(data,"uselocationnnnnnemail");
    if (data && data.email){
        
        setEmail(data.email)
    }
  },[])

  return (
    <div>
        <CommonNavbar/>
        <div className='container flex justify-center items-center m-10 mt-20'>
            <div className=' p-10 rounded-lg border-2 shadow-2xl shadow-blue-500 '>
                <p className='mb-5 text-lg font-bold'>Forgot Password</p>
                <form onSubmit={handleSubmit}>
                   
                   
                    <input
                        className='m-4 rounded-full p-3 border border-gray-100  shadow-xl w-full'
                        placeholder='Email'
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    
                    <Button type="submit" className='bg-green-500 mx-10'>Reset Password</Button>
                </form>
                <p>{message}</p>
            </div>
        </div>
     
      <Footer/>
    </div>
  );
};

export default ForgotPasswordForm;
