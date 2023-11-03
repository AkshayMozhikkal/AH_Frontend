import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { Provider } from 'react-redux';
import {Store} from "./redux/store"
import { googleClientID } from "./constants/constants";


 


ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={Store}>
  <GoogleOAuthProvider clientId={googleClientID}>
  <React.StrictMode>
   
      <App />
    
  </React.StrictMode>
  </GoogleOAuthProvider>
  </Provider>
  
);