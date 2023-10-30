
import React from 'react'
import SingleChat from '../../components/Chat/SingleChat'
import Chat from '../../components/Chat/Chat'
import ChatList from '../../components/Chat/ChatList'
import { Navbarr } from '../../components/navbar/navbar'
import { Footer } from '../../components/Footer/Footer'
import { Sidebar } from '../../components/sidebar/Sidebar'


function ChatBox() {
  return (
    <div>
    <Navbarr/>
    <div className='flex mt-24 mx-36'>
        <Sidebar selected={"Inbox"}/>
        
        <div className='ml-2 border-2 w-full shadow-md rounded-md'>
            <ChatList/>
        </div>
    
    </div>
    <Footer/>
    </div>
  )
}

export default ChatBox
