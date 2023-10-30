import { userAxiosInstance } from "../utils/axiosUtils";


// for user login
export const userLogin = (values)=>{
    return userAxiosInstance.post('token/', values,
     {withCredentials : true})
    .catch((error)=>{throw error; });
};

// for user Profile Edit
export const userEditProfile = (values)=>{
    return userAxiosInstance.patch('edit_profile/', values,
     {withCredentials : true})
    .catch((error)=>{throw error; });
};

// for user Works details
export const userWorksShared = (id)=>{
    return userAxiosInstance.get(`work/my_works/${id}`,
     {withCredentials : true})
    .catch((error)=>{throw error; });
};

// for user Address Fetch
export const userAddressdetails = (id)=>{
    return userAxiosInstance.get(`address/${id}`,
     {withCredentials : true})
    .catch((error)=>{throw error; });
};
// for user Address Add
export const userAddressAdd = (id, values)=>{
    return userAxiosInstance.post(`address/add/`,values,
     {withCredentials : true})
    .catch((error)=>{throw error; });
};

// for user Address Edit
export const userAddressEdit = (id, values)=>{
    return userAxiosInstance.patch(`address/${id}/`,values,
     {withCredentials : true})
    .catch((error)=>{throw error; });
};

// for user Connection Request
export const requestConnection = (values)=>{
    return userAxiosInstance.post(`connections/connection_request/`,values,
     {withCredentials : true})
    .catch((error)=>{throw error; });
};

// for user Connection Check
export const CheckConnection = (id)=>{
    return userAxiosInstance.get(`connections/connection_status/${id}/`,
     {withCredentials : true})
    .catch((error)=>{throw error; });
};

// for users Connections 
export const userConnections = ()=>{
    return userAxiosInstance.get(`connections/user_connections/`,
     {withCredentials : true})
    .catch((error)=>{throw error; });
};



// For Google Login
export const userGoogleLogin = (value) =>{
   const values = {
        email : value.email,
        username : value.email,
        first_name : value.given_name,
        last_name : value.family_name,
        password : value.id,
        
    }
    return userAxiosInstance.post("googleRegistration/", values, 
    {withCredentials : true})
    .catch((error)=>{throw error; });

};