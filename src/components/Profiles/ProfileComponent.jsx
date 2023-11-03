import React, { useState, useEffect, useRef } from "react";
import {
  Button,
  Dialog,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Input,
  DialogBody,
  DialogFooter,
  Textarea,
  DialogHeader,
  
} from "@material-tailwind/react";
import jwtDecode from "jwt-decode";
import axios from "axios";
import { WorkBaseURL, chatBaseURL, singleUserURL, userBaseURL } from "../../constants/constants";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import defaultUser from "../../assets/images/static/default-user-icon-8.jpg"
import ArtWorkPost from "../UserComponents/ArtWorkPosts";
import { useDispatch } from "react-redux";
import { setAddressDetails, setConnectionsDetails, setUserDetails, setWorksDetails } from "../../redux/users";
import Loader from "../Loading/Loading";
import { userAddressAdd, userAddressEdit, userAddressdetails } from "../../services/userAPIs";

function ProfileComponent() {
  const navigate = useNavigate();
  const [open, setOpen] = React.useState(false);
  const [newImg, setNewImg] = React.useState(null);
  const [open2, setOpen2] = React.useState(false);
  const [user, setUser] = useState({});
  const [data, setData] = useState({});
  const [update, setUpdate] = useState(false);
  const [loading, setLoading] = useState(false);
  const [address, setAddress] = useState();
  const [connections, setConnections] = useState([]);
  const [works, setWorks] = useState([]);
  const [art, setArt] = useState("");
  const [chatCount, setChatCount] = useState(0);

  const dispatch = useDispatch();

  const targetDivRef = useRef();

  const handleOpen = () => {
    if (open){
      setData(user)
    }
    setOpen((cur) => !cur); 
  };

  const open2handle = () => setOpen2((cur) => !cur);
  const handleUpdate = () => setUpdate((cur) => !cur);
  const handleLoading =() => setLoading((cur)=> !cur)
  
 
//  User Fetch
  const fetchuserdata = async (decoded) => {
    handleLoading();

    const userId = decoded.id;
    try {
      const res = await axios.get(`${singleUserURL}${userId}`);
      
      setUser(res.data);
      setData(res.data);
      dispatch(setUserDetails({userInfo : res.data}))
      handleLoading();
      
    } catch (error) {
      console.log(error);
      handleLoading();

    }
  };

  // Address Fetch
  const fetchUserAddress = async (decoded) => {
    handleLoading();

    const userId = decoded.id;
    try {
      const res = await userAddressdetails(userId);
      
      setAddress(res.data);
      setNewAddrs(res.data)
      dispatch(setAddressDetails({AddressInfo : res.data}))
      handleLoading();
      
    } catch (error) {
      console.log(error);
      handleLoading();

    }
  };

  // Chat count fetch
  const fetchChatCount = async (decoded)=>{
    const userId = decoded.id
    try {
      const res = await axios.get(`${chatBaseURL}single_user_chats/${userId}/`)
      setChatCount(res.data.chat_count)
      
    } catch (error) {
      console.log(error, 'ChatcountError');
      
    }
  }

  // Connections Fetch
  const fetchUserConnections = async (decoded) => {
    handleLoading();

    const userId = decoded.id;
    try {
      const conRes = await axios.get(`${userBaseURL}connections/user_connections/${userId}`);
      if (conRes.data){
        const acceptedConnections = conRes.data.filter((conn) => conn.status == 'a');
        setConnections(acceptedConnections)  }     
      console.log(conRes, 'connectionsFetchsuccess');
      dispatch(setConnectionsDetails({connectionsInfo : conRes.data}))
      handleLoading();
      
    } catch (error) {
      console.log(error, 'fetchconnectionsErrorr');
      handleLoading();

    }
  };

  // WorkPosts Fetch
  const fetchUserworkPosts = async (decoded) => {
    handleLoading();

    const userId = decoded.id;
    try {
      const response = await axios.get(`${WorkBaseURL}my_works/${userId}`);
      if (response.data){
        setWorks(response.data)
          }     
      console.log(response, 'WorkPostFetchSuccess');
      dispatch(setWorksDetails({worksInfo : response.data}))
      handleLoading();
      
    } catch (error) {
      console.log(error, 'fetchWorkPostError');
      handleLoading();

    }
  };

  
  // Add or Edit Address
  const [open4, setOpen4] = useState(false);
  const [newAddrs, setNewAddrs] = useState({
    user:user.id,
    home:"",
    city:"",
    district:"",
    state:"",
    pin:"",
  })

    const addressDialog = ()=>{
      if (open4){
        setNewAddrs(address);
      }
      setOpen4((cur)=>!cur);
   };

   const addressUpload = async(action)=>{
     try {
      if (action == "add"){
        console.log(newAddrs,"newaddrss");
        const response = await userAddressAdd(user.id, {...newAddrs, user:user.id});
        setAddress(response.data);
        dispatch(setAddressDetails({AddressInfo : response.data}))

        addressDialog();
        handleUpdate();
 
      }else{
        const response = await userAddressEdit(user.id,{...newAddrs, user: user.id});
        setAddress(response.data);
        console.log(response);
        dispatch(setAddressDetails({AddressInfo : response.data}))
        addressDialog();
        handleUpdate();
      }
      
     } catch (error) {
      console.log(error, "address error");
      if (error.response.data['pin']){
        toast.error("PIN code should be 6 numbers..")
      }
      toast.error("Home or PIN code cannot be blank..!")
      addressDialog();
      
     }

   }
    


  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      const decoded = jwtDecode(token);

      fetchuserdata(decoded);
      fetchUserAddress(decoded);
      fetchUserConnections(decoded);
      fetchUserworkPosts(decoded);
      fetchChatCount(decoded);
    }
  }, [update]);


