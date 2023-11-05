import React from "react";
import ChatList from "../../components/Chat/ChatList";
import { Footer } from "../../components/Footer/Footer";
import { Sidebar } from "../../components/sidebar/Sidebar";
import { Navbarr } from "../../components/navbar/Navbar";

function ChatBox() {
  return (
    <div>
      <Navbarr />

      <div className="flex mt-24 mx-36">
        <Sidebar selected={"Inbox"} />

        <div className="ml-2 border-2 w-full shadow-md rounded-md">
          <ChatList />
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default ChatBox;
