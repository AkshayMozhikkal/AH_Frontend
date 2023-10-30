import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Avatar,
  Tooltip,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Button,
  Textarea,
  Menu,
  MenuList,
  MenuItem,
  MenuHandler,
} from "@material-tailwind/react";
import axios from "axios";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { WorkBaseURL, userBaseURL } from "../../constants/constants";
import { toast } from "react-toastify";
import { setWorksDetails } from "../../redux/users";
import Heart from "react-heart";




export function SingleWorkPost({works,onChildClick}) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [open, setOpen] = useState(false);
  const [open2, setOpen2] = useState(false);
  const worksData = useSelector((state)=> state.user.worksInfo)
  const dispatch = useDispatch();
  const [comment, setNewComment] = useState("");


  const dialogueOpen = () => {
    setOpen((cur) => !cur);
  };
  
  const deleteDialogue = () => {
    setOpen2((cur) => !cur);
  };

  const deleteWorkPost = async (id) =>{
      try{
        const response = await axios.delete(`${WorkBaseURL}delete_work/${id}`)
        dispatch(setWorksDetails(worksData.filter((work) =>{work.id !== id })))
        onChildClick();
        toast.success("Post deleted..!!")

      }catch(error){
        console.log(error)
        toast.info("Please try again..")

      }
      deleteDialogue();
      console.log(worksData);
  }

      // New Comment
      const newComment = async (workPost) =>{
        console.log(workPost,"commenting on");
        try {
          const res = await axios.post(`${WorkBaseURL}new_comment/`,{post:workPost.id, commented_by:workPost.user, text:comment})
          console.log(res,"Commentpostsuccess");
          setNewComment("")
          onChildClick();          
          toast.info("Comment Added")
          
          
        } catch (error) {
          console.log(error, 'commentposterror');
          toast.error("Please try again..")
          
        }
      } 

        // Delete Comment
    const deleteComment = async (commentID) =>{
      console.log(commentID);
      
      try {
        const res = await axios.delete(`${WorkBaseURL}delete_comment/${commentID}`)
        console.log(res,"deletesuccess");
        onChildClick();
        toast.info("Comment Removed")
        
        
      } catch (error) {
        console.log(error, 'deleteError');
        toast.error("Please try again..")
        
      }
    };

     // Add Like 
    const add_like = async (workPost) =>{
      console.log(workPost);
      
      try {
        const res = await axios.post(`${WorkBaseURL}new_like/`,{post:workPost.id, liked_by:workPost.user})
        console.log(res,"add_like_success");
        onChildClick();
        
        
        
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
        onChildClick();
   
      } catch (error) {
        console.log(error, 'removeLikeerrorrr');
        toast.error("Please try again..")
        
      }
    }    

  return (
    <>
    
          <Card className="w-80 h-[28rem] ml-3 shadow-xl border-2 rounded-none  overflow-hidden">
        <CardHeader
          floated={false}
          shadow={false}
          color="transparent"
          className="m-0 rounded-none cursor-pointer"
        >
          <Menu open={isMenuOpen} handler={setIsMenuOpen}>
            <MenuHandler>
              <i className="fa-solid fa-bars mb-1"></i>
            </MenuHandler>
            <MenuList>
              <MenuItem className="text-red-600" onClick={deleteDialogue}>
                delete post
              </MenuItem>
            </MenuList>
          </Menu>

          <Dialog open={open2} size={"xs"} handler={deleteDialogue}>
            <DialogHeader>Confirm Delete</DialogHeader>
            <DialogBody divider>
              Are You sure, you want to delete this post?
            </DialogBody>
            <DialogFooter>
              <Button
                variant="text"
                color="gray"
                onClick={() => deleteDialogue()}
                className="mr-1"
              >
                <span>Cancel</span>
              </Button>
              <Button
                variant="gradient"
                color="red"
                onClick={() => deleteWorkPost(works.id)}
              >
                <span>Confirm</span>
              </Button>
            </DialogFooter>
          </Dialog>
        </CardHeader>
        <CardBody className="p-0 cursor-pointer" onClick={dialogueOpen}>
          <img className="w-full h-60 mt-2 hover:scale-105 transition-transform"
            src={works.image ? works.image : "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1471&q=80"}
            alt="ui/ux review check"
          />
          <Typography className="pl-3" variant="h6" color="blue-gray">
            {works.title}
          </Typography>
        </CardBody>
        <div className="overflow-scroll overflow-x-hidden overflow-y-auto">
          <Typography color="gray" className="mt-3 pl-3 font-thin cursor-pointer">
          {works.description}
        </Typography></div>
        
        <CardFooter className="flex items-center justify-between">
          <div className="flex items-center -space-x-3 cursor-pointer">
            
            <div >
              { works?.likes?.filter((like)=> like.liked_by.id == works.user ).length >0 ?
             <Heart isActive={true} className="h-6 w-6 ml-2" onClick={()=>removeLike(works)}/>:
             <Heart isActive={false} className="h-6 w-6 ml-2" onClick={()=>{add_like(works)}}/>}
             <span class="text-sm ml-2 mr-10 text-gray-400 font-medium">
                {works.like_count} likes
             </span>
            </div>
           
            Comments({works.comment_count})
          </div>
          <Typography className="font-normal text-xs -mb-16">{works.date}</Typography>
        </CardFooter>
      </Card>

      <Dialog  open={open} size={"xl"} handler={dialogueOpen} className="pt-0 ">
        <div className="md:flex shadow-2xl  bg-cyan-50 gap-5">
          <div className="md:w-2/5 ">
            <Card className=" w-full p-6 sm:p-0 m-1 rounded-none overflow-hidden">
              <CardHeader
                floated={false}
                shadow={false}
                color="transparent"
                className="m-0 rounded-none"
              >
                <img className="w-full h-80"
                  src={works.image ? works.image : "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1471&q=80"}
                  alt="ui/ux review check"
                />
              </CardHeader>
              <CardBody>
                <Typography variant="h4" color="blue-gray">
                 {works.title}
                </Typography>
                <div className="overflow-x-hidden overflow-y-scroll h-20">
                <Typography
                  variant="lead"
                  color="gray"
                  className="mt-3 font-normal"
                >
                  {works.description}
                </Typography>
                </div>
               
              </CardBody>
              <CardFooter className="flex items-center justify-between">
                <div className="flex items-center -space-x-3">
                  <Tooltip content="Location">
                    <i className="fas fa-map-marker-alt text-lg text-blueGray-400 mr-6"></i>
                  </Tooltip>
                  <span> {works.location}</span>
                </div>
                <div className="flex-row w-auto">
                  { works?.likes?.filter((like)=> like.liked_by.id == works.user).length >0 ?
                    <Heart isActive={true} className="float-left h-6 w-6" onClick={()=>removeLike(works)}/> :
                    <Heart isActive={false} className="float-left h-6 w-6" onClick={()=>add_like(works)}/>}
                    <span className="float-right ml-3">{works?.like_count && works.like_count } likes</span>
                 </div>
                <Tooltip content="Date posted">
                  <Typography className="font-normal text-xs">{works.date}</Typography>
                </Tooltip>
              </CardFooter>
            </Card>
          </div>
          <div className=" sm:h-[35rem] h-[10rem] gap-1 md:w-3/5 pr-5 m-1 bg-white">

              <div className="grid grid-col sm:h-4/5 h-[10rem] gap-1 w-full pr-5 m-1 bg-white overflow overflow-x-hidden overflow-y-auto ">

                {works && works.comments && works.comments.length >0 ? works.comments.map((comment)=> {return (

                
                <div className="flex w-full gap-1 p-2 mt-2 h-28  ">
                  <Avatar
                    variant="circular"
                    alt="user 1"
                    className="border-2 border-white hover:z-10 focus:z-10"
                    src={ comment.commented_by.profile_image ? comment.commented_by.profile_image : "" }
                  />
                  <div className="w-full">
                    <p className="font-semibold text-brown-400 text-sm">{ comment.commented_by.username}</p>
                    <Textarea
                      
                      className="bg-blue-100 h-auto w-full "
                      value={comment.text}
                      disabled
                      
                    />
                  </div>
                  {comment.commented_by.id === works.user ? (
                      <div className="cursor-pointer italic text-sm text-brown-400 hover:text-red-500 float-right" onClick={(e) => {deleteComment(comment.id)}}>
                        delete
                      
                      </div>
                    ) : (
                      <div className="w-9"></div>
                    )}
                </div>
                  )}): (<div className="flex w-full gap-1 p-2 mt-2 align-middle items-center h-28  "> No Comments.... </div>)}

                

              </div>

              <div className="border-2 flex  m-2 ">
                <textarea name="text" id="" cols="30" value={comment}  rows="10" className="w-full p-2 h-11" onChange={(e)=>setNewComment(e.target.value)}>                   
                </textarea>
                <button className="float-right border-2 border-blue-300 bg-blue-300 rounded text-white p-2 m-1 text-sm" onClick={()=>newComment(works)}>Post</button>
              </div>

            </div>
          </div>
      </Dialog>
    
      
    </>
  );
}
