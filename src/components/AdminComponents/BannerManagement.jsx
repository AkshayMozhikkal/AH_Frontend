import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { PencilIcon, UserPlusIcon } from "@heroicons/react/24/solid";
import {
  Card,
  CardHeader,
  Input,
  Typography,
  Button,
  CardBody,
  CardFooter,
  Avatar,
  IconButton,
  Tooltip,
} from "@material-tailwind/react";
import { useEffect, useState } from "react";
import BannerModal from "../DialogueBoxes/BannerModal";
import { componentsBaseURL } from "../../constants/constants";
import axios from "axios";
import { toast } from "react-toastify";



const TABLE_HEAD = ["Image", "Headline", "Description", "Order", "Edit"];



export function BannerManagement() {
    const [bannerData, setBannerData] = useState([])
    const [banner, setBanner]=useState({index:"", image:"", headline:"", description:""})
    const [open, setOpen] = useState(false)
    const [open2, setOpen2] = useState(false)
    const [image, setImage] = useState("")
    
    const openHandler = () => setOpen((cur) => !cur);
    const open2Handler = (banner) =>{setBanner(banner); setOpen2((cur) => !cur);}

     // fetch Banners
  const fetchBanners = async()=>{
    try {
      const res = await axios.get(`${componentsBaseURL}banners/`)
      setBannerData(res.data)
    } catch (error) {
      console.log(error);   
    }
  }

  // Delete Banner
  const deleteBanner = async()=>{
    try {
      const res = await axios.delete(`${componentsBaseURL}banner_edit/${banner.id}/`)
      fetchBanners();
      setBanner({index:"", image:"", headline:"", description:""})
      toast.success("Banner removed")
    } catch (error) {
      console.log(error);   
    }
  }
     // Add Banner
  const addBanner = async()=>{
    let data = banner
    
    if (banner.index == ""){
        toast.error("Specify the order")
        return
    }
    if (image != ""){
        const formData = new FormData();
        formData.append("image",image);
        formData.append("index", banner.index);
        formData.append("description", banner.description);
        formData.append("headline", banner.headline);  
        data =formData    
        
    }else{
        toast.error("Image is missing")
        return
    }
    try {
      const res = await axios.post(`${componentsBaseURL}banners/`,data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      fetchBanners();
      setBanner({order:"", image:"", headline:"", description:""})
      setImage("")
      toast.success("Banner Added")
    } catch (error) {
       toast.error(error.response.data.index[0])   
    }
  }

     // Edit Banner
  const editBanner = async()=>{
    delete banner.image
    let data =  banner
    
    if (image !=""){
        const formData = new FormData();
        formData.append("image",image);
        formData.append("index", banner.index);
        formData.append("description", banner.description);
        formData.append("headline", banner.headline);  
        data =formData    
    }

    try {
      const res = await axios.patch(`${componentsBaseURL}banner_edit/${banner.id}/`,data,{
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      fetchBanners();
      setBanner({order:"", image:"", headline:"", description:""})
      setImage("")
      toast.success("Banner Updated")
    } catch (error) {
      toast.error(error.response.data.index[0])    
    }
  }

  useEffect(()=>{
    fetchBanners();
  },[])
      
  return (
    <div className="px-2 mt-8 sm:w-full mb-36">
      <Card className="h-full w-full">
        <CardHeader floated={false} shadow={false} className="rounded-none">
          <div className="mb-8 flex items-center justify-between gap-8">
            <div>
              <Typography variant="h5" color="blue-gray">
                Banner list
              </Typography>
              <Typography color="gray" className="mt-1 font-normal">
                See information about all Banners
              </Typography>
            </div>
            <div className="flex shrink-0 flex-col gap-2 sm:flex-row">
             
              <Button className="flex items-center gap-3" size="sm" onClick={openHandler}>
                <UserPlusIcon strokeWidth={2} className="h-4 w-4" /> Add Banner
              </Button>
            </div>
          </div>
          <div className="flex flex-col float-right gap-4 md:flex-row">
           
            <div className="w-full md:w-72">
              <Input
                label="Search"
                icon={<MagnifyingGlassIcon className="h-5 w-5" />}
              />
            </div>
          </div>
        </CardHeader>
        <CardBody className="overflow-scroll px-0">
          <table className="mt-4 w-full min-w-max table-auto text-left">
            <thead>
              <tr>
                {TABLE_HEAD.map((head) => (
                  <th
                    key={head}
                    className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4"
                  >
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal leading-none opacity-70"
                    >
                      {head}
                    </Typography>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {bannerData.map(
                (banner,index) => {
                  const isLast = index === bannerData.length - 1;
                  const classes = isLast
                    ? "p-4"
                    : "p-4 border-b border-blue-gray-50";

                  return (
                    <tr key={banner.headline}>
                      <td className={classes}>
                        <div className="flex items-center gap-3">
                          <Avatar src={banner.image} alt="" size="sm" />
                          <div className="flex flex-col">
                            
                          </div>
                        </div>
                      </td>
                      <td className={classes}>
                        <div className="flex flex-col">

                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal w-40"
                          >
                            {banner.headline}
                          </Typography>
                            </div>
                      </td>
                      <td>
                      <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal opacity-70 w-40"
                          >
                            {banner.description}
                          </Typography>

                      </td>
                      <td className={classes}>
                        <div className="w-max">
                        <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal opacity-70"
                          >
                            {banner.index}
                          </Typography>
                        </div>
                      </td>
                      
                      <td className={classes}>
                        <Tooltip content="Check and Verify">
                          <IconButton variant="text" onClick={()=>open2Handler(banner)}>
                            <PencilIcon className="h-4 w-4" />
                          </IconButton>
                        </Tooltip>
                      </td>
                    </tr>
                  );
                }
              )}
            </tbody>
          </table>
        </CardBody>
        <CardFooter className="flex items-center justify-between border-t border-blue-gray-50 p-4">
          <Typography variant="small" color="blue-gray" className="font-normal">
            Page 1 of 10
          </Typography>
          <div className="flex gap-2">
            <Button variant="outlined" size="sm">
              Previous
            </Button>
            <Button variant="outlined" size="sm">
              Next
            </Button>
          </div>
        </CardFooter>
      </Card>

     {open && <BannerModal open={openHandler} image={image} setImage={setImage} deleteBanner={null} banner={banner} setBanner={setBanner} action={addBanner}/>}
     {open2 && <BannerModal open={open2Handler} image={image} setImage={setImage} deleteBanner={deleteBanner} banner={banner} setBanner={setBanner} action={editBanner}/>}
    </div>
  );
}
