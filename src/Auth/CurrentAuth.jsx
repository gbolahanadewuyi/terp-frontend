import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Logo from "../assets/images/logo.png";
// import LogoDark from '../../images/logo-dark.png';
import SignUp from "./SignUp";
import PasswordResetConfirmation from "./password-recovery/PasswordResetConfirmation";
import ResetPassword from "./password-recovery/ResetPassword";
import ForgotPassword from "./password-recovery/ForgotPassword";
import LogIn from "./LogIn";

// redux
import { useSelector, useDispatch } from "react-redux";

export default function CurrentAuth({setUserInfo}) {
  //   redux variables
  const currentAuthPage = useSelector((state) => state.currentAuthPage);

  if (currentAuthPage === "SIGNUP") {
    return <SignUp />;
  } else if (currentAuthPage === "FORGOT_PASSWORD") {
    return <ForgotPassword />;
  } else if (currentAuthPage === "RESET_CONFIRMATION") {
    return <PasswordResetConfirmation />;
  } else if (currentAuthPage === "PASSWORD_RESET") {
    return <ResetPassword />;
  } else {
    return <LogIn setUserInfo={setUserInfo}/>;
  }
}
