import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { userBaseURL } from '../constants/constants';
import { CommonNavbar } from '../components/navbar/CommonNavbar';
import { Footer } from '../components/Footer/Footer';
import { useNavigate } from 'react-router-dom';
import { Button } from '@material-tailwind/react';
import { toast } from 'react-toastify';


const ResetPassword = () => {
  
  const [token, setToken] = useState('');
  const navigate = useNavigate()
  const [key, setKey] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState('');
  const [confPassword, setConfPassword] = useState('');
  const [message, setMessage] = useState({style:'text-blue-600 font-serif mt-4 hover:text-deep-orange-400',msg:''});
  const [loading, setLoading] = useState(false);

  const handleLoading = ()=> setLoading((cur)=>!cur)
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    if(password != confPassword){
      setMessage({msg:"Password Missmatch, please verify..!", style:'text-orange-400 font-serif mt-4 hover:text-deep-orange-400'})
      return
    }
    handleLoading();
    try {
      const response = await axios.post(`${userBaseURL}reset-password/${key}/${token}`, {password:password});
      if (response.status === 200) {
        setMessage({msg:`Password reset Success..!! Now go Back and Login..!!`, style:'text-green-500 font-serif mt-4 hover:text-deep-orange-400'});
        handleLoading()
        toast.success("Password reset Success..! Please Login now..!!")
        navigate("/login")
      } else {
        setMessage({msg:`Password reset Failed.. Please try again..!!`, style:'text-red-400 font-serif mt-4 hover:text-deep-orange-400'});
        handleLoading()
      }
    } catch (error) {
        console.log(error);
      setMessage({msg:error.response.data.message, style:'text-red-400 font-serif mt-4 hover:text-deep-orange-400'});
      handleLoading()
    }
  };

  useEffect(()=>{        
    const queryParams = new URLSearchParams(window.location.search);

    const key = queryParams.get('key');
    const t = queryParams.get('t');
    setToken(t)
    setKey(key)
    console.log('key:', key);
    console.log('token:', t);
    
  },[])

  return (
    <div>
        <CommonNavbar/>
        <div className='container flex justify-center items-center m-10 mt-20'>
            <div className=' p-10 rounded-lg border-2 shadow-2xl shadow-blue-500 '>
                <p className='mb-5 text-lg font-bold'>Reset Password</p>
                <div className="flex  justify-center items-center">
              <span
                  onClick={() => setShowPassword(!showPassword)}
                  className="mt-4 ml-2  transform -translate-y-1/2 cursor-pointer"
                >
                  {showPassword ? <i className="text-blue-700 fas fa-eye"></i> : <i className=" fas fas-solid fa-eye"></i>}
                  
                </span>


              </div>
                <form onSubmit={handleSubmit}>
                   
                   
                    <input
                        className='m-4 rounded-full p-3 border border-gray-100  shadow-xl w-full'
                        placeholder='New Password'
                        type={showPassword ? "text" :"password"}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <input
                        className='m-4 rounded-full p-3 border border-gray-100  shadow-xl w-full'
                        placeholder='Confirm New Password'
                        type={showPassword ? "text" :"password"}
                        value={confPassword}
                        onChange={(e) => setConfPassword(e.target.value)}
                    />
                    
                    <Button type="submit" className='bg-green-500 mx-10'>{loading ? `Sending Mail..` :`Reset Password`}</Button>
                </form>
                <p className={message.style}>{message.msg}</p>

            </div>
        </div>
     
      <Footer/>
    </div>
  );
};

export default ResetPassword;