import React, { useEffect, useState } from "react";
import { SingleWorkPost } from "../Cards/SingleWorkPost";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { WorkBaseURL } from "../../constants/constants";
import { setWorksDetails } from "../../redux/users";
import { useNavigate } from "react-router-dom";
import { Button } from "@material-tailwind/react";

function ArtWorkPosts() {
  const [childTriggered, setChildTriggered] = useState(false);
  const userData = useSelector((state) => state.user.userInfo);
  const worksData = useSelector((state)=> state.user.worksInfo)
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChildClick = () => {
    setChildTriggered((cur) => !cur);
  };

  // Works API Call
  const fetchWorks = async (user_id) => {
    try {
      const response = await axios.get(`${WorkBaseURL}my_works/${user_id}`);
      dispatch(setWorksDetails({ worksInfo: response.data }));
    } catch (error) {
      console.log(error, "Error On fetching Works");
    }
  };

  useEffect(() => {
    fetchWorks(userData.id);
  }, [childTriggered]);


  return (
    <>
    {worksData && worksData.length>0 ? 
      
      <div className="flex flex-wrap bg-gray-50 max-h-[800px] px-16 mx-2 shadow-lg pb-6 pt-2 gap-2 w-full border-2 overflow-y-scroll">
      {worksData && worksData.map((work)=>{
        return(
          <div className="overflow-auto">
        <SingleWorkPost works={work} onChildClick={handleChildClick}/>
      </div>

        )
      })}

      

    
    </div>
      : 
      <div className="flex justify-center align-middle text-blue-gray-700 font-medium text-xl mt-20" onClick={()=>navigate("/new_post")}>
        <Button>Create and Share a new Work Post..</Button>
      </div>
      
      }
      </>
    
  );
}

export default ArtWorkPosts;
