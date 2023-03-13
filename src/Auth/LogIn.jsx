import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner, faAngleRight } from "@fortawesome/free-solid-svg-icons";
import Logo from "../assets/images/logo.png";
import { Toaster, toast } from "react-hot-toast";
import { useDispatch } from "react-redux";
import {
  setAuthSignUp,
  setAuthForgotPass,
} from "../redux/actions/setCurrentAuthPage";
// import LogoDark from '../../images/logo-dark.png';

async function loginUser(credentials) {
  console.log(JSON.stringify(credentials));
  try {
    const data = await fetch(
      "https://us-central1-terp-338409.cloudfunctions.net/app/api/login",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(credentials),
      }
    );
    return data.json();
  } catch (e) {
    console.log(e);
    toast.error(`Server error, please check your network connection`, {
      icon: "😞",
      position: "top-right",
      style: {
        borderRadius: "10px",
        background: "#333",
        color: "#fff",
      },
    });
  }
}

// Hook
function usePrevious(value) {
  // The ref object is a generic container whose current property is mutable ...
  // ... and can hold any value, similar to an instance property on a class
  const ref = useRef();
  // Store current value in ref
  useEffect(() => {
    ref.current = value;
  }, [value]); // Only re-run if value changes
  // Return previous value (happens before update in useEffect above)
  return ref.current;
}

export default function LogIn({ setUserInfo }) {
  const dispatch = useDispatch();

  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [loginHtmValue, setLoginHtmlValue] = useState("Login");
  const prevLoginValue = usePrevious(loginHtmValue);

  const [loginIcon, setLoginIcon] = useState(faAngleRight);
  const prevLoginIcon = usePrevious(loginIcon);

  const [loginIconClassname, setLoginIconClassname] = useState();
  const prevLoginClassname = usePrevious(loginIconClassname);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoginHtmlValue("Processing please wait....");
    setLoginIcon(faSpinner);
    setLoginIconClassname("spinner");

    const data = await loginUser({
      email,
      password,
    });
    console.log(data);
    if (data.status === 400) {
      toast.error(`${data.message}`, {
        duration: 5000,
        icon: "😞",
        position: "top-right",
        style: {
          borderRadius: "10px",
          background: "#333",
          color: "#fff",
        },
      });
      setLoginIconClassname("");
      setLoginIcon(faAngleRight);
      setLoginHtmlValue("Login");
    } else if (data.status === 401) {
      toast.error(`${data.message}`, {
        duration: 5000,
        icon: "😞",
        position: "top-right",
        style: {
          borderRadius: "10px",
          background: "#333",
          color: "#fff",
        },
      });
      setLoginIconClassname("");
      setLoginIcon(faAngleRight);
      setLoginHtmlValue("Login");
    } else if (data.status === 200) {
      setUserInfo(data.userData);
    } else {
      toast.error(`${data.message}`, {
        duration: 5000,
        icon: "😞",
        position: "top-right",
        style: {
          borderRadius: "10px",
          background: "#333",
          color: "#fff",
        },
      });

      setLoginIconClassname("");
      setLoginIcon(faAngleRight);
      setLoginHtmlValue("Login");
    }
  };

  return (
    <div className="grid grid-cols-3 dashboardx txt-dark-bluex">
      <div className="col-span-1 md:flex hidden bg-dark-bluex justify-center items-center h-screen">
        <img src={Logo} alt="Logo" />
        {/* <div className='m-auto mt-auto h-12 w-40 text-center py-2 bg-blue-900 text-white'>Logo</div> */}
      </div>
      <div className="col-span-3 md:col-span-2 p-5 md:px-28 px-10 my-auto">
        <h1 className="p-2 pl-0 text-3xl text-left">Log In</h1>
        <h4 className="pl-0 text-left">Log in to your TERP account</h4>
        <form className="grid grid-cols-2 gap-5 mt-10" onSubmit={handleSubmit}>
          <div className="col-span-2 text-left">
            <label className="text-sm" htmlFor="login-email">
              Email Address
            </label>
            <br></br>
            <span className="absolute z-10 py-4 pl-3">
              <FontAwesomeIcon icon={["far", "envelope"]} />
            </span>
            <input
              type="email"
              onChange={(e) => setEmail(e.target.value)}
              className="pl-10 appearance-none border rounded w-full py-2 px-3 xtext-blue-700 bg-gray-100 mt-2 focus:outline-none focus:shadow-outline "
              placeholder="james@trifectaintegrated.com"
              id="login-email"
              name="login-email"
              required
            />
          </div>
          <div className="col-span-2 text-left mt-10 mb-10">
            <label className="text-sm" htmlFor="login-password">
              Password
            </label>
            <br></br>
            <span className="absolute z-10 py-4 pl-3">
              <FontAwesomeIcon icon={["fas", "shield-alt"]} />
            </span>
            <input
              type="password"
              onChange={(e) => setPassword(e.target.value)}
              className="pl-10 appearance-none border rounded w-full py-2 px-3 xtext-blue-700 bg-gray-100 mt-2 focus:outline-none focus:shadow-outline "
              placeholder="password"
              id="login-password"
              name="login-password"
              required
            />
            {/* <div className="w-full text-right text-blue-800">
              <a href="#">Forgot Password?</a>
            </div> */}
            <div className="w-full text-right text-blue-800">
              <a
                href="#"
                onClick={() => {
                  dispatch(setAuthForgotPass());
                }}
              >
                Forgot Password?
              </a>
            </div>
          </div>
          <a
            name="signin-btn"
            id="signin-btn"
            className="border border-blue-900 text-center p-2"
            href="#"
            onClick={() => {
              dispatch(setAuthSignUp());
            }}
          >
            Sign Up
          </a>
          <button
            name="login-btn"
            id="login-btn"
            className="p-3 button-solidx text-white text-center  rounded"
            type="Submit"
          >
            <FontAwesomeIcon icon={loginIcon} className={loginIconClassname} />{" "}
            {loginHtmValue}{" "}
          </button>
          {/* <Link to='/dash' name="login-btn" id="login-btn" className="p-3 button-solidx text-white rounded" href="#" role="submit">Log In</Link> */}
        </form>
      </div>
      <Toaster />
    </div>
  );
}
