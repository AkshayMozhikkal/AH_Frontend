import React, { useEffect, useState } from 'react'
import { Footer } from '../../components/Footer/Footer'
import { Sidebar } from '../../components/sidebar/Sidebar'
import { Avatar } from '@material-tailwind/react'
import {
  Card,
  CardHeader,
  CardBody,
  Typography,
  Button,
} from "@material-tailwind/react";
import { useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import { userBaseURL } from '../../constants/constants'
import axios from 'axios'
import { useNavigate } from "react-router-dom";
import { Navbarr } from '../../components/navbar/Navbar';




function MyConnections() {

  const [connections, setConnections] = useState([])
  const [pending, setPending] = useState([])
  const [connected, setConnected] = useState([])
  const [updated, setUpdated] = useState(false)

  const navigate = useNavigate();

  const loginedUser = useSelector((state)=> state.user.userInfo)

  const handleUpdate = ()=> setUpdated((cur) => !cur);

  // Fetch Conections of User
    const fetchConnections = async ()=>{
      try {
        const res = await axios.get(`${userBaseURL}connections/user_connections/${loginedUser.id}`)
       
        setConnections(res.data)
        
      } catch (error) {
        console.log(error,"fetchConnectionsError");      
      }
    } 

     // Remove Connection
     const removeConnection = async (id) =>{
      try {
        const res = axios.delete(`${userBaseURL}connections/remove_connection/${id}/`)
       
        handleUpdate();
        toast.info("Rejected")
        
        
      } catch (error) {
        console.log(error, 'removeconnectionerror');
        toast.error("Please try again..")       
      }
    }
      
    // Approve Connection
    const approveConnection = async (connection) =>{
      console.log(connection.id,"connectionID");
      try {
        const res = axios.put(`${userBaseURL}connections/connection_handle/${connection.id}/`,{...connection,status:"a"})
           
        handleUpdate();
        toast.info("Accepted")
        
        
      } catch (error) {
        console.log(error, 'acceptconnectError');
        toast.error("Please try again..")
        // handleUpdate();
        
      }
    }  

  // UseEffects
  useEffect(()=>{
    fetchConnections();
  },[updated])

  useEffect( ()=>{
    if(connections) {
    const aConn = connections.filter((item)=>{if(item.status ==='a'){return item}})
   
    setConnected(aConn);
    const pConn = connections.filter((item)=>{if(item.status ==='p' && item.to_users['id']===loginedUser.id){return item}})
   
    setPending(pConn);
  }   
  },[connections, updated])


  return (
    <div>
      <Navbarr />
      <div className='flex mt-24 mx-36'>
        <Sidebar selected={"Connections"}/>
        <div className='flex-col w-full p-2 shadow-2xl border-2 max-h-[850px] overflow-y-scroll '>
          <div className='bg-white w-full pt-5 rounded-md mt-2  h-auto max-h-[300px] overflow-y-scroll'>
            <div className='pb-3'>
              <h4 className='text-xl pl-3 pb-2 border-blue-600 border-b-4 mx-3'>
              Pending Approvals
              </h4>
            </div>
            <div className='w-full bg-white '>

              {pending && pending.length > 0 ? 
                pending.map((pend)=>{
                  return(
              <div className='flex mr-40 ml-10 h-16 mb-3 rounded-xl p-5 items-center justify-between bg-gray-50'>
                <div><Avatar variant="circular"
                  size="md"
                  alt="tania andrew"
                  className="border border-gray-900 p-0.5"
                  src={pend.from_users.profile_image}/></div>
                <div className='font-serif text-lg'>{pend.from_users.first_name} {pend.from_users.last_name}</div>
                <div className='flex gap-4'>
                  <button className='border-blue-400 border-2 text-blue-400 rounded-full p-2 text-sm hover:bg-gray-100'
                  onClick={()=>approveConnection(pend)}>Accept</button>
                  <button className='border-gray-700 border-2 text-gray-700 rounded-full p-2 text-sm hover:bg-gray-100'
                  onClick={()=>removeConnection(pend.id)}>Decline</button>
                </div>
              </div>)})
              
              
              : <h6 className='ml-10 mt-5 mb-10'>No Requests pending...</h6> }      
              
            </div>

          </div>
          <div className='bg-white w-full pt-5 h-auto max-h-[500px] rounded-md mt-4  overflow-y-scroll'>
            <div className='flex justify-between  border-blue-600 border-b-4'>
              <h4 className='flex justify-between text-xl mb-2 pl-2 w-full mx-3'>
              Your Connections
              </h4>
              <input className='mr-20 border-none shadow-2xl  w-56 h-7'/>
              
            </div>
            <div className='flex flex-wrap w-full p-6 gap-3 bg-white'>
              
              {connected && connected.length >0 ? 
              connected.map((conn)=>{

                return (
                  <div className=" w-64 h-80 mb-7">
                    {conn.from_users.id == loginedUser.id ? 
                    <Card className="w-auto bg-white-50">
                      <CardHeader floated={false} className="h-44" >
                        <img src={conn.to_users.profile_image} className="h-auto w-auto" alt="profile-picture" />
                      </CardHeader>
                      <CardBody className="text-center">
                        <Typography variant="h5" color="blue-gray" className="mb-1">
                        {conn.to_users.first_name} {conn.to_users.last_name} 
                        </Typography>
                        <Typography
                          color="blue-gray"
                          className="font-medium"
                          textGradient
                        >
                          {conn.to_users.username}
                        </Typography>
                        <Button className="mt-2 bg-transparent rounded-full normal-case font-normal border-2 border-blue-100 text-blue-800"
                        onClick={()=>navigate(`/user_profile/${conn.to_users.id}`)}
                        >
                          Profile  <i class="fas fa-sharp fa-light fa-user"></i></Button>
                      </CardBody>
                    </Card>
                    : 
                    <Card className="w-auto bg-white-50">
                      <CardHeader floated={false} className="h-44" >
                        <img src={conn.from_users.profile_image} className="h-auto w-auto" alt="profile-picture" />
                      </CardHeader>
                      <CardBody className="text-center">
                        <Typography variant="h5" color="blue-gray" className="mb-1">
                        {conn.from_users.first_name} {conn.from_users.last_name} 
                        </Typography>
                        <Typography
                          color="blue-gray"
                          className="font-medium"
                          textGradient
                        >
                          {conn.from_users.username}
                        </Typography>
                        <Button className="mt-2 bg-transparent rounded-full normal-case font-normal border-2 border-blue-100 text-blue-800"
                         onClick={()=>navigate(`/user_profile/${conn.from_users.id}`)}
                        >
                          Profile  <i class="fas fa-sharp fa-light fa-user "></i></Button>
                      </CardBody>
                    </Card>
                    
                    
                    }
                 </div>
 
                )})
              
                   : <h6 className='ml-10 mb-10'>No Connections yet... </h6>}
              
             
              

            </div>
            
          </div>
        
        
        
        </div>
        
        
    
    </div>
      <Footer/>
    </div>
  )
}

export default MyConnections
