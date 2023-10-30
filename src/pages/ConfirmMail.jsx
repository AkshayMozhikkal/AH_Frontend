import React, { useState, useEffect } from "react";
// import Loader from "../components/Loading/Loading";
import { ToastContainer, toast } from "react-toastify";
import EmailOpen from "../assets/images/mail/EmailOpen.png";
import { Link, useNavigate } from "react-router-dom";
import { CommonNavbar } from "../components/navbar/CommonNavbar";
import { Footer } from "../components/Footer/Footer";

function ConfirmMail() {
  const navigate = useNavigate();
  const [Email,setEmail] = useState({email:''})
  // Loading
  const [loading, setLoading] = useState(false);
  const handleLoading = () => setLoading((cur) => !cur);

  useEffect(() => {
    document.title = "Mail | ArtisanHub";
    setEmail({...Email,email:localStorage.getItem('email')})
  }, []);

  const Gmail = () => {
    window.open("https://mail.google.com/mail/u/0/#inbox", "_blank");
  };


//   const ReSend = async () => {
//     handleLoading();
//     try {
//       const response = await axios.post(
//         UserUrl + "/api/forgotpassword/",
//         Email
//       );
//       if (response.data.status === "success") {
//         console.log(response);
//         handleLoading();
//         toast.success(response.data.msg);
//         // setemail({ email: "" });
//         localStorage.setItem("UserId", response.data.user);
//         localStorage.removeItem("email");
//       } else {
//         handleLoading();
//         toast.error(response.data.msg);
//         // setemail({ email: "" });
//       }
//     } catch (error) {
//       handleLoading();
//       toast.error("Some think wrong");
//     }
//   };
  return (
    <>
      {loading && <Loader />}
      <ToastContainer />
      <CommonNavbar/>
      <div className=" grid grid-rows mt-48">
        
        <div className="container mx-auto grid grid-rows-[13rem,5rem,3rem,5rem,4rem] -mt-32">
          <div className="flex justify-center">
            <img src={EmailOpen} className="w-56" alt="" />
          </div>
          <div className="mt-5 flex justify-center">
            <p className="font-semibold sm:text-2xl text-xl">
              Verify your email to continue
            </p>
          </div>
          <div className="flex items-center justify-center">
            <p className="text-center text-md">
              Please check your email and select the link provided to verify
              your <br /> address.
            </p>
          </div>
          <div
            // onClick={() => navigate("/forgotpassword")}
            className="text-sm sm:mt-0 mt-4 text-purple-400 font-bold flex justify-center"
          >
            <p className="cursor-pointer"> Change email</p>
          </div>
          <div className="flex justify-center ">
            <div className="flex justify-between sm:text-lg text-sm">
              <button
                // onClick={ReSend}
                className="rounded-full border-purple-400 border-2 font-bold sm:px-10 px-6  my-2 text-purple-400 xs:me-0 ms-3"
              >
                Resend Email
              </button>
              <button
                onClick={Gmail}
                className="text-white bg-purple-400 rounded-full sm:px-6 px-4 ms-5 my-2 xs:me-0 me-3 font-bold"
              >
                Go to Gmail inbox
              </button>
            </div>
          </div>
        </div>
      </div>
      <Footer/>
    </>
  );
}

export default ConfirmMail;