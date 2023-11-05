import { Carousel, Typography, Button } from "@material-tailwind/react";
import samuel from "../../assets/images/static/samuel.jpg"
import artist1 from "../../assets/images/static/an_artist.jpg"
import artist3 from "../../assets/images/static/artist3.jpg"

 
export function CarouselWithContent() {
  return (
    <Carousel className="xl ">
      <div className="relative h-full w-full">
        <img
          src={samuel}
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
              Crafting Dreams, Forging Bonds, Creating Art - Where Artisans Unite.
            </Typography>
            <Typography
              variant="lead"
              color="white"
              className="mb-12 opacity-80"
            >
              Welcome to ArtisanHub. Create your account, connect with artisans, Make 
              collaborations on work. Scroll down and see some posts shared..
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
      <div className="relative h-full w-full">
        <img
        src={artist1}  
        alt="image 2"
          className="h-full w-full "
        />
        <div className="absolute inset-0 grid h-full w-full items-center bg-black/75">
          <div className="w-3/4 pl-12 md:w-2/4 md:pl-20 lg:pl-32">
            <Typography
              variant="h1"
              color="white"
              className="mb-4 text-3xl md:text-4xl lg:text-5xl"
            >
              Crafting Dreams, Forging Bonds, Creating Art - Where Artisans Unite.
            </Typography>
            <Typography
              variant="lead"
              color="white"
              className="mb-12 opacity-80"
            >
              Welcome to ArtisanHub. Create your account, connect with artisans, Make 
              collaborations on work. Scroll down and see some posts shared..
            </Typography>
            <div className="flex gap-2">
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
      <div className="relative h-full w-full">
        <img
           src={artist3}         
            alt="image 3"
          className="h-full w-full "
        />
        <div className="absolute inset-0 grid h-full w-full items-end bg-black/75">
          <div className="w-3/4 pl-12 pb-12 md:w-2/4 md:pl-20 md:pb-20 lg:pl-32 lg:pb-32">
            <Typography
              variant="h1"
              color="white"
              className="mb-4 text-3xl md:text-4xl lg:text-5xl"
            >
              Crafting Dreams, Forging Bonds, Creating Art - Where Artisans Unite.
            </Typography>
            <Typography
              variant="lead"
              color="white"
              className="mb-12 opacity-80"
            >
              Welcome to ArtisanHub. Create your account, connect with artisans, Make 
              collaborations on work. Scroll down and see some posts shared..
            </Typography>
            <div className="flex gap-2">
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
    </Carousel>
  );
}