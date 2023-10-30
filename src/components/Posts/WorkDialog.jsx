import { Avatar, Card, CardBody, CardFooter, CardHeader, Dialog, Textarea, Tooltip, Typography } from '@material-tailwind/react';
import axios from 'axios';
import React, { useState } from 'react';
import Heart from 'react-heart';
import { WorkBaseURL } from '../../constants/constants';
import NoImage from "../../assets/images/static/No_Image.jpg";

const WorkDialog = ({ open, workpost,comment, setNewComment, newComment, deleteComment, loginedUser,closeDialog, trigger }) => {
    // Add Like
    const add_like = async () => {
  
      try {
        const res = await axios.post(`${WorkBaseURL}new_like/`, {
          post: workpost.id,
          liked_by: loginedUser.id,
        });
        console.log(res, "add_like_success");
        trigger();
      } catch (error) {
        console.log(error, "add_likeerrorrr");
      }
    };
  
    // Remove Like
    const removeLike = async () => {
  
      try {
        const res = await axios.delete(`${WorkBaseURL}remove_like/`, {
          data: { post: workpost.id, liked_by: loginedUser.id },
        });
        console.log(res, "removeLikesuccess");
        trigger();
      } catch (error) {
        console.log(error, "removeLikeerrorrr");
      }
    };

  return (
    <Dialog open={open} size="xl" handler={closeDialog} className="pt-0">
      
      <button className='text-red-700 text-sm font-semibold' onClick={()=>open()}>Close</button>

        <div className="md:flex shadow-2xl border-none bg-cyan-50 gap-5">
          <div className="md:w-2/5 ">
            <Card className=" w-full p-6 sm:p-0 m-1 rounded-none overflow-hidden">
              <CardHeader
                floated={false}
                shadow={false}
                color="transparent"
                className="m-0 rounded-none"
              >
                <img
                  className="w-full h-80"
                  src={
                    workpost?.image
                      ? workpost?.image
                      : NoImage
                  }
                  alt="No image"
                />
              </CardHeader>
              <CardBody>
                <Typography variant="h4" color="blue-gray">
                  {workpost?.title}
                </Typography>

                <div className="overflow-x-hidden overflow-y-scroll h-20">
                  <Typography
                    variant="lead"
                    color="gray"
                    className="mt-3 font-normal"
                  >
                    {workpost?.description}
                  </Typography>
                </div>
              </CardBody>
              <CardFooter className="flex items-center justify-between">
                <div className="flex items-center -space-x-3">
                  <Tooltip content="Location">
                    <i className="fas fa-map-marker-alt text-lg text-blueGray-400 mr-6"></i>
                  </Tooltip>
                  <span> {workpost?.location}</span>
                </div>
                <div className="flex-row w-auto">
                  {workpost?.likes?.filter(
                    (like) => like.liked_by.id == loginedUser.id
                  ).length > 0 ? (
                    <Heart
                      isActive={true}
                      className="float-left h-6 w-6"
                      onClick={() => {
                        removeLike();
                        trigger();
                        
                      }}
                    />
                  ) : (
                    <Heart
                      isActive={false}
                      className="float-left h-6 w-6"
                      onClick={() => {
                        add_like();
                        trigger();
                        
                      }}
                    />
                  )}
                  <span className="float-right ml-3">
                    {workpost?.like_count && workpost.like_count} likes
                  </span>
                </div>

                <Tooltip content="Date posted">
                  <Typography className="font-normal -mb-12 text-xs">
                    {workpost?.date}
                  </Typography>
                </Tooltip>
              </CardFooter>
            </Card>
          </div>
          <div className=" sm:h-[35rem] h-[10rem] gap-1 md:w-3/5 pr-5 m-1 bg-white">
            <div className="grid grid-col sm:h-4/5 h-[10rem] gap-1 w-full pr-5 m-1 bg-white overflow overflow-x-hidden overflow-y-auto ">
              {workpost && workpost.comments && workpost.comments.length > 0 ? (
                workpost.comments.map((comment) => {
                  return (
                    <div className="flex w-full gap-1 p-2 mt-2 h-28  ">
                      <Avatar
                        variant="circular"
                        alt="user 1"
                        className="border-2 border-white hover:z-10 focus:z-10"
                        src={
                          comment.commented_by.profile_image
                            ? comment.commented_by.profile_image
                            : ""
                        }
                      />
                      <div className="w-full">
                        <p>{comment.commented_by.username}</p>

                        <Textarea
                          className="bg-blue-100 w-full "
                          value={comment.text}
                          disabled
                        />
                      </div>
                      {comment.commented_by.id === loginedUser.id ? (
                        <p
                          className="cursor-pointer  italic text-sm text-brown-400 hover:text-red-500 float-left"
                          onClick={ (e) => {
                            deleteComment(comment.id);
                            trigger();
                            
                          }}
                        >
                          delete
                        </p>
                      ) : (
                        <div className="w-9"></div>
                      )}
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
                onClick={() =>{ newComment(workpost); trigger();}}
              >
                Post
              </button>
            </div>
          </div>
        </div>
      </Dialog>
   
  );
};

export default WorkDialog;

