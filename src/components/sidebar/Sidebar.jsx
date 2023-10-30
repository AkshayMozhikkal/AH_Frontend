import {
  Card,
  Typography,
  List,
  ListItem,
  ListItemPrefix,
  ListItemSuffix,
  Chip,
} from "@material-tailwind/react";
import {
  PresentationChartBarIcon,
  ShoppingBagIcon,
  UserCircleIcon,
  Cog6ToothIcon,
  InboxIcon,
  PowerIcon,
  ForwardIcon,
} from "@heroicons/react/24/solid";
import { useNavigate } from "react-router-dom";
import { PhotoIcon, ShareIcon, UserGroupIcon, UserIcon } from "@heroicons/react/24/outline";
import { resetState } from "../../redux/users";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";


export function Sidebar({ selected }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleItemClick = (route) => {
    navigate(route);
  };

  const logoutcall = ()=> {
    localStorage.removeItem('token');
    dispatch(resetState());
    toast.info("logged out successfully..")
    navigate("/login")
  
  }

  const items = [
    {
      text: "Profile",
      icon: <UserCircleIcon className="h-5 w-5" />,
      route: "/profile",
    },

    {
      text: "Inbox",
      icon: <InboxIcon className="h-5 w-5" />,
      route: "/inbox",
    },

    {
      text: "Shared Posts",
      icon: <PhotoIcon className="h-5 w-5" />,
      route: "/posts",
    },

    {
      text: "Create New Post",
      icon: <ForwardIcon className="h-5 w-5" />,
      route: "/new_post",
    },
    {
      text: "Connections",
      icon: <UserGroupIcon className="h-5 w-5" />,
      route: "/my_connections",
    },
    
    {
      text: "Settings",
      icon: <Cog6ToothIcon className="h-5 w-5" />,
      route: "/settings",
    },
    
    {
      text: "Log Out",
      icon: <PowerIcon className="h-5 w-5" />,
      route: "/logout",
    },
  ];

  

  return (
    <div className="mb-0.5 shadow-xl mr-5">
      <Card className="h-full w-full max-w-[32rem]  bg-white-50 rounded-lg border-2  shadow-5xl">
        <div className="font-bold text-black box-border shadow-md mb-5 p-5 ">
         
            PAGES
          
        </div>
        <List>
          {items.map((item, index) => (
            <ListItem
              key={index}
              onClick={() => {item.text==="Log Out" ? logoutcall()  :handleItemClick(item.route)}}
              className={item.text === selected ? "text-blue-600 text-xl bg-blue-100  rounded font-semibold hover:text-blue-500 hover:bg-blue-gray-100 w-80" :" hover:text-blue-300" }
            >
              <ListItemPrefix>{item.icon}</ListItemPrefix>
              {item.text}
            </ListItem>
          ))}
        </List>
      </Card>
    </div>
  );
}
