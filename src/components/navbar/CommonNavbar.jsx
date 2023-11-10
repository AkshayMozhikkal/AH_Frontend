import React from "react";
import Logo from "../../assets/images/logos/Logo.png"
import {
  Navbar,
  MobileNav,
  Typography,
  Button,
  IconButton,
  Collapse,
} from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

 
export function CommonNavbar() {
  const loginedUser = useSelector((state)=>state.user.userInfo)
  const navigate = useNavigate()
  const [openNav, setOpenNav] = React.useState(false);
 
  React.useEffect(() => {
    const token = localStorage.getItem('token')
    if (loginedUser.id || token){
      navigate("/")
    }
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
      >
        <a href="#" className="flex items-center">
          Account
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
        <a href="#" className="flex items-center">
          Docs
        </a>
      </Typography>
    </ul>
  );
 
  return (
   
      <Navbar className="sticky top-0 z-10 h-max max-w-full rounded-none ">
        <div className="flex items-center justify-between ml-8 text-blue-gray-900">

          <img src={Logo} 
          alt=""
          className="h-[61px] w-[165px] object-cover object-center" />

          <div className="flex items-center gap-4">
            <div className="mr-4 hidden lg:block"></div>
            <Button
              size="sm"
              className="hidden lg:inline-block bg-purple-400"
              onClick={()=>{
                navigate("/")
              }}
            >
              <span>Back to Home Page</span>
            </Button>
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
        <MobileNav open={openNav}>
          
          <Button variant="gradient" size="sm" fullWidth className="mb-2  bg-red-900" onClick={(e)=>{navigate("/home")}}>
            <span>Home Page</span>
          </Button>
        </MobileNav>
      </Navbar>

  );
}