import axios from "axios";
import { userBaseURL } from "../constants/constants";


// setting for Request time out
const createAxioxClient = (baseURL)=>{
    const client = axios.create({
        baseURL,
        timeout: 8000,
        timeoutErrorMessage: "Request timeout Please Try Again!!!"
    })
    return client
}

const attatchToken = (req, tokenName) =>{
    const authToken = localStorage.getItem('token')
    const tok = JSON.parse(authToken)
    
   
    if (authToken){
        req.headers.Authorization = `Bearer ${tok.access}`;
    }
    return req
}

const userAxiosInstance = createAxioxClient(userBaseURL)
userAxiosInstance.interceptors.request.use(async (req) =>{
    const modifiedReq = attatchToken(req, 'token')
    return modifiedReq
})



export { userAxiosInstance }