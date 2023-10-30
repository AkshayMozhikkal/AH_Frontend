import React from 'react'
import { Route, Routes } from 'react-router-dom'
import AdminHome from '../pages/Admin/AdminHome'

function AdminRoutes() {
  return (
    <>
        <Routes>
            <Route path='/' element={<AdminHome />} />         
        </Routes>
      
    </>
  )
}

export default AdminRoutes
