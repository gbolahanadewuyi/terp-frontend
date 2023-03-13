import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

// redux
import { useDispatch } from "react-redux";
import {
  setAuthLogin,
  setAuthResetConfirmation,
} from "../../redux/actions/setCurrentAuthPage";

export default function ResetPassword() {
  //   redux variables
  const dispatch = useDispatch();

  return (
    <div className="col-span-3 md:col-span-2 p-5 md:px-28 px-10 my-auto">
      <h1 className="p-2 pl-0 text-3xl text-left">Reset Passord</h1>
      <h4 className="pl-0 text-left">Please choose your new password</h4>
      <form className="grid grid-cols-2 gap-5 mt-10">
        <div className="col-span-2 text-left mt-10">
          <label className="text-sm" htmlFor="login-password">
            New Password
          </label>
          <br></br>
          <span className="absolute z-10 py-4 pl-3">
            <FontAwesomeIcon icon={["fas", "shield-alt"]} />
          </span>
          <input
            type="password"
            className="pl-10 appearance-none border rounded w-full py-2 px-3 xtext-blue-700 bg-gray-100 mt-2 focus:outline-none focus:shadow-outline "
            placeholder="password"
            id="login-password"
            name="login-password"
          />
        </div>
        <div className="col-span-2 text-left mt-10 mb-10">
          <label className="text-sm" htmlFor="login-password">
            Confirm Password
          </label>
          <br></br>
          <span className="absolute z-10 py-4 pl-3">
            <FontAwesomeIcon icon={["fas", "shield-alt"]} />
          </span>
          <input
            type="password"
            className="pl-10 appearance-none border rounded w-full py-2 px-3 xtext-blue-700 bg-gray-100 mt-2 focus:outline-none focus:shadow-outline "
            placeholder="password"
            id="confirm-password"
            name="confirm-password"
          />
        </div>
        <a
          name="login-btn"
          id="login-btn"
          className="p-3 bg-blue-500 text-white text-center rounded"
          onClick={() => {
            dispatch(setAuthResetConfirmation());
          }}
        >
          Save New Passowrd
        </a>
        {/* <Link to='/dash' name="login-btn" id="login-btn" className="p-3 bg-blue-500 text-white rounded" href="#" role="submit">Log In</Link> */}
        <a
          name="signin-btn"
          id="signin-btn"
          className="border border-blue-900 text-center p-2"
          href="#"
          onClick={() => {
            dispatch(setAuthLogin());
          }}
        >
          Go back to Login
        </a>
      </form>
    </div>
  );
}
