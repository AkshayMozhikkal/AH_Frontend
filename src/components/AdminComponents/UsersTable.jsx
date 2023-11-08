import {
  MagnifyingGlassIcon,
  ChevronUpDownIcon,
} from "@heroicons/react/24/outline";
import {
  Card,
  CardHeader,
  Input,
  Typography,
  Button,
  CardBody,
  Chip,
  CardFooter,
  Tabs,
  TabsHeader,
  Tab,
  Avatar,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Tooltip,
} from "@material-tailwind/react";
import { useEffect, useState } from "react";
import { userBaseURL, userDetailsURL } from "../../constants/constants";
import axios from "axios";
import { toast } from "react-toastify";
import CustomClockLoader from "../Loading/LoadingClock";

const TABS = [
  {
    label: "All",
    value: "all",
  },
  {
    label: "Artisan",
    value: "monitored",
  },
  {
    label: "Common",
    value: "unmonitored",
  },
];

const TABLE_HEAD = ["User", "Contact No:", "Status", "Type", "Action"];



export function UsersTable() {
  const [userData, setUserData] = useState([]);
  const [data, setData] = useState({});
  const [open, setOpen] = useState(false);
  const [userDetails, setUserDetails] = useState([]);
  const [users, setUsers] = useState([])
  const [update, setUpdate] = useState(false);
  const [searchKey, setSearchKey] = useState("");
  const [loading, setLoading] = useState(false);
 
  const handleUpdate = () => setUpdate((cur) => !cur);
  const handleLoading = () => setLoading((cur) => !cur);

  useEffect(() => {
    fetchData();
  }, [userDetails, update]);

  // Fetch User data
   const fetchData = async (NextorPrev) => {
    let url= userDetailsURL
    if(NextorPrev){
      url=NextorPrev
    }else{
      url=userDetailsURL
    }
    handleLoading()
    try {
      const response = await axios.get(url);
      console.log(response.data, "usersssssssssss");
      setData(response.data)
      setUsers(response.data.results)
      setUserData(response.data.results);
      handleLoading()
    } catch (error) {
      console.log(error.response, "Errorrr");
      handleLoading()
    }
  };



  // Block or Unblock
  const blockUnblock = async (value, userId) => {
    handleLoading()
    try {
      const response = await axios.patch(
        `${userBaseURL}block_or_unblock/${userId}/`,
        { is_active: value }
        
      );
      setUserDetails([]);
      fetchData()
      handleLoading()
      toast.success("Done..!");
    } catch (error) {
      setUserDetails([]);
      handleLoading()
    }
  };

  // Dialogue Box
  const handleOpen = (value, id, username) => {
    setUserDetails([value, id, username]);
    setOpen(!open);
  };


  // Search People
  const search = async ()=>{
    handleLoading()
    try {
      const res = await axios.get(`${userBaseURL}search_people/${searchKey}/`)
      console.log(res);
      setUserData(res.data)
      handleLoading()
    } catch (error) {
      console.log(error, 'searcherror');
      handleLoading()
      
    }
    
  }


  return (
    <div className="px-2 mt-8 sm:w-full mb-36">
     {loading && <CustomClockLoader />}
      <Dialog open={open} handler={handleOpen}>
        <DialogHeader>Block Or Unblock User</DialogHeader>
        <DialogBody divider>
          Do you want to {userDetails[0] == "False" ? "Block" : "Unblock"}{" "}
          {userDetails[2]} ?
        </DialogBody>
        <DialogFooter>
          <Button
            variant="text"
            color="red"
            onClick={() => setOpen(false)}
            className="mr-1"
          >
            <span>Cancel</span>
          </Button>
          <Button
            variant="gradient"
            color="green"
            onClick={() => {
              blockUnblock(userDetails[0], userDetails[1]);
              setOpen(false);
              
            }}
          >
            <span>Confirm</span>
          </Button>
        </DialogFooter>
      </Dialog>
      <Card className="h-full w-full">
        <CardHeader floated={false} shadow={false} className="rounded-none">
          <div className="mb-8 flex items-center justify-between gap-8">
            
          </div>
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
            <Tabs value="all" className="w-full md:w-max">
              <TabsHeader>
                {TABS.map(({ label, value }) => (
                  <Tab key={value} value={value} onClick={ (e)=>{ 
                      if (label=="Artisan"){ 
                        setUserData(users.filter((item)=>item.is_artisan===true));                      
                      }else if (label=="Common"){           
                        setUserData(users.filter((item)=>item.is_artisan===false));
                      }else{
                        setUserData(users) }  
                     }}>
                    &nbsp;&nbsp;{label}&nbsp;&nbsp;
                  </Tab>
                ))}
              </TabsHeader>
            </Tabs>
            <div className="w-full md:w-72">
              <Input
                label="Search"
                icon={<MagnifyingGlassIcon className="h-5 w-5 cursor-pointer" onClick={()=>search()}/>}
                onChange={(e)=>setSearchKey(e.target.value)}
              />
            </div>
          </div>
        </CardHeader>
        <CardBody className="overflow-auto px-0">
          <table className="mt-4 w-full min-w-max table-auto text-left">
            <thead>
              <tr>
                {TABLE_HEAD.map((head, index) => (
                  <th
                    key={head}
                    className="cursor-pointer border-y border-blue-gray-100 bg-blue-gray-50/50 p-4 transition-colors hover:bg-blue-gray-50"
                  >
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="flex items-center justify-between gap-2 font-normal leading-none opacity-70"
                    >
                      {head}{" "}
                      {index !== TABLE_HEAD.length - 1 && (
                        <ChevronUpDownIcon
                          strokeWidth={2}
                          className="h-4 w-4"
                        />
                      )}
                    </Typography>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {userData.map(
                (
                  {
                    id,
                    profile_image,
                    username,
                    email,
                    phone,
                    is_active,
                    is_artisan,
                    rating,
                  },
                  index
                ) => {
                  const isLast = index === userData.length - 1;
                  const classes = isLast
                    ? "p-4"
                    : "p-4 border-b border-blue-gray-50";

                  return (
                    <tr key={username}>
                      <td className={classes}>
                        <div className="flex items-center gap-3">
                          <Avatar
                            src={profile_image}
                            alt={username}
                            size="sm"
                          />
                          <div className="flex flex-col">
                            <Typography
                              variant="small"
                              color="blue-gray"
                              className="font-normal"
                            >
                              {username}
                            </Typography>
                            <Typography
                              variant="small"
                              color="blue-gray"
                              className="font-normal opacity-70"
                            >
                              {email}
                            </Typography>
                          </div>
                        </div>
                      </td>
                      <td className={classes}>
                        <div className="flex flex-col">
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal"
                          >
                            {phone}
                          </Typography>
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal opacity-70"
                          >
                            {is_artisan}
                          </Typography>
                        </div>
                      </td>
                      <td className={classes}>
                        {is_active ? (
                          <div
                            className="w-max"
                            onClick={() => {
                              handleOpen(false, id, username);
                            }}
                          >
                            <Chip
                              className="cursor-pointer"
                              variant="ghost"
                              size="sm"
                              value="Active"
                              color="green"
                            />
                          </div>
                        ) : (
                          <div
                            className="w-max"
                            onClick={() => {
                              handleOpen(true, id, username);
                            }}
                          >
                            <Chip
                              className="cursor-pointer"
                              variant="ghost"
                              size="sm"
                              value="blocked"
                              color="blue-gray"
                            />
                          </div>
                        )}
                      </td>
                      <td className={classes}>
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {is_artisan? "Artisan": "User"}
                        </Typography>
                      </td>
                      <td className={classes}>
                        <Tooltip content={is_active ? "Block User" : "Unblock"}>
                          {is_active ? (
                            <i className="fas fa-ban"
                            onClick={() => {
                              handleOpen("False", id, username);
                            }}></i>
                          ) : (
                            <i class="fas fa-shield-halved"
                            onClick={() => {
                              handleOpen("True", id, username);
                            }}></i>
                          )}
                        </Tooltip>
                      </td>
                    </tr>
                  );
                }
              )}
            </tbody>
          </table>
        </CardBody>
        <CardFooter className="flex items-center justify-between border-t border-blue-gray-50 p-4">
          <Typography variant="small" color="blue-gray" className="font-normal">
            Users {data?.results?.length} of {data.count}
          </Typography>
          <div className="flex gap-2">
            <Button variant="outlined" size="sm"
            onClick={()=>fetchData(data.previous)}>
              Previous
            </Button>
            <Button variant="outlined" size="sm"
            onClick={()=>fetchData(data.next)}>
              Next
            </Button>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
