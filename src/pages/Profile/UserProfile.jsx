import React from 'react'
import { Footer } from '../../components/Footer/Footer'
import ProfileComponent from '../../components/Profiles/ProfileComponent'
import { Navbarr } from '../../components/navbar/Navbar'
import { Sidebar } from '../../components/sidebar/Sidebar'

function UserProfile() {
  return (
    <div>
        <Navbarr/>
        {/* <div className='w-full text-center font-serif font-semibold text-3xl underline mt-9 text-pink-800'></div> */}
        <div className='flex  mx-36 mt-24'>
        <Sidebar selected={'Profile'}/>

        <ProfileComponent  />

        </div>
       
        <Footer/>
    </div>
  )
}

export default UserProfile
