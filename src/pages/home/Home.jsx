import React from 'react'
import {  Navbarr } from '../../components/navbar/navbar'
import { Footer } from '../../components/Footer/Footer'
import { CarouselWithContent } from '../../components/Carousel/Carousel'
import { PopularArtisan } from '../../components/Cards/PopularArtisans'

function Home() {
  return (
    <div>
      <Navbarr/>
      <CarouselWithContent/>
      <div className='flex justify-center mb-[40px] '>
      <p className="text-3xl underline underline-offset-[12px]  ">Popular Artisans</p>
      </div>
      <div className="flex justify-center  p-10 shadow-2xl rounded-lg border-zinc-950 overflow-x-auto md:mx-10 sm:mx-20">
       <PopularArtisan/>
       <PopularArtisan/>
       <PopularArtisan/>
       <PopularArtisan/>
       <PopularArtisan/>
       <PopularArtisan/>      
      </div>
      
      
      <Footer></Footer>
    </div>
  )
}

export default Home
