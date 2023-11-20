import React, { useEffect, useState } from "react";
import { Footer } from "../../components/Footer/Footer";
import { UserPosts } from "../../components/Posts/UserPosts";
import { Sidebar } from "../../components/sidebar/Sidebar";
import { userWorksShared } from "../../services/userAPIs";
import { useDispatch, useSelector } from "react-redux";
import { setWorksDetails } from "../../redux/users";
import { WorkBaseURL } from "../../constants/constants";
import axios from "axios";
import { Navbarr } from "../../components/navbar/Navbar";
import { toast } from "react-toastify";
import ConfirmationModal from "../../components/DialogueBoxes/ConfirmationModal";
import Loader from "../../components/Loading/Loading";


function WorkPosts() {
  const user = useSelector((state) => state.user.userInfo)
  const [works, setWorks] = useState([])
  const [open, setOpen] = useState(false)
  const [work, setWork] = useState({})
  const [loading, setLoading] = useState(false)
  const [trigger, setTrigger] = useState(false)

  const dispatch =useDispatch()

  const triggerFunction = () => setTrigger((cur)=>!cur)
  const handleLoading = () => setLoading((cur)=>!cur)
  const openFunc = ()=> setOpen((cur)=>!cur)

  //API Call to fetch Works data
  const fetchWorks = async ()=>{
    handleLoading();
    try {
      const response = await userWorksShared(user.id);
      
      dispatch(setWorksDetails({worksInfo:response.data}));
      setWorks(response.data) 
      handleLoading();  
      } catch (error) {
      console.log(error,"errorrruu"); 
      handleLoading();    
      }
    };

    
  //API Call to search Posts 
  const postSearch = async (value) => {
    handleLoading();
    if (value == ""){
      fetchWorks();
      return
    }else{
      console.log(value,"e.target.valueee");
    
    try {
      const response = await axios.get(`${WorkBaseURL}search_posts/${value}`);
      
      setWorks(response.data.filter((work)=>work.user=user.id));
      handleLoading();
    } catch (error) {
      console.log(error, "postsearch error");
      handleLoading();
    }}
  };

  //API Call to Delete Post 
  const deletePost = async (post) => {
    handleLoading();
    
    try {
      const response = await axios.delete(`${WorkBaseURL}delete_work/${post.id}`);
      console.log(response)
      toast.success("Post deleted")
      fetchWorks();
      handleLoading();
    } catch (error) {
      console.log(error, "delete error");
      handleLoading();
    }
  };


  // UseEffect
  useEffect(()=>{
    fetchWorks();
  }, [trigger]);

  const isMobileView = () => window.innerWidth < 700;

  return (
    <div>
      <Navbarr />
      {loading && <Loader/>}
      <div className="flex shadow-2xl  h-[800px] -mb-48 mt-24 mx-36">
      {!isMobileView() && <Sidebar selected={"Shared Posts"} />}
      <div className="flex flex-col">
      <input type="text" className="ml-96 mb-5 mt-5 float-right w-80  p-2 rounded-md border border-gray-500 focus:outline-none" placeholder="Search..." 
          onChange={(e)=>{postSearch(e.target.value)}}/>
        <div className="flex-col ml-5 w-full h-full overflow-y-scroll ">
          { works && works.length >0 ? works.map((work)=>{
            return (
              <div className="overflow-y-auto w-11/12 ">
                <button className="float-right mt-3 mr-12 text-red-300 hover:text-red-700" onClick={()=>{setWork(work); openFunc();}}>Delete</button>
              <UserPosts workData={work} trig={triggerFunction} /></div>

            )
          }) : (<div className="flex w-full h-full justify-center items-center text-2xl font-semibold font-serif text-gray-800 "><p>No works posted yet..</p></div>)

          }

      
        </div>
        </div>
    
      
      </div>
      {open && <ConfirmationModal 
      title={"Delete Post"}
      question={"Are you sure to delete this post ?"}
      mainFunction={deletePost}
      data={work}
      open={openFunc}
      
      />}
      <Footer />
    </div>
    
  );
}

export default WorkPosts;
