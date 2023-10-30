import { Avatar, List, ListItem } from "@material-tailwind/react";
import { ListItemIcon, ListItemText, TextField } from "@material-ui/core";
import React from "react";
import SingleChat from "./SingleChat";

function ChatList() {
  return (
    <div>
      <div className="flex w-auto m-2 bg-white-50 h-[600px]">
        <div>
          <List className="w-96 border-2 rounded-xl shadow-2xl h-full overflow-y-scroll">
            <ListItem className="mb-7 sticky z-10">
              <TextField
                id="outlined-basic-email"
                label="Search"
                variant="outlined"
                fullWidth
              />
            </ListItem>

            <ListItem  button key="RemySharp">
              <ListItemIcon>
                <Avatar
                  alt="Remy Sharp"
                  src="https://material-ui.com/static/images/avatar/1.jpg"
                />
              </ListItemIcon>
              <ListItemText primary="Remy Sharp">Remy Sharp</ListItemText>
              <ListItemText secondary="online" align="right"></ListItemText>
            </ListItem>

            <ListItem button key="Alice">
              <ListItemIcon>
                <Avatar
                  alt="Alice"
                  src="https://material-ui.com/static/images/avatar/3.jpg"
                />
              </ListItemIcon>
              <ListItemText primary="Alice">Alice</ListItemText>
            </ListItem>

            <ListItem button key="CindyBaker">
              <ListItemIcon>
                <Avatar
                  alt="Cindy Baker"
                  src="https://material-ui.com/static/images/avatar/2.jpg"
                />
              </ListItemIcon>
              <ListItemText primary="Cindy Baker">Cindy Baker</ListItemText>
            </ListItem>

          
          </List>
        </div>

        <div className="w-full">
            <SingleChat user={"user"}/>

        </div>
      </div>
    </div>
  );
}

export default ChatList;
