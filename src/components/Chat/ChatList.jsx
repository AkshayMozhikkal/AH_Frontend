import { Avatar, Input, List, ListItem } from "@material-tailwind/react";
import React, { useEffect, useState } from "react";
import SingleChat from "./SingleChat";
import { ConnectionBaseURL } from "../../constants/constants";
import { useSelector } from "react-redux";
import axios from "axios";

function ChatList() {
  const loginedUser = useSelector((state) => state.user.userInfo);
  const [connections, setConnections] = useState([]);
  const [selectedUser, setSelectedUser] = useState([]);
  const [searchKey, setSearchKey] = useState("");



  // Fetch Connections
  const fetchConnections = async () => {
    try {
      const res = await axios.get(
        `${ConnectionBaseURL}user_connections/${loginedUser.id}`
      );
      console.log(res.data, "connections");
      setConnections(res?.data?.filter((conn)=>conn.status=='a'));
    } catch (error) {
      console.log(error, "connectionsfetcherror");
    }
  };


   // Search from Connections
   const search = async (e)=>{
    setSearchKey(e.target.value);
    if(searchKey==""){
      fetchConnections()
    }else{
    try {
      const res = await axios.get(`${ConnectionBaseURL}search_connection/${loginedUser.id}/${searchKey}`)
      console.log(res);
      setConnections(res.data)
    } catch (error) {
      console.log(error, 'searcherror');
      
      }
    }
    
   }



  useEffect(() => {
    console.log(loginedUser, "logined userrrr");
    fetchConnections();
  }, []);
  return (
    <div>
      <div className="flex w-auto m-2 bg-white-50 h-[600px]">
        <div>
          <List className="w-96 border-2 rounded-xl shadow-2xl h-full overflow-y-scroll">
            <ListItem className="mb-7 sticky z-10">
              <Input
                onChange={(e)=>search(e)}
                value={searchKey}
                id="outlined-basic-email"
                label="Search"
                variant="outlined"
                fullWidth
              />
            </ListItem>

            {connections.length>0? connections.map((connection) => {
              return connection.from_users.id === loginedUser.id 
                 ? (
                <ListItem button key="RemySharp" onClick={()=>setSelectedUser(connection.to_users)}>
                  
                    <Avatar
                      className="mr-5"
                      alt="Remy Sharp"
                      src={connection.to_users.profile_image}
                    />
                    {connection.to_users.first_name}{" "}
                    {connection.to_users.last_name}
                  
                </ListItem>
              ) : (
                <ListItem button key="RemySharp" onClick={()=>setSelectedUser(connection.from_users)}>
                  
                    <Avatar
                      className="mr-5"
                      alt="Remy Sharp"
                      src={connection.from_users.profile_image}
                    />
                    {connection.from_users.first_name}{" "}
                    {connection.from_users.last_name}
                
                </ListItem>
              );
            }):
            (
              <ListItem button key="RemySharp" >
               
                 {searchKey !="" ? `No related users for ${searchKey}` : 'No connections to chat'}
                
                
              </ListItem>
            )
            
            
            }
          </List>
        </div>

        <div className="w-full">
          <SingleChat user={selectedUser} />
        </div>
      </div>
    </div>
  );
}

export default ChatList;
