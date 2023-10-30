import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { Provider } from 'react-redux';
import {Store} from "./redux/store"

 


ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={Store}>
  <GoogleOAuthProvider clientId="950502717815-2btf7jdnmgv07kvpj29cjks7j5v7oorg.apps.googleusercontent.com">
  <React.StrictMode>
   
      <App />
    
  </React.StrictMode>
  </GoogleOAuthProvider>
  </Provider>
  
);