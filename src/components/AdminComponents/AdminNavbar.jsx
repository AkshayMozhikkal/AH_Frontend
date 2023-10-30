import {
    Navbar,
    IconButton,
    Button,
    Input,
  } from "@material-tailwind/react";
  import { BellIcon, Cog6ToothIcon } from "@heroicons/react/24/solid";
  import LogoNoBG from "../../assets/images/logos/LogoNoBG.png"
  import { Tooltip } from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";

   
  export function AdminNavbar() {
    const navigate = useNavigate()
    return (
      <Navbar className=" sticky top-0 z-30  h-max max-w-full rounded-none py-6 px-4 lg:px-8 lg:py-4 bg-blue-gray-50">
        <div className="flex flex-wrap items-center justify-between gap-y-4 text-blue-gray-900">
        
        <Tooltip content="Admin Pages">
           <img src={LogoNoBG} alt="Network Error" className="h-14 w-36 ml-9" />
        
        </Tooltip>
          
          <div className="ml-auto flex gap-1 md:mr-4">
            <Button variant="text" color="blue-gray" onClick={()=>{localStorage.removeItem("token"); navigate("/login")}}>
              Logout
              
            </Button>
            
            <IconButton variant="text" color="blue-gray">
              <BellIcon className="h-4 w-4" />
            </IconButton>
          </div>
          <div className="relative flex w-full gap-2 md:w-max">
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
        </div>
      </Navbar>
    );
  }