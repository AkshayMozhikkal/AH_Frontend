import React, { useEffect, useState } from "react";
import { Footer } from "../../components/Footer/Footer";
import {
  Card,
  CardHeader,
  CardBody,
  Typography,
  Input,
} from "@material-tailwind/react";
import { Button } from "@material-tailwind/react";
import { Select, Option } from "@material-tailwind/react";
import axios from "axios";
import { ConnectionBaseURL, userBaseURL } from "../../constants/constants";
import { useNavigate } from "react-router-dom";
import Loader from "../../components/Loading/Loading";
import { useSelector } from "react-redux";
import { Navbarr } from "../../components/navbar/navbar";

function People() {
  const [people, setPeople] = useState([]);
  const [searched, setSearched] = useState("");
  const [locations, setLocations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [connections, setConnections] = useState([]);
  const [allPeople, setAllPeople] = useState([]);

  const loginedUser = useSelector((state)=> state.user.userInfo)
  const navigate = useNavigate();


  // Loading
  const handleLoading =() => setLoading((cur)=> !cur)

  // get locations
  const fetchLocation = async () =>{
    try {
      const res = await axios.get(`${userBaseURL}locations/`);
      setLocations(res.data.map((item)=>{return item.city}))
      
    } catch (error) {
      console.log(error);
      
    }
  }
  

  // Fetch People 
  const fetchPeople = async ()=>{
    try {
     const res =  await axios.get(userBaseURL);
     console.log(res.data,"people");
     setPeople(res.data);
      
    } catch (error) {
      console.log(error);
      
    }
  }

  // Fetch Connections 
  const fetchConnections = async ()=>{
    try {
     const res =  await axios.get(`${ConnectionBaseURL}user_connections/${loginedUser.id}`);
     console.log(res.data,"connections");
     setConnections(res.data)
      
    } catch (error) {
      console.log(error,'connectionsfetcherror');
      
    }
  }
  const fillPeople = ()=>{
    setPeople(allPeople?.filter((person) => {
      return connections?.some(connection => {
        return ((connection.from_users.id === loginedUser.id || connection.to_users.id === person.id) &&
                connection.status === 'a') ||
               ((connection.to_users.id === loginedUser.id || connection.from_users.id === person.id) &&
                connection.status === 'a');
      });
    }));
  
  }
  

  // Search
let searchTimeout;

const search = (key) => {
  setSearched(key)
  clearTimeout(searchTimeout); 

  searchTimeout = setTimeout(async () => {
    try {
      handleLoading();
      const res = await axios.get(`${userBaseURL}search_people/${key}/`);
      setPeople(res.data);
      console.log(res.data);
      handleLoading();
    } catch (error) {
      console.log(error);
      handleLoading();
    }
  }, 500); 
};


  useEffect(()=>{
    fetchPeople();
    fetchLocation();
    fetchConnections();
     
  },[]);



  return (
    <div>
      <Navbarr />
      {loading && <Loader/>}
      <div className="flex h-auto bg-gray-100 gap-3 p-2  shadow-2xl sm:mx-24 mt-24 ">
        <div className="flex-col  w-1/4 p-5 rounded  bg-white">
          <div className="relative flex mb-36 w-full gap-5 md:w-max ">
            <Input
              onChange={(e)=>{search(e.target.value)}}
              type="search"
              label="Search here..."
              className="pr-20 "
              containerProps={{
                className: "min-w-[288px] rounded-3xl",
                
              }}
            />
            
          </div>
          <div className="flex w-72 flex-col gap-6">
            <Select size="lg" label="Select Location">
              {locations && locations.map((city)=>{
                return ( <Option>{city} </Option>)
               
              })}
              
            </Select>
          </div>
        </div>
        <div className=" flex-col w-3/4 px-3 ">

          <div className="bg-white  w-full ml-2 h-16 justify-center border-4 mb-3 shadow-xl">
            <p className="text-center mt-4 font-bold text-xl text-gray-700">{searched? "Results for "+ searched+" :" : "People you may know.."}</p>

          </div>
          <div className="flex flex-wrap w-full max-w-full h-auto max-h-[650px]  ml-2 mb-3 pl-12 pt-5 pb-5 gap-2 bg-white overflow-y-scroll">
              { people && people.map((person)=>{
                return(
              <div  className= "w-72 h-80 mb-7" >
                <Card className={person.is_artisan ? "w-auto bg-blue-gray-50 border-2" : "w-auto  border-2"}>
                  <CardHeader floated={false} className="h-44" onClick={()=>{person.id==loginedUser.id ? navigate("/profile") : navigate(`/user_profile/${person.id}`)}}>
                    <img src={person.profile_image} className="h-auto w-auto" alt="profile-picture" />
                  </CardHeader>
                  <CardBody className="text-center">
                    <Typography variant="h5" color="blue-gray" className="mb-1">
                      {person.first_name} {person.last_name}
                    </Typography>
                    <Typography
                      color="blue-gray"
                      className="font-bold"
                      textGradient
                    >
                      {person.is_artisan && person.art ? (<i class="fa fa-palette text-xs">{person.art}</i> ): person.username}
                    </Typography>
                    <Button className="mt-2 bg-transparent rounded-full normal-case font-normal border-2 border-blue-100 text-blue-800" onClick={()=>{person.id==loginedUser.id ? navigate("/profile") : navigate(`/user_profile/${person.id}`)}}>Profile  <i class="fas fa-sharp fa-light fa-user-plus"></i></Button>
                  </CardBody>
                </Card>
            </div>


              )})}
              
            
              

         


         
          </div>


        </div>
       
       
      </div>

      <Footer />
    </div>
  );
}

export default People;
