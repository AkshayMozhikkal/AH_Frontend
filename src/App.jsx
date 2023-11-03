import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { BrowserRouter } from "react-router-dom";
import Signup from './pages/signup/Signup';
import Login from './pages/login/Login';

import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ConfirmMail from './pages/ConfirmMail';
import ProtectedRoutes from './routes/protected/ProtectedRoutes';
import People from './pages/People/People';
import PeopleProfile from './pages/Profile/PeopleProfile';
import ForgotPasswordForm from './pages/ForgotPassword';

 


function App() {
  
  return (
    <>
      
       <BrowserRouter>
          <Routes>

            <Route path='/*' element={<ProtectedRoutes /> }> </Route> 

            <Route Component={Signup}  path ='/signup'/>
            <Route Component={Login}  path ='/login'/>
            <Route Component={ConfirmMail}  path='/confirm'/>
            <Route element={<People/> } path = '/people' />
            <Route element={<PeopleProfile/> } path = '/user_profile/:userID' />
            <Route element={<ForgotPasswordForm />} path ='/forgot_password'/>
            
   
        </Routes>
      
      </BrowserRouter>
     
      <ToastContainer/>
   
    </>
    
  )
}

export default App
