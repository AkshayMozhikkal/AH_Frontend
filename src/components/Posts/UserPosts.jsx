import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Avatar,
  Tooltip,
  Textarea,
} from "@material-tailwind/react";
import NoImage from "../../assets/images/static/No_Image.jpg";
import { useState } from "react";
import { toast } from "react-toastify";
import { WorkBaseURL } from "../../constants/constants";
import axios from "axios";
import { Input } from "postcss";
import Heart from "react-heart";

export function UserPosts({ workData, trig }) {
  const [comment, setNewComment] = useState("");

  // New Comment
  const newComment = async (workPost) => {
    console.log(workPost, "commenting on");
    if(comment == ""){
      toast.info("Please type something to comment")
    }
    try {
      const res = await axios.post(`${WorkBaseURL}new_comment/`, {
        post: workPost.id,
        commented_by: workPost.user,
        text: comment,
      });
      console.log(res, "Commentpostsuccess");
      setNewComment("");
      trig();
      toast.info("Comment Added");
    } catch (error) {
      console.log(error, "commentposterror");
      trig();
      toast.error("Please try again..");
    }
  };

  // Delete Comment
  const deleteComment = async (commentID) => {
    console.log(commentID);

    try {
      const res = await axios.delete(
        `${WorkBaseURL}delete_comment/${commentID}`
      );
      console.log(res, "deletesuccess");
      trig();
      toast.info("Comment Removed");
    } catch (error) {
      console.log(error, "deleteError");
      trig();
      toast.error("Please try again..");
    }
  };


   // Add Like 
   const add_like = async (workPost) =>{
    console.log(workPost);
    
    try {
      const res = await axios.post(`${WorkBaseURL}new_like/`,{post:workPost.id, liked_by:workPost.user})
      console.log(res,"add_like_success");
      trig();
      
      
      
    } catch (error) {
      console.log(error, 'add_likeerrorrr');
      toast.error("Please try again..")
      
    }
  } 

  // Remove Like 
  const removeLike = async (workPost) =>{
    console.log(workPost);
    
    try {
      const res = await axios.delete(`${WorkBaseURL}remove_like/`,{data:{post:workPost.id, liked_by:workPost.user}})
      console.log(res,"removeLikesuccess");
      trig();
 
    } catch (error) {
      console.log(error, 'removeLikeerrorrr');
      toast.error("Please try again..")
      
    }
  }   

  return (
    <div className="md:flex shadow-lg h-[500px] bg-blue-gray-50  border p-1 md:m-10  m-3 gap-3">
      <div className="md:w-2/5 h-full ">
        <Card className=" w-full h-full p-6 sm:p-0 rounded-none overflow-hidden">
          <CardHeader
            floated={false}
            shadow={false}
            color="transparent"
            className="m-0 rounded-none"
          >
            <img
              className="w-full h-64"
              src={workData.image ? workData.image : NoImage}
              alt="ui/ux review check"
            />
          </CardHeader>
          <CardBody>
            <Typography variant="h6" color="blue-gray">
              {workData.title}
            </Typography>
            <div className="overflow-y-scroll h-24 scroll-">
              <Typography
                variant="lead"
                color="gray"
                className="mt-3 text-sm font-normal"
              >
                {workData.description}
              </Typography>
            </div>
          </CardBody>
          <CardFooter className="flex items-center justify-between">
            <div className="flex items-center -space-x-3">
              <Tooltip content="Location">
                <i className="fas fa-map-marker-alt text-lg text-blueGray-400 mr-4"></i>
              </Tooltip>
              <span> {workData.location}</span>
            </div>
            <div className="flex-row w-auto">
              { workData?.likes?.filter((like)=>like.liked_by.id == workData.user).length > 0 ?
                    <Heart isActive={true} className="float-left h-5 w-5" onClick={()=>removeLike(workData)}/>:
                    <Heart isActive={false} className="float-left h-5 w-5" onClick={()=>add_like(workData)}/>}
                    <span className="float-right ml-2 text-sm mt-1">{workData?.like_count && workData.like_count } likes</span>
                    </div>
            <Tooltip content="Date posted">
              <Typography className="font-normal text-xs -mb-12 -mr-4">{workData.date}</Typography>
            </Tooltip>
          </CardFooter>
        </Card>
      </div>
      <div className=" h-full gap-1 md:w-3/5 pr-3 bg-white  ">
        <div className="grid grid-col sm:h-4/5 h-[10rem] gap-1 w-full pr-3 m-1 bg-white overflow overflow-x-hidden overflow-y-auto ">
          {workData && workData.comments && workData.comments.length > 0 ? (
            workData.comments.map((comment) => {
              return (
                <div className="flex w-full gap-1 p-2 mt-2 h-28  ">
                  <Avatar
                    variant="circular"
                    alt="user 1"
                    className="border-2 h-8 w-8 border-white hover:z-10 focus:z-10"
                    src={
                      comment.commented_by.profile_image
                        ? comment.commented_by.profile_image
                        : ""
                    }
                  />
                  <div className="w-full">
                    <p>{comment.commented_by.username}</p>
                   
                    <p
                      className="text-gray-500 bg-blue-50 rounded p-2"
                    >{comment.text}</p>
                     {comment.commented_by.id === workData.user ? (
                      <div className="cursor-pointer italic text-sm text-brown-400 hover:text-red-500 float-right" onClick={(e) => {deleteComment(comment.id)}}>
                        delete
                      
                      </div>
                    ) : (
                      ""
                    )}
                  </div>
                </div>
              );
            })
          ) : (
            <div className="flex w-full gap-1 p-2 mt-2 align-middle items-center h-28  ">
              {" "}
              No Comments....{" "}
            </div>
          )}
        </div>

        <div className="border-2 flex  m-2 ">
          <textarea
            name="text"
            id=""
            cols="30"
            value={comment}
            rows="10"
            className="w-full p-2 h-11"
            onChange={(e) => setNewComment(e.target.value)}
          ></textarea>
          <button
            className="float-right border-2 border-blue-300 bg-blue-300 rounded text-white p-2 m-1 text-sm"
            onClick={() => newComment(workData)}
          >
            Post
          </button>
        </div>
      </div>
    </div>
  );
}