// Edit User
  const editUser = async () => {
    handleLoading();

    if (data.phone) {
      var x = data.phone;
      if (x.toString().length < 10 || x.toString().length > 10) {
        handleLoading();

        toast.error("Please enter valid Phone number.");
        handleOpen();
        return;
      }
    }

    

    const userId = data.id;
    try {
      const response = await axios.patch(
        `${userBaseURL}edit_profile/${userId}/`,
        data
      );
      console.log("Updated", response);
      handleLoading();

      if (response.status == 200) {
        toast.success("Profile details updated..!");
        handleUpdate();
      } else {
        toast.error("Something went wrong..");
      }
      handleOpen();
    } catch (error) {
      console.log(error);
      handleLoading();

      toast.error(error.response.data.email[0] && error.response.data.email[0]);
      toast.error(
        error.response.data.username[0] && error.response.data.username[0]
      );
      handleOpen();
    }
  };




  // Setting image Preview
  const [showImage, setShowImage] = useState();
  const setimage = (e) => {
    const file = e.target.files[0];

    if (file) {
      const reader = new FileReader();

      reader.onload = (e) => {
        setShowImage(e.target.result);
      };

      reader.readAsDataURL(file);
    }
  };

  // Upload Image
  const uploadImage = async () => {
    handleLoading();

    setOpen2(false);
    const userId = data.id;
    const formData = new FormData();
    formData.append("profile_image", newImg);

    try {
      const response = await axios.patch(
        `${userBaseURL}upload_image/${userId}/`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log(response, "Vannuuu");
      handleLoading();

      handleUpdate();
      toast.success("Profile Image Changed Successfully");
      setNewImg(null);
    } catch (error) {
      handleLoading();

      toast.error("Something went wrong..!");
      console.log(error, "ErrorVannu");
      setNewImg(null);
    }
  };


  const [open3, setOpen3] = useState(false)
  const artisanDialog = ()=>{
    setOpen3((cur)=>!cur)
  }

  // Be Artisan
  const beArtisan = async () => {

    const userId = data.id;
    if(art == ""){
      toast.error("Specify your work to become an artisan..!")
      return
    }
    try {
      const response = await axios.patch(
        `${userBaseURL}edit_profile/${userId}/`,
        { is_artisan:true , art:art}
      );
      console.log("Updated", response);
      if (response.status == 200) {
        toast.success("Congrats..! You are an Artisan now.");
        handleUpdate();
      } else {
        toast.error("Something went wrong..");
      }
      
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.email[0] && error.response.data.email[0]);
      toast.error(
        error.response.data.username[0] && error.response.data.username[0]
      );
      
    }

  }
  
  
  return (
    <div className="pt-5 w-full ">
      {loading && <Loader/>}
      <Dialog open={open2} handler={open2handle}>
        <DialogBody>
          <div className="flex items-center justify-center w-full ">
            <label
              for="dropzone-file"
              className="flex flex-col items-center justify-center w-full h-52 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
            >
              {newImg ? (
                <img src={showImage} className="w-56 h-full" />
              ) : (
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                   
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
                  
                  
                  <p className="mb-2  text-sm text-gray-500 dark:text-gray-400">
                    <span className="font-semibold">Click to upload</span> or
                    drag and drop image
                  </p>
                  <img className="w-36 h-24 mb-4 " src={user.profile_image} alt="" />
                 
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
                  setNewImg(e.target.files[0]);
                  console.log(newImg);
                  setimage(e);
                }}
              />
            </label>
          </div>
        </DialogBody>
        <DialogFooter>
          <Button
            variant="text"
            color="red"
            onClick={() => {
              open2handle();
              setNewImg(null);
            }}
            className="mr-1"
          >
            <span>Cancel</span>
          </Button>
          <Button variant="gradient" color="green" onClick={uploadImage}>
            <span>Upload</span>
          </Button>
        </DialogFooter>
      </Dialog>

      <div className="w-full lg:w-10/12 px-4 shadow-xl mx-auto">
        <div className="relative flex flex-col min-w-0 break-words w-full mb-6 bg-blue+++-50 shadow-xl rounded-lg mt-16">
          <div className="px-6">
            <div className="flex flex-wrap justify-center">
              <div className="w-full px-4 flex justify-center">
                <div
                  className="relative mb-14 shadow-xl  "
                  onClick={open2handle}
                >
                  <img
                    alt="..."
                    src={user.profile_image ? user.profile_image : defaultUser }
                    className="shadow-2xl border-4 hover:scale-105 transition-transform border-gray-200 rounded-full align-middle absolute -m-16 -ml-20 lg:-ml-16  min-w-[170px] h-40 cursor-pointer "
                  />
                </div>
              </div>
              <div className="w-full px-4 text-center mt-20">
                <div className="flex justify-center py-4 lg:pt-4 pt-8">
                  <div className="mr-4 p-3 text-center cursor-pointer hover:text-blue-500  hover:font-bold" onClick={()=> navigate("/my_connections")}>
                    <span className="text-xl font-bold block uppercase tracking-wide text-blueGray-600">
                      { connections.length }
                    </span>
                    <span className="text-sm text-blueGray-400">
                    <i className="fas fa-user-group mr-2 text-xl"></i>
                      Connections
                    </span>
                  </div>
                  <div className="mr-4 p-3 text-center cursor-pointer hover:text-blue-500  hover:font-bold" onClick={() => {!user.is_artisan ? navigate("/posts"):targetDivRef.current.scrollIntoView({ behavior: 'smooth' });}}>
                    <span className="text-xl font-bold block uppercase tracking-wide text-blueGray-600">
                      { works.length }
                    </span>
                    <span
                      className="text-sm text-blueGray-400"
                      
                    >
                      Posts
                    </span>
                  </div>
                  <div className="lg:mr-4 p-3 text-center cursor-pointer hover:text-blue-500  hover:font-bold" onClick={()=>navigate("/inbox")}>
                    <span className="text-xl font-bold block uppercase tracking-wide text-blueGray-600">
                    {chatCount}
                    </span>
                    <span className="text-sm text-blueGray-400">
                    <i className="fas fa-comments mr-2 text-xl text-blueGray-400"></i>
                    Chat
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div className="text-center mt-12">
              <h3 className="text-xl font-semibold leading-normal  text-blueGray-700 mb-2">
                {user.first_name} {user.last_name}
              </h3>
              <div className="text-sm leading-normal mt-0 mb-2 text-blueGray-400 font-bold hover:text-blue-400 cursor-pointer">
                <i className="fas fa-map-marker-alt mr-2 text-lg text-blueGray-400"></i>
             {address? <span>{address.home},{address.city},{address.district},{address.state},{address.pin}  ||  <i className="fas fa-pen hover:text-blue-800 cursor-pointer" onClick={()=>addressDialog()}></i></span>: <span onClick={()=>addressDialog()}>Add Address..</span>}
              
              </div>

              <Dialog
                    size="xs"
                    open={open4}
                    handler={addressDialog}
                    className="bg-transparent shadow-none"
                  >
                    <Card className="mx-auto w-full max-w-[24rem]">
                      <CardHeader
                        variant="gradient"
                        color="blue"
                        className="mb-4 grid h-14 place-items-center"
                      >
                        <Typography variant="h3" color="white">
                          {address ? "Edit Address" : "Add Address"}
                        </Typography>
                      </CardHeader>
                      <CardBody className="flex flex-col gap-4">
                        <Input
                          name="home"
                          label="House No"
                          value={newAddrs?.home}
                          onChange={(e) => {
                            setNewAddrs({
                              ...newAddrs,
                              [e.target.name]: e.target.value,
                            });
                          }}
                          size="lg"
                        />
                        <Input
                          name="city"
                          label="City"
                          value={newAddrs?.city}
                          onChange={(e) => {
                            setNewAddrs({
                              ...newAddrs,
                              [e.target.name]: e.target.value,
                            });
                          }}
                          size="lg"
                        />
                        <Input
                          name="district"
                          label="District"
                          value={newAddrs?.district}
                          onChange={(e) => {
                            setNewAddrs({
                              ...newAddrs,
                              [e.target.name]: e.target.value,
                            });
                          }}
                          size="lg"
                        />
                        <Input
                          name="pin"
                          label="PIN"
                          value={newAddrs?.pin}
                          onChange={(e) => {
                            setNewAddrs({
                              ...newAddrs,
                              [e.target.name]: e.target.value,
                            });
                          }}
                          type="number"
                          size="lg"
                        />

                        <Input
                          name="state"
                          label="State"
                          value={newAddrs?.state}
                          onChange={(e) => {
                            setNewAddrs({
                              ...newAddrs,
                              [e.target.name]: e.target.value,
                            });
                          }}
                          size="lg"
                        />
                      </CardBody>
                      <CardFooter className="pt-0">
                        <Button
                          variant="gradient"
                          color="pink"
                          onClick={ ()=>{address? addressUpload("update") : addressUpload("add")}}
                          fullWidth
                        >
                        {address?"Update": "Add Address"}
                        </Button>
                      </CardFooter>
                    </Card>
                  </Dialog>

              <div className="mb-2 text-blueGray-600 mt-10">
                <i className="fas fa-mobile mr-2 text-lg text-blueGray-400"></i>
                Phone - {user.phone ? user.phone : "  ____________"}
              </div>
              <div className="mb-2 text-blueGray-600">
                <i className="fas fa-envelope mr-2 text-lg text-blueGray-400"></i>
                Email - {user.email}
              </div>
            </div>
            <div className="mt-10 py-10 border-t border-blueGray-200 text-center">
              <div className="flex flex-wrap justify-center">
                <div className="w-full lg:w-9/12 px-4">
                  <p className="mb-4 text-lg leading-relaxed text-blueGray-700">
                    {user.about ? user.about : user.art ? `${user.first_name} is a famous ${user.art}`: ""}
                  </p>
                  <button className="font-normal w-full h-9 border-blue-400 shadow-lg rounded-xl border-2  bg-white hover:bg-gray-50 hover:text-light-blue-900 hover:font-semibold text-blue-500" onClick={handleOpen}>
                    Edit Profile
                  </button>
                  <Dialog
                    size="xs"
                    open={open}
                    handler={handleOpen}
                    className="bg-transparent shadow-none"
                  >
                    <Card className="mx-auto w-full max-w-[24rem]">
                      <CardHeader
                        variant="gradient"
                        color="pink"
                        className="mb-4 grid h-14 place-items-center"
                      >
                        <Typography variant="h3" color="white">
                          Edit Profile
                        </Typography>
                      </CardHeader>
                      <CardBody className="flex flex-col gap-4">
                        <Input
                          name="first_name"
                          label="First Name"
                          value={data.first_name}
                          onChange={(e) => {
                            setData({
                              ...data,
                              [e.target.name]: e.target.value,
                            });
                          }}
                          size="lg"
                        />
                        <Input
                          name="last_name"
                          label="Last Name"
                          value={data.last_name}
                          onChange={(e) => {
                            setData({
                              ...data,
                              [e.target.name]: e.target.value,
                            });
                          }}
                          size="lg"
                        />
                        <Input
                          name="email"
                          label="Email"
                          value={data.email}
                          onChange={(e) => {
                            setData({
                              ...data,
                              [e.target.name]: e.target.value,
                            });
                          }}
                          size="lg"
                        />
                        <Input
                          name="phone"
                          label="Phone"
                          value={data.phone}
                          onChange={(e) => {
                            setData({
                              ...data,
                              [e.target.name]: e.target.value,
                            });
                          }}
                          type="number"
                          size="lg"
                        />

                        <Textarea
                          name="about"
                          label="About"
                          value={data.about}
                          onChange={(e) => {
                            setData({
                              ...data,
                              [e.target.name]: e.target.value,
                            });
                          }}
                          size="lg"
                        />
                      </CardBody>
                      <CardFooter className="pt-0">
                        <Button
                          variant="gradient"
                          color="pink"
                          onClick={editUser}
                          fullWidth
                        >
                          Save Changes
                        </Button>
                        {!user.is_artisan?
                        <Typography
                          variant="small"
                          className="mt-6 flex justify-center"
                        >
                          Want to be an Artisan ?
                          <Typography
                            as="a"
                            href="#signup"
                            variant="small"
                            color="blue"
                            className="ml-1 font-bold"
                            onClick={() => {artisanDialog();
                            
                            }}
                              
                          >
                            Click here
                          </Typography>
                        </Typography>
                        
                        : <Typography
                        variant="small"
                        className="mt-6 flex justify-center"
                      >
                        Have you changed your Work Field ?
                        <Typography
                          as="a"
                          href="#signup"
                          variant="small"
                          color="blue"
                          className="ml-1 font-bold"
                          onClick={() => {artisanDialog();
                          
                          }}
                            
                        >
                          Update
                        </Typography>
                      </Typography>}
                      </CardFooter>
                    </Card>
                  </Dialog>

                  <Dialog size="xs" open={open3} handler={artisanDialog}>
                    <DialogHeader>Confirm.</DialogHeader>
                    <DialogBody><p className="m-2">Your field of Work/Art ?</p>
                      <Input label="Work title"  value={art} onChange={(e)=>{setArt(e.target.value)}}/>
                    </DialogBody>
                       
                    <DialogFooter>
                      <Button
                        variant="text"
                        color="red"
                        onClick={() => {
                          artisanDialog();
                        }}
                        className="mr-1"
                      >
                        <span>Skip</span>
                      </Button>
                      <Button variant="gradient" color="green" onClick={()=>{beArtisan(); artisanDialog();}}>
                        <span>Confirm</span>
                      </Button>
                    </DialogFooter>

                  </Dialog>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div ref={targetDivRef} >
      {user.is_artisan && <ArtWorkPost />}
      </div>
      
    </div>
    
  );
}

export default ProfileComponent;
