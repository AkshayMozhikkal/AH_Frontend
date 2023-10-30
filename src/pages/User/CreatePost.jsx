import React, { useEffect, useState } from "react";
import { Navbarr } from "../../components/navbar/navbar";
import { Footer } from "../../components/Footer/Footer";
import { Button, Input, Textarea } from "@material-tailwind/react";
import jwtDecode from "jwt-decode";
import axios from "axios";
import { WorkBaseURL } from "../../constants/constants";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { Sidebar } from "../../components/sidebar/Sidebar";

function CreatePost() {
  const [user, setUser] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      const decoded = jwtDecode(token);
      setUser(decoded);
      setPost({ ...post, user: decoded.id });
    }
  }, []);

  const [post, setPost] = useState({
    user: "",
    image: "",
    title: "",
    description: "",
    location: "",
  });
  const [showImage, setShowImage] = useState(null);

  const setimage = (e) => {
    const file = e.target.files[0];
    setPost({ ...post, image: e.target.files[0] });

    if (file) {
      const reader = new FileReader();

      reader.onload = (e) => {
        setShowImage(e.target.result);
      };

      reader.readAsDataURL(file);
    }
  };

  const postUpload = async () => {
    let formData = post;

    if (post.image) {
      formData = new FormData();
      formData.append("image", post.image);
      formData.append("location", post.location);
      formData.append("description", post.description);
      formData.append("title", post.title);
      formData.append("user", post.user);
    }
    setPost({
      ...post,
      image: "",
      title: "",
      description: "",
      location: "",
    })

    try {
      const response = await axios.post(`${WorkBaseURL}new_post/`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
   
      setShowImage(null)
      toast.success("Post shared..!");
      navigate("/profile");

      
    } catch (error) {
      const errors = error.response.data;
      for (const key in errors) {
        if (errors.hasOwnProperty(key)) {
          const errorMessages = errors[key];
          errorMessages.forEach((errorMessage) => {
            const cleanedMessage = errorMessage.replace("This field ", "");
            toast.error(`${key}  ${cleanedMessage}`);
          });
        }
      }
    }
  };

  return (
    <div >
      <Navbarr />
      <div className="flex mt-24 mx-36">
      <Sidebar selected={'Create New Post'}/>
      
      
      <div className="w-full h-full ml-2 mr-5 rounded-lg bg-white-50 border shadow-xl">
      <div className="text-xl font-serif mt-9 ml-20">
        Upload your Work {!user.is_artisan ? "need" : ""}:
      </div>
        <div className="relative flex items-center justify-center ml-20 w-2/5 h-96 mt-3 mr-10 ">
          
          <label
            for="dropzone-file"
            className="flex flex-col items-center justify-center w-full h-80 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
          >
            {showImage ? (
              
              <img src={showImage} className="w-56 h-full" />
            ) : (
              
              <div className="relative flex flex-col items-center justify-center pt-5 pb-6">
                
                <svg
                  className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 20 16"
                >
                  <path
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                  />
                </svg>
                <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                  <span className="font-semibold">Click to upload</span> or drag
                  and drop image
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  SVG, PNG, JPG or GIF (MAX. 800x400px)
                </p>
              </div>
            )}
            <input
              id="dropzone-file"
              type="file"
              className="hidden"
              accept="image/*"
              onChange={(e) => {
                setimage(e);
              }}
            />
          </label>
          {showImage && 
          <Button
          type="button"
          className="ml-2 bg-white text-blue-gray-300"
          onClick={() => {
            setShowImage(null);
          }}
        >
          Clear Image
        </Button>
          
          }
          
        </div>
        <div className="mx-20 ">
          <div className="pb-10 pl-3 w-2/5">
            <Input
              name="title"
              value={post.title}
              label="Title of Work"
              onChange={(e) =>
                setPost({ ...post, [e.target.name]: e.target.value })
              }
            ></Input>
          </div>
          <div className="pb-10 pl-3 w-2/5">
            <Input
              label="Location"
              name="location"
              value={post.location}
              onChange={(e) =>
                setPost({ ...post, [e.target.name]: e.target.value })
              }
            ></Input>
          </div>
          <div className="pl-3">
            <Textarea
              name="description"
              label="Description"
              value={
                post.description
                 
              }
              onChange={(e) =>
                setPost({ ...post, [e.target.name]: e.target.value })
              }
            ></Textarea>

            <Button
              type="button"
              className="mt-10 ml-4 mb-9"
              onClick={() => {
                postUpload();
              }}
            >
              Post
            </Button>
          </div>
        </div>
      </div>
      </div>
      <Footer />
    </div>
  );
}

export default CreatePost;
