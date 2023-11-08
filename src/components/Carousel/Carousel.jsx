import { Carousel, Typography, Button } from "@material-tailwind/react";
import { useEffect, useState } from "react";
import axios from "axios";
import { componentsBaseURL } from "../../constants/constants";

 
export function CarouselWithContent() {
  const [bannerData, setBannerData] = useState([])

  // fetch Banners
  const fetchBanners = async()=>{
    try {
      const res = await axios.get(`${componentsBaseURL}banners/`)
      setBannerData(res.data)
    } catch (error) {
      console.log(error);   
    }
  }

  useEffect(()=>{
    fetchBanners();
  },[])
  return (
    <Carousel className="xl ">
      {bannerData.map((banner)=>{return(
      <div className="relative h-full w-full">
        <img
          src={banner.image}
          alt="image 1"
          className="h-full w-full"
        />
        <div className="absolute inset-0 grid h-full w-full place-items-center bg-black/75">
          <div className="w-3/4 text-center md:w-2/4">
            <Typography
              variant="h1"
              color="white"
              className="mb-4 text-3xl md:text-4xl lg:text-5xl"
            >
             {banner.headline}
            </Typography>
            <Typography
              variant="lead"
              color="white"
              className="mb-12 opacity-80"
            >
              {banner.description}
            </Typography>
            <div className="flex justify-center gap-2">
              <Button size="lg" color="white">
                Explore
              </Button>
              <Button size="lg" color="white" variant="text">
                Gallery
              </Button>
            </div>
          </div>
        </div>
      </div>
      )})}
      
    </Carousel>
  );
}