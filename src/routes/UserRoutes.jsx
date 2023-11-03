import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from '../pages/home/Home'
import UserProfile from '../pages/Profile/UserProfile'
import WorkPosts from '../pages/User/WorkPosts'
import CreatePost from '../pages/User/CreatePost'
import ChatBox from '../pages/User/ChatBox'
import MyConnections from '../pages/Profile/MyConnections'
import Settings from '../pages/Settings/Settings'

function UserRoutes() {
  return (
    <div>
        <Routes>
            <Route element={<Home />} path='/' />
            <Route element={<UserProfile />} path='/profile' />
            <Route element={<WorkPosts/>} path='/posts' />
            <Route element={<CreatePost/>} path='/new_post' />
            <Route element={<ChatBox/>} path='/inbox' />
            <Route element={<MyConnections/>} path='/my_connections' />
            <Route element={<Settings/>} path='/settings' />



        </Routes>
      
    </div>
  )
}

export default UserRoutes
