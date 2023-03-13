import React, { useState } from 'react';
import AdminRoutez from './Routes/AdminRoutez';
import UserRoutez from './Routes/UserRoute';
import OperationsRoutes from './Routes/OperationsRoute'
import FinanceRoutes from './Routes/FinanceRoute'

import AuthPage from './Auth/Index';
import Login from './Auth/LogIn'
import './assets/css-styles/DashHomeStyle.css'
import './assets/css-styles/ModalStyle.css'
import './assets/css-styles/responsiveness.css'
import useToken from './Auth/useToken';
import { Toaster, toast } from 'react-hot-toast';

import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBY9Hnkk24LBpssv1JtT_RWf4bTxN7p1xg",
  authDomain: "terp-338409.firebaseapp.com",
  projectId: "terp-338409",
  storageBucket: "terp-338409.appspot.com",
  messagingSenderId: "897725695486",
  appId: "1:897725695486:web:9bea2bfd6a7bfdb319acaf",
  measurementId: "G-0W1SD57RWF"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);


function App() {
  const { user, setUserInfo } = useToken();
  console.log(`initial token: ${user}`)

  if (!user || Object.keys(user).length < 1) {
    return <AuthPage setUserInfo={setUserInfo} />

  }

  switch (user.role) {
    case "Admin":
      return (
        <div className="App">
          <AdminRoutez updateUser={setUserInfo} />
          <Toaster />
          
        </div>
      );
    case "Operations":
      return (
        <div className="App">
          <OperationsRoutes updateUser={setUserInfo} />
          <Toaster />
        </div>
      );

    case "Finance":
      return (
        <div className="App">
          <FinanceRoutes updateUser={setUserInfo} />
          <Toaster />
        </div>
      );
      // code block
    default:
    // code block
  }


}

export default App;
