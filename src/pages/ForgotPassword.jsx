import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { userBaseURL } from '../constants/constants';
import { CommonNavbar } from '../components/navbar/CommonNavbar';
import { Footer } from '../components/Footer/Footer';
import { useLocation } from 'react-router-dom';
import { Button } from '@material-tailwind/react';


const ForgotPasswordForm = () => {
  const location = useLocation()
  const data = location.state && location.state.data;
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [laoding, setLoading] = useState(false);

  const handleLoading = ()=> setLoading((cur)=>!cur)

  const handleSubmit = async (e) => {
    e.preventDefault();
    handleLoading();

    try {
      const response = await axios.post(`${userBaseURL}forgotpassword/`, { email:email });
      if (response.status === 200) {
        setMessage(`Password reset email sent. check your mailbox (${email})`);
        handleLoading()
      } else {
        setMessage('Password reset request failed. Please check your email address.');
        handleLoading()
      }
    } catch (error) {
        console.log(error);
      setMessage(error.response.data.message);
      handleLoading()
    }
  };

  useEffect(()=>{
    
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
                    
                    <Button type="submit" className='bg-green-500 mx-10'>{laoding ? `Sending Mail..` :`Reset Password`}</Button>
                </form>
                <p className='text-blue-600 font-serif mt-4 hover:text-deep-orange-400'>{message}</p>
            </div>
        </div>
     
      <Footer/>
    </div>
  );
};

export default ForgotPasswordForm;
