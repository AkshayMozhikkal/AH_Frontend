import React, { useEffect, useState } from "react";
import { Footer } from "../../components/Footer/Footer";
import { UserPosts } from "../../components/Posts/UserPosts";
import { Sidebar } from "../../components/sidebar/Sidebar";
import { userWorksShared } from "../../services/userAPIs";
import { useDispatch, useSelector } from "react-redux";
import { setWorksDetails } from "../../redux/users";
import { WorkBaseURL } from "../../constants/constants";
import axios from "axios";
import { Navbarr } from "../../components/navbar/navbar";

function WorkPosts() {
  const user = useSelector((state) => state.user.userInfo)
  const [works, setWorks] = useState([])
  const [trigger, setTrigger] = useState(false)

  const dispatch =useDispatch()

  const triggerFunction = () => setTrigger((cur)=>!cur)

  //API Call to fetch Works data
  const fetchWorks = async ()=>{
    try {
      const response = await userWorksShared(user.id);
      console.log(response, "vannath");
      dispatch(setWorksDetails({worksInfo:response.data}));
      setWorks(response.data)   
      } catch (error) {
      console.log(error,"errorrruu");     
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
      setWorks(response.data.filter((work)=>work.user=user.id));
    } catch (error) {
      console.log(error, "postsearch error");
    }}
  };


  // UseEffect
  useEffect(()=>{
    fetchWorks();
  }, [trigger]);

  const isMobileView = () => window.innerWidth < 700;

  return (
    <div>
      <Navbarr />

      

      <div className="flex shadow-2xl  h-[800px] -mb-48 mt-24 mx-36">
      {!isMobileView() && <Sidebar selected={"Shared Posts"} />}
      <div className="flex flex-col">
      <input type="text" className="ml-96 mb-5 mt-5 float-right w-80  p-2 rounded-md border border-gray-500 focus:outline-none" placeholder="Search..." 
          onChange={(e)=>{postSearch(e.target.value)}}/>
        <div className="flex-col ml-5 w-full h-full overflow-y-scroll ">
          { works && works.length >0 ? works.map((work)=>{
            return (
              <div className="overflow-y-auto w-11/12 "><UserPosts workData={work} trig={triggerFunction} /></div>

            )
          }) : (<div className="flex w-full h-full justify-center items-center text-2xl font-semibold font-serif text-gray-800 "><p>No works posted yet..</p></div>)

          }

      
        </div>
        </div>
        
      </div>
      <Footer />
    </div>
  );
}

export default WorkPosts;
