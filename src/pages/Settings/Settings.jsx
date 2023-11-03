import React, { useState } from "react";
import { Footer } from "../../components/Footer/Footer";
import { Navbarr } from "../../components/navbar/navbar";
import { Sidebar } from "../../components/sidebar/Sidebar";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { userChangePassword } from "../../services/userAPIs";
import { Input } from "@material-tailwind/react";

function Settings() {
  const loginedUser = useSelector((state) => state.user.userInfo);
  const [show, setShow] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleShow = () => setShow((cur) => !cur);
  const [data, setData] = useState({
    oldPass: "",
    newPass: "",
    newPassConf: "",
  });

  const submitHandle = async () => {
    console.log(loginedUser, "user");
    if (data?.newPass != data?.newPassConf) {
      toast.error("Passwords Missmatch, Enter Again..");
      setData({ ...data, newPass: "", newPassConf: "" });
      return;
    } else {
      try {
        const res = await userChangePassword(data);
        console.log(res);
        if (res?.status == 200) {
          toast.success(res.data["message"]);
          setData({ oldPass: "", newPass: "", newPassConf: "" });
        } else {
          toast.error(res.data["message"]);
        }
      } catch (error) {
        console.log(error, "changepasserror");
        toast.error(error.response.data["message"]);
      }
    }
  };

  return (
    <div>
      <Navbarr />
      <div className="flex mt-24 mx-36">
        <Sidebar selected={"Settings"} />
        <div className="flex-col bg-gray-100 w-full p-4 shadow-lg border-2 max-h-[850px] overflow-y-scroll">
          <p
            onClick={() => handleShow()}
            className="text-blue-500 cursor-pointer hover:underline"
          >
            Reset Password
          </p>
          {show && (
            <div className="bg-white w-2/5 mt-5 p-4 rounded-lg shadow-md">
              <div className="flex  justify-center items-center">
              <span
                  onClick={() => setShowPassword(!showPassword)}
                  className="mt-4 ml-2  transform -translate-y-1/2 cursor-pointer"
                >
                  {showPassword ? <i className="text-blue-700 fas fa-eye"></i> : <i className=" fas fas-solid fa-eye"></i>}
                  
                </span>


              </div>
              
              <div className="flex justify-center items-center mb-4">
                <Input
                 size="lg"
                  type={showPassword ? "text" : "password"}
                  name="oldPass"
                  label="Old Password"
                  value={data.oldPass}
                  onChange={(e) =>
                    setData({ ...data, [e.target.name]: e.target.value })
                  }
                  
                />
               
              </div>
              <div className="mb-4">
                <Input
                 size="lg"
                  type={showPassword ? "text" : "password"}
                  name="newPass"
                  label="New Password"
                  value={data.newPass}
                  onChange={(e) =>
                    setData({ ...data, [e.target.name]: e.target.value })
                  }
                 
                />
              </div>
              <div className="mb-4">
                <Input
                 size="lg"
                  type={showPassword ? "text" : "password"}
                  name="newPassConf"
                  label="Confirm New Password"
                  value={data.newPassConf}
                  onChange={(e) =>
                    setData({ ...data, [e.target.name]: e.target.value })
                  }
                  
                />
              </div>
              <button
                onClick={submitHandle}
                className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring focus:ring-blue-500"
              >
                Reset
              </button>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Settings;
