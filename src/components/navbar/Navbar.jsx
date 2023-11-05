import React, { useEffect, useState } from "react";
import logo from "../../assets/images/logos/Logo.png"
import {
  Navbar,
  Collapse ,
  Typography,
  Button,
  IconButton,
  Menu,
  Tooltip,
} from "@material-tailwind/react";

import {
  
  MenuHandler,
  MenuList,
  MenuItem,
  Avatar,
 
  
} from "@material-tailwind/react";

import {
  UserCircleIcon,
  ChevronDownIcon,
  Cog6ToothIcon,
  InboxArrowDownIcon,
  LifebuoyIcon,
  PowerIcon,

} from "@heroicons/react/24/outline";
import jwtDecode from "jwt-decode";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { singleUserURL } from "../../constants/constants";
import axios from "axios";
import { useDispatch } from "react-redux";
import { resetState, setUserDetails } from "../../redux/users";



const profileMenuItems = [
  {
    label: "My Profile",
    icon: UserCircleIcon,
  },
  {
    label: "Create Post",
    icon: Cog6ToothIcon,
  },
  {
    label: "Inbox",
    icon: InboxArrowDownIcon,
  },
  {
    label: "Help",
    icon: LifebuoyIcon,
  },
  {
    label: "Sign Out",
    icon: PowerIcon,
    
  },
];
 


  
  function ProfileMenu() {
    const [isMenuOpen, setIsMenuOpen] = React.useState(false);
    const [userData, setUserData] = useState({});
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect( ()=> {
      const token = localStorage.getItem('token')
      if(token){
        const decoded = jwtDecode(token)
        fetchuserdata(decoded)
      }
      

    }, []

    );

//  Fetch User data
  const fetchuserdata = async (decoded) => {
    const userId = decoded.id;
    try {
      const res = await axios.get(`${singleUserURL}${userId}`);
      
      setUserData(res.data);
      dispatch(setUserDetails({userInfo : res.data}))
      
    } catch (error) {
      console.log(error);
    }
  };  


// Logout Call
  const logoutcall = ()=> {
    localStorage.removeItem('token');
    setUserData({})
    dispatch(resetState());
    toast.info("logged out successfully..")
    navigate("/login")
  
  }
  


   
    const closeMenu = () => setIsMenuOpen(false);
   
    return (
      
          <Menu open={isMenuOpen} handler={setIsMenuOpen} placement="bottom-end">
            <MenuHandler>
              <Button
                variant="text"
                color="blue-gray"
                className="flex items-center gap-1 rounded-full py-0.5 pr-2 pl-0.5 lg:ml-auto"
              >
                <Avatar
                  variant="circular"
                  size="sm"
                  alt="tania andrew"
                  className="border border-gray-900 p-0.5"
                  src={userData.profile_image}
                />
                <ChevronDownIcon
                  strokeWidth={2.5}
                  className={`h-3 w-3 transition-transform ${
                    isMenuOpen ? "rotate-180" : ""
                  }`}
                />
              </Button>
            </MenuHandler>
            <MenuList className="p-1">
              
              {profileMenuItems.map(({ label, icon }, key) => {
                const isLastItem = key === profileMenuItems.length - 1;
                const logout = label === "Sign Out"
                const profile = label === "My Profile"
                const post = label === "Create Post"
                const inbox = label === "Inbox"
                
                return (
                  <MenuItem
                    key={label}
                    onClick={() => {
                      closeMenu
                      if (logout) {
                        logoutcall()
                      } else if(profile) {
                        navigate("/profile")
                      
                      } else if(post) {
                        navigate("/new_post")

                      } else if(inbox) {
                        navigate("/inbox")
                      }
                    }}
                    className={`flex items-center gap-2 rounded ${
                      isLastItem
                        ? "hover:bg-red-500/10 focus:bg-red-500/10 active:bg-red-500/10"
                        : ""
                    }`}
                  >
                    {React.createElement(icon, {
                      className: `h-4 w-4 ${isLastItem ? "text-red-500" : ""}`,
                      strokeWidth: 2,
                    })}
                    <Typography
                      as="span"
                      variant="small"
                      className="font-normal"
                      color={isLastItem ? "red" : "inherit"}
                      
                    >
                      {label}
                    </Typography>
                  </MenuItem>
                );
              })}
            </MenuList>
          </Menu>
        
    );
  }

//   End Profile Menu component


 
export function Navbarr() {
  const [openNav, setOpenNav] = React.useState(false);
  const [user_present, setUserPresent] = useState(false)
  const navigate = useNavigate()
  useEffect( ()=> {
    const token = localStorage.getItem('token')
    if(token){
       setUserPresent(true) 
      
    }
    

  }, []

  )
 
  React.useEffect(() => {
    window.addEventListener(
      "resize",
      () => window.innerWidth >= 960 && setOpenNav(false)
    );
  }, []);
 
  const navList = (
    <ul className="mb-4 mt-2 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6">
      <Typography
        as="li"
        variant="small"
        color="blue-gray"
        className="p-1 font-normal"
        onClick={()=>navigate("/profile")}
      >
        <a href="#" className="flex items-center">
          Pages
        </a>
      </Typography>
      <Typography
        as="li"
        variant="small"
        color="blue-gray"
        className="p-1 font-normal"
        onClick={()=>navigate("/people")}
      >
        <a href="#" className="flex items-center">
          Find People
        </a>
      </Typography>
      <Typography
        as="li"
        variant="small"
        color="blue-gray"
        className="p-1 font-normal"
      >
        <a href="#" className="flex items-center">
          Blocks
        </a>
      </Typography>
      <Typography
        as="li"
        variant="small"
        color="blue-gray"
        className="p-1 font-normal"
      >
        <a href="#" className="flex items-center" onClick={()=> navigate("/login")}>
          {user_present? '': 'Login/Register'}
        </a>
      </Typography>
      {/* <div className="relative flex w-full gap-2 md:w-max">
          <Input
            type="search"
            label="Type here..."
            className="pr-20"
            containerProps={{
              className: "min-w-[288px]",
            }}
          />
          <Button size="sm" className="!absolute right-1 top-1 rounded">
            Search
          </Button>
        </div>
      
       */}
     
    </ul>
  );
 
  return (
    <div className=" w-screen overflow-hidden border shadow-md">
      <Navbar className="sticky top-0 z-10 h-16 max-w-full rounded-none  px-4 lg:px-8 lg:py-3">
        <div className="flex items-center justify-between px-7 text-blue-gray-900">
        <Tooltip content="ArtisanHub home"><img
            onClick={()=> {navigate("/")}}
            alt="nature"
            className="h-10 w-30 object-cover ml-3  "
            src={logo}
            
            />
            </Tooltip>
          <div className="flex items-center gap-4">
            <div className="mr-4 hidden lg:block">{navList}</div>
            {user_present && <ProfileMenu/>}
            
            <IconButton
              variant="text"
              className="ml-auto h-6 w-6 text-inherit hover:bg-transparent focus:bg-transparent active:bg-transparent lg:hidden"
              ripple={false}
              onClick={() => setOpenNav(!openNav)}
            >
              {openNav ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  className="h-6 w-6"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              )}
            </IconButton>
          </div>
        </div>
        <Collapse  open={openNav}>
          {navList}
        </Collapse >
      </Navbar>
      
    
     
    </div>
  );
}


