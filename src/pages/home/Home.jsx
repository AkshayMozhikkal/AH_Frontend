import React, { useEffect, useState } from "react";
import { Footer } from "../../components/Footer/Footer";
import { CarouselWithContent } from "../../components/Carousel/Carousel";
import {
  Card,
  CardHeader,
  CardBody,
  Typography,
  Button,
  Avatar,
} from "@material-tailwind/react";
import { UserPosts } from "../../components/Posts/UserPosts";
import {  useSelector } from "react-redux";
import axios from "axios";
import { WorkBaseURL, userBaseURL } from "../../constants/constants";
import NoPropic from "../../assets/images/static/default-user-icon-8.jpg";
import { useNavigate } from "react-router-dom";
import { Navbarr } from "../../components/navbar/Navbar";

function Home() {
  const user = useSelector((state) => state.user.userInfo);
  const navigate = useNavigate();
  const [works, setWorks] = useState([]);
  const [trigger, setTrigger] = useState(false);
  const [artisans, setArtisans] = useState([]);

  const triggerFunction = () => setTrigger((cur) => !cur);

  //API Call to fetch Shared Posts
  const fetchWorks = async () => {
    try {
      const response = await axios.get(WorkBaseURL);
      console.log(response, "vannath");
      setWorks(response.data);
    } catch (error) {
      console.log(error, "errorrruu");
    }
  };

  //API Call to fetch Artisans data
  const artisanFetch = async () => {
    try {
      const response = await axios.get(`${userBaseURL}artisans/`);
      console.log(response, "artisanss");
      setArtisans(response.data);
    } catch (error) {
      console.log(error, "artisanfetch error");
    }
  };

  //API Call to search Posts 
  const postSearch = async (value) => {
    if (value == ""){
      fetchWorks();
      return
    }else{
      console.log(value,"e.target.valueee");
    
    
    try {
      const response = await axios.get(`${WorkBaseURL}search_posts/${value}`);
      console.log(response, "postsearch success");
      setWorks(response.data);
    } catch (error) {
      console.log(error, "postsearch error");
    }}
  };

  // UseEffect
  useEffect(() => {
    fetchWorks();
  }, [trigger]);

  useEffect(() => {
    artisanFetch();
  }, []);

  return (
    <div>
      <Navbarr />
      <CarouselWithContent />
      <div className="flex justify-center mb-10 mt-10 ">
        <p className="text-3xl underline underline-offset-[12px]  ">
          Popular Artisans
        </p>
      </div>
      <div className="flex gap-3  p-3 shadow-2xl rounded-lg border-zinc-950 overflow-x-scroll sm:mx-20">
        {artisans.map((artisan) => {
          return (
            <div className="w-80 h-80 mb-7 hover:scale-105 transition-transform ">
              <Card className="w-64 h-80 bg-white border-2 shadow-md  shadow-blue-100 hover:bg-blue-50">
                <CardHeader floated={false} className="h-44">
                  <img
                    src={
                      artisan.profile_image ? artisan.profile_image : NoPropic
                    }
                    className="h-auto w-auto"
                    alt="profile-picture"
                  />
                </CardHeader>
                <CardBody className="text-center">
                  <Typography variant="h5" color="blue-gray" className="mb-1">
                    {artisan.first_name} {artisan.last_name}
                  </Typography>
                  <Typography
                    color="blue-gray"
                    className="font-bold"
                    textGradient
                  >
                    <i class="fa fa-palette text-xs">{artisan.art}</i>
                  </Typography>
                  <Button
                    className="mt-2 bg-transparent rounded-full normal-case font-normal border-2 border-blue-100 text-blue-800"
                    onClick={() => {
                      artisan.id == user.id
                        ? navigate("/profile")
                        : navigate(`/user_profile/${artisan.id}`);
                    }}
                  >
                    Profile <i class="fas fa-sharp fa-light fa-user-plus"></i>
                  </Button>
                </CardBody>
              </Card>
            </div>
          );
        })}
      </div>
      <div className="flex-col bg-white sm:mx-20 border-b-4 pb-10 mt-28 h-auto max-h-[950px]">
        <div className="flex justify-between border-b-4 mx-8  mt-20">
          <p className="text-2xl ml-10 ">Recent Posts</p>
          <input type="text" className="mr-5 w-80 mb-2 p-2 rounded-2xl border border-gray-700 focus:outline-none" placeholder="Search..." 
          onChange={(e)=>{postSearch(e.target.value)}}/>
          
        </div>
        <div className="flex-col bg-gray-50 mt-16 h-[700px] mx-20 overflow-y-scroll">
          {works.map((work) => {
            return (
              <div className="mx-20 my-16 flex-col ">
                <div className="cursor-pointer text-blue-700 -mb-7 ml-10" onClick={() => {
                      work.artist.id == user.id
                        ? navigate("/profile")
                        : navigate(`/user_profile/${work.artist.id}`);
                    }}>
                  <Avatar
                    variant="circular"
                    alt="user 1"
                    className="border-2 h-8 w-8 border-white hover:z-10 focus:z-10"
                    src={work.artist.profile_image}
                  />
                  {work.artist.username}
                </div>

                <UserPosts workData={work} trig={triggerFunction} />
              </div>
            );
          })}
        </div>
      </div>

      <Footer></Footer>
    </div>
  );
}

export default Home;
