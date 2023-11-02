import React, { useEffect, useState } from "react";
import { Navbarr } from "../../components/navbar/Navbar";
import { Footer } from "../../components/Footer/Footer";
import axios from "axios";
import { ConnectionBaseURL, WorkBaseURL, userBaseURL } from "../../constants/constants";
import { useNavigate, useParams } from "react-router-dom";
import { CheckConnection, requestConnection } from "../../services/userAPIs";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import Loader from "../../components/Loading/Loading";
import { useRef } from "react";
import {
  Avatar,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Dialog,
  DialogHeader,
  Textarea,
  Tooltip,
  Typography,
} from "@material-tailwind/react";
import Heart from "react-heart";
import WorkDialog from "../../components/Posts/WorkDialog";
import ConfirmationModal from "../../components/DialogueBoxes/ConfirmationModal";

function PeopleProfile() {
  const targetDivRef = useRef();
  const loginedUser = useSelector((state) => state.user.userInfo);
  const navigate = useNavigate();
  const { userID } = useParams();
  const [userData, setUserData] = useState([]);
  const [works, setWorks] = useState([]);
  const [show, setShow] = useState(false);
  const [connection, setConnection] = useState();
  const [connections, setConnections] = useState([]);
  const [connList, setConnList] = useState([]);
  const [updated, setUpdated] = useState(false);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [open2, setOpen2] = useState(false);
  const [workpost, setWorkpost] = useState({});
  const [comment, setNewComment] = useState("");
  const [searchKey, setSearchKey] = useState("");
  const [connRemoveDialog, setConnRemoveDialog] = useState(false);


  const showHidePost = () => setShow((cur) => !cur);
  const handleUpdate = () => setUpdated((cur) => !cur);
  const handleLoading = () => setLoading((cur) => !cur);
  const showConnections = () =>{setConnList(connections); setSearchKey(""); setOpen2((cur) => !cur);}

  const dialogueOpen = () => {
    setOpen((cur) => !cur);
  };
  const conRmvDlg = () => {
    setConnRemoveDialog((cur) => !cur);
  };




  //  Fetch UserData
  const fetchUserDataAndWorks = async (userID) => {
    handleLoading();
    try {
      const res = await axios.get(`${userBaseURL}user_all_data/${userID}/`);
      setUserData(res.data);
      const response = await axios.get(`${WorkBaseURL}my_works/${userID}`);
      setWorks(response.data);
      const conRes = await axios.get(
        `${userBaseURL}connections/user_connections/${userID}`
      );
      
      if (conRes.data) {
        const acceptedConnections = conRes.data.filter(
          (conn) => conn.status == "a"
        );
        setConnections(acceptedConnections);
      }

      handleLoading();
    } catch (error) {
      console.log(error, "UserdataFetchError");
      handleLoading();
    }
  };

 

  // Get connection status
  const connectionCheck = async () => {
    handleLoading();
    try {
      const res = await CheckConnection(userID);
      console.log(res, "connectionchecksuccess");
      setConnection(res.data);
      handleLoading();
    } catch (error) {
      console.log(error, "connectioncheckerror");
      setConnection(null);
      handleLoading();
    }
  };

  // Send connection request
  const sendConnection = async () => {
    try {
      console.log(loginedUser);
      const res = await requestConnection({
        from_user: loginedUser.id,
        to_user: userData.id,
      });
      console.log(res, "resquestsuccess");
      handleUpdate();
      toast.success("Request send..");
    } catch (error) {
      console.log(error, "connectionerror");
      if (error.response.data["from_user"]) {
        toast.error("Please Login to Connect..!");
      }
    }
  };

  // Remove Connection
  const removeConnection = async (id) => {
    try {
      const res = await axios.delete(
        `${userBaseURL}connections/remove_connection/${id}/`
      );
      console.log(res, "removeconnectionsuccess");
      handleUpdate();
      toast.info("Connection Removed");
    } catch (error) {
      console.log(error, "removeconnectionerror");
      toast.error("Please try again..");
    }
  };

  // Approve Connection
  const approveConnection = async (connectionId) => {
    console.log(connectionId, "connectionID");
    try {
      const res = await axios.put(
        `${userBaseURL}connections/connection_handle/${connectionId}/`,
        { ...connection, status: "a" }
      );
      console.log(res, "acceptconnectionsuccess");
      handleUpdate();
      toast.info("Connection Added");
    } catch (error) {
      console.log(error, "acceptconnectError");
      toast.error("Please try again..");
    }
  };
  


   // fetch and set workdata
   const setworkdata = async ()=>{
    try {
      const response = await axios.get(`${WorkBaseURL}my_works/${userID}`);
      setWorks(response.data);
    } catch (error) {
      console.log(error);   
    }  
   }
   
  // set new post
  const setnewpost = ()=>{
    console.log(works, workpost?.id, "workssarrayyy");
    const post =  works?.find((work) => work.id == workpost?.id)
    console.log(post,"poooooooooost");
    setWorkpost(post);
  }

  const trigger =  ()=>{
     handleUpdate();
     setworkdata();
     setnewpost();

  }


  // New Comment
  const newComment = async (workPost) => {
    console.log(workPost, "commenting on");
    try {
      const res = await axios.post(`${userBaseURL}work/new_comment/`, {
        post: workPost.id,
        commented_by: loginedUser.id,
        text: comment,
      });
      console.log(res, "Commentpostsuccess");
      setNewComment("");                        
    } catch (error) {
      console.log(error, "commentposterror");
      if (error.response.data['commented_by']){
        toast.error("Please Login to comment on this post..!!")
      }else{
      toast.error("Please try again..");}
      
    }
  };

  // Delete Comment
  const deleteComment = async (commentID) => {
    console.log(commentID);

    try {
      const res = await axios.delete(
        `${userBaseURL}work/delete_comment/${commentID}`
      );
      console.log(res, "deletesuccess");
    } catch (error) {
      console.log(error, "deleteError");
      
    }
  };

  // Add Like
  const add_like = async (workPost) => {
    console.log(workPost);

    try {
      const res = await axios.post(`${WorkBaseURL}new_like/`, {
        post: workPost.id,
        liked_by: loginedUser.id,
      });
      setworkdata()
      console.log(res, "add_like_success");
    } catch (error) {
      console.log(error, "add_likeerrorrr");
      if (error.response.data['liked_by']){
        toast.error("Please Login to Like this post..!!")
      }else{
      toast.error("Please try again..");}
    }
  };

  // Remove Like
  const removeLike = async (workPost) => {

    try {
      const res = await axios.delete(`${WorkBaseURL}remove_like/`, {
        data: { post: workPost.id, liked_by: loginedUser.id },
      });
      setworkdata()
      console.log(res, "removeLikesuccess");
    } catch (error) {
      console.log(error, "removeLikeerrorrr");
      toast.error("Please try again..");
    }
  };

  const search = async ()=>{
    try {
      const res = await axios.get(`${ConnectionBaseURL}search_connection/${userID}/${searchKey}`)
      console.log(res);
      setConnList(res.data)
    } catch (error) {
      console.log(error, 'searcherror');
      
    }
    
  }

  // UseEffects
  useEffect(() => {
    fetchUserDataAndWorks(userID);
  }, [updated]);

  useEffect(() => {
    connectionCheck();
  }, [userData, updated]);
  
  return (
    <div>
      <Navbarr />
      {loading && <Loader />}
      <div class="p-16 sm:mx-56 ">
        <div class="p-8 bg-white shadow-xl shadow-cyan-200 mt-24">
          <div class="grid grid-cols-1 md:grid-cols-3">
            <div class="grid grid-cols-2 text-center order-last md:order-first mt-20 md:mt-0">
              <div
                className="cursor-pointer hover:text-blue-500  hover:font-bold"
                onClick={() => showConnections()}
              >
                <p class="font-bold hover:font-extrabold text-gray-700 text-xl">
                  {connections.length}
                </p>
                <p class="text-gray-400  hover:text-blue-500 ">Connections</p>
              </div>
              <div
                className="cursor-pointer hover:text-blue-500  hover:font-bold"
                onClick={() => {
                  targetDivRef.current.scrollIntoView({ behavior: "smooth" });
                  setShow(true)
                }}
              >
                <p class="font-bold text-gray-700 text-xl hover:font-extrabold">
                  {works?.length}
                </p>
                <p class=" hover:text-blue-500  text-gray-400">Work Posts</p>
              </div>
              {/* <div className="cursor-pointer hover:text-blue-500  hover:font-bold">
                <p class="font-bold hover:font-extrabold  text-gray-700 text-xl">0</p>
                <p class=" hover:text-blue-500  text-gray-400">Likes</p>
              </div> */}
            </div>
            <div class="relative">
              <div class="w-48 h-48 bg-indigo-100 mx-auto rounded-full shadow-2xl absolute inset-x-0 top-0 -mt-24 flex items-center justify-center text-indigo-500">
                {userData && userData.profile_image ? (
                  <img
                    className="h-48 w-48 rounded-full shadow-2xl"
                    src={userData.profile_image}
                  ></img>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-24 w-24"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                      clip-rule="evenodd"
                    />
                  </svg>
                )}
              </div>
            </div>
            <div class="space-x-8 flex justify-between mt-32 md:mt-0 md:justify-center">
              {connection ? (
                connection.status == "a" ? (
                  <button
                    class="text-white py-2 px-4 normal-case rounded-full bg-blue-gray-900 hover:bg-blue-gray-400 shadow hover:shadow-lg font-medium transition transform hover:-translate-y-0.5"
                    onClick={() => {
                      conRmvDlg();   
                    }}
                  >
                    Remove Connection
                  </button>
                ) : connection.status == "p" &&
                  connection.from_user == loginedUser.id ? (
                  <button
                    class="text-blue-gray-200 py-2 px-4 normal-case rounded-full bg-gray-800 hover:bg-gray-600
               shadow hover:shadow-lg font-medium  "
                    onClick={() => {
                      removeConnection(connection.id);
                    }}
                  >
                    Cancel Request
                  </button>
                ) : connection.status == "p" &&
                  connection.from_user == userData.id ? (
                  <>
                    <button
                      class="text-white py-2 px-4  rounded-full bg-blue-600 hover:bg-gray-600-500 shadow hover:shadow-lg normal-case font-medium transition transform hover:-translate-y-0.5"
                      onClick={() => {
                        approveConnection(connection.id);
                      }}
                    >
                      Approve Connection
                    </button>

                    <button
                      class="text-black py-2 px-4 normal-case rounded-full bg-gray-500 hover:bg-gray-600-500 shadow hover:shadow-lg font-medium transition transform hover:-translate-y-0.5"
                      onClick={() => {
                        removeConnection(connection.id);
                      }}
                    >
                      Reject
                    </button>
                  </>
                ) : (
                  <button
                    class="text-white py-2 px-5 normal-case rounded-full bg-blue-400 hover:bg-blue-500 shadow hover:shadow-lg font-medium transition transform hover:-translate-y-0.5"
                    onClick={() => {
                      sendConnection();
                    }}
                  >
                    Connect
                  </button>
                )
              ) : (
                <button
                  class="text-white py-2 px-5 normal-case rounded-full bg-blue-400 hover:bg-blue-500 shadow hover:shadow-lg font-medium transition transform hover:-translate-y-0.5"
                  onClick={() => {
                    sendConnection();
                  }}
                >
                  Connect
                </button>
              )}

              <button class="text-white py-2 rounded-full px-4  normal-case  bg-green-700 hover:bg-green-900 shadow hover:shadow-lg font-medium transition transform hover:-translate-y-0.5">
                Message
              </button>
            </div>
          </div>
          <div class="mt-20 text-center border-b pb-12">
            <h1 class="text-4xl font-medium text-gray-700">
              {userData?.first_name} {userData?.last_name}
            </h1>
            <p class="font-light text-gray-600 mt-3">
              {userData.is_artisan
                ? userData.art
                : `A user from ${
                    userData.address?.city ? userData.address.city : "India"
                  }`}
            </p>
            <p class="mt-8 text-gray-500">{userData?.email}</p>
            <p class="mt-2 text-gray-500">
              {userData && userData.address && userData.address.district
                ? userData.address.district
                : "______________"}{" "}
              -{" "}
              {userData && userData.address && userData.address.state
                ? userData.address.state
                : "______________"}
            </p>
          </div>
          <div class="mt-12 flex flex-col justify-center">
            <p class="text-gray-600 text-center font-light lg:px-16">
              {userData && userData.about}
            </p>
            {works && works.length > 0 ? (
              <button
                ref={targetDivRef}
                class="text-white bg-blue-400 py-2 px-4 rounded-md  font-medium mt-4 border-2 hover:bg-blue-500 cursor-pointer"
                onClick={() => showHidePost()}
              >
                Show Work Posts
              </button>
            ) : (
              ""
            )}
          </div>
        </div>
        {show && works ? (
          <div className="flex flex-wrap shadow-xl shadow-cyan-200 w-full bg-blue-50 max-h-[700px] overflow-y-scroll">
            {works ? (
              works.map((work) => {
                return (
                  <div className="w-1/3 h-96 p-2 ">
                    <div class=" rounded overflow-hidden border w-full  hover:shadow-2xl transition hover:translate-x-2 hover:translate-y-3  bg-white "
                   >
                      <img
                         onClick={() => {
                          setWorkpost(work);
                          dialogueOpen();
                          
                        }}
                        class="w-full bg-cover cursor-pointer "
                        src={work.image ? work.image : ""}
                        
                      />
                      <div class="px-3 pb-2">
                        <div class="pt-2">
                          {work.likes.filter(
                            (like) => like.liked_by.id == loginedUser.id
                          ).length > 0 ? (
                            <Heart
                              isActive={true}
                              className="float-left h-6 w-6"
                              onClick={() => removeLike(work)}
                            />
                          ) : (
                            <Heart
                              isActive={false}
                              className="float-left h-6 w-6"
                              onClick={() => add_like(work)}
                            />
                          )}
                          <span class="text-sm ml-2 text-gray-400 font-medium">
                            {work.like_count} likes
                          </span>
                        </div>
                        <div class="pt-1">
                          <div class="mb-2 text-sm"  onClick={() => {
                                setWorkpost(work);
                                dialogueOpen();                               
                              }}>
                            <span class="font-medium mr-2">{work.title}</span>{" "}
                            {work.description}
                          </div>
                        </div>
                        <div class="text-sm mb-2 text-gray-400 cursor-pointer font-medium">
                          {work.comment_count > 0
                            ? `View all ${work.comment_count} comments`
                            : "0 Comments"}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="w-1/3 h-96  p-2">"No Works Posted Yet.."</div>
            )}
          </div>
        ) : (
          ""
        )}
      </div>

      <Footer />

      <Dialog open={open2} size="sm" handler={showConnections} className="">
        <DialogHeader className="flex justify-between gap-2 bg-gray-100">
          <p className="font-semibold ">Connections</p>
          <div>
          <input
            value = {searchKey}
            onChange={(e)=>setSearchKey(e.target.value)}
            className="p-3 text-lg rounded-lg border-none"
            placeholder="search.."
          ></input>
          <i className="fas fa-solid fa-magnifying-glass ml-1 cursor-pointer" onClick={()=>search() }></i>
          </div>
        </DialogHeader>
        <div className="w-full h-auto max-h-[500px] overflow-y-scroll p-9">
          {connList && connList.length>0
            ? connList.map((connection) => {
                return (
                  <div>
                    {connection.from_users.id == userID ? (
                      <div className="flex   h-16 mb-3 rounded-xl p-5 items-center justify-between bg-gray-50">
                        <div>
                          <Avatar
                            variant="circular"
                            size="md"
                            alt="tania andrew"
                            className="border border-gray-900 p-0.5"
                            src={connection.to_users.profile_image}
                          />
                        </div>
                        <div className="font-serif text-lg">
                          {connection.to_users.first_name}{" "}
                          {connection.to_users.last_name}
                        </div>
                        <div className="flex gap-4">
                          <button className="border-blue-400 border-2 text-blue-400 rounded-full p-2 text-sm hover:bg-gray-100"
                          onClick={()=>{navigate(`/user_profile/${connection.to_users.id}/`); showConnections(); handleUpdate();}}
                          >
                            Profile
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div className="flex   h-16 mb-3 rounded-xl p-5 items-center justify-between bg-gray-50">
                        <div>
                          <Avatar
                            variant="circular"
                            size="md"
                            alt="tania andrew"
                            className="border border-gray-900 p-0.5"
                            src={connection.from_users.profile_image}
                          />
                        </div>
                        <div className="font-serif text-lg">
                          {connection.from_users.first_name}{" "}
                          {connection.from_users.last_name}
                        </div>
                        <div className="flex gap-4">
                          <button className="border-blue-400 border-2 text-blue-400 rounded-full p-2 text-sm hover:bg-gray-100"
                          onClick={()=>{navigate(`/user_profile/${connection.from_users.id}/`); showConnections(); handleUpdate();}}
                          >
                            Profile
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })
            : <div className="flex   h-16 mb-3 rounded-xl p-5 items-center justify-between bg-gray-50"> <p className="text-black text-xl">No Connections..</p></div>  }
        </div>
      </Dialog>
      {open && (
        <WorkDialog
          open={dialogueOpen}
          workpost={workpost}
          comment={comment}
          setNewComment={setNewComment}
          newComment={newComment}
          deleteComment={deleteComment}
          loginedUser={loginedUser}
          // add_like={add_like}
          // removeLike={removeLike}
          trigger = {trigger}
        />
      )}

      {connRemoveDialog && ( <ConfirmationModal 
        open={conRmvDlg}
        show={connRemoveDialog}
        mainFunction={removeConnection}
        data={connection.id}
        title={"CONFIRM CONNECTION REMOVAL"}
        question={"Are you sure to remove this connection ?"}
      />)}

      
    </div>
  );
}

export default PeopleProfile;
