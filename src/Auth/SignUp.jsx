import React, { useState, useEffect, useRef } from "react";
import { Link, useLocation, Redirect } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Toaster, toast } from "react-hot-toast";
import { faSpinner, faAngleRight } from "@fortawesome/free-solid-svg-icons";
import Logo from "../assets/images/logo.png";
import { useDispatch } from "react-redux";
import { setAuthLogin } from "../redux/actions/setCurrentAuthPage";

async function signupUser(credentials) {
  console.log(JSON.stringify(credentials));
  console.log(JSON.stringify(credentials));
  try {
    const data = await fetch(
      "https://us-central1-terp-338409.cloudfunctions.net/app/api/registration",
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

export default function SignUp(props) {
  const dispatch = useDispatch();

  const [firstName, setFirstName] = useState();
  const [lastName, setLastName] = useState();
  const [phone, setPhone] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [confirmPassword, setConfirmPassword] = useState();
  const [role, setRole] = useState();
  const [address, setAddress] = useState();

  const [signupHtmValue, setSignupHtmlValue] = useState("Sign Up");
  const prevSignupValue = usePrevious(signupHtmValue);

  const [signupIcon, setSignupIcon] = useState(faAngleRight);
  const prevSignupIcon = usePrevious(signupIcon);

  const [signupIconClassname, setSignupIconClassname] = useState();
  const prevSignupClassname = usePrevious(signupIconClassname);

  const setPhoneFunction = (value) => {
    var input = value.substring(1, value.length);
    //   var info = $('#card').prepend('20151012');
    var ext = `+${234}`;
    var phone = ext + input;
    setPhone(phone);
  };

  useEffect(async () => {
    console.log(phone);
  }, [phone]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSignupHtmlValue("Processing please wait....");
    setSignupIcon(faSpinner);
    setSignupIconClassname("spinner");

    if (password !== confirmPassword) {
      toast.error(`Password does not match`, {
        icon: "😞",
        position: "top-right",
        style: {
          borderRadius: "10px",
          background: "#333",
          color: "#fff",
        },
      });
      setSignupIconClassname("");
      setSignupIcon(faAngleRight);
      setSignupHtmlValue("Sign Up");
      return null;
    }

    const data = await signupUser({
      firstName,
      lastName,
      phone,
      email,
      password,
      role,
      address,
    });
    console.log(data);
    if (data.status == 400) {
      toast.error(`${data.message}`, {
        icon: "😞",
        position: "top-right",
        style: {
          borderRadius: "10px",
          background: "#333",
          color: "#fff",
        },
      });
      setSignupIconClassname("");
      setSignupIcon(faAngleRight);
      setSignupHtmlValue("Sign Up");
    } else if (data.status == 401) {
      toast.error(`${data.message}`, {
        icon: "😞",
        position: "top-right",
        style: {
          borderRadius: "10px",
          background: "#333",
          color: "#fff",
        },
      });
      setSignupIconClassname("");
      setSignupIcon(faAngleRight);
      setSignupHtmlValue("Sign Up");
    } else if (data.status == 200) {

      toast.success(`${data.message}`, {
        duration: 10000,
        icon: "👏",
        position: "top-right",
        style: {
          borderRadius: "10px",
          background: "#333",
          color: "#fff",
        },
      });

      document.getElementById("signup-form").reset()

      setSignupIconClassname("");
      setSignupIcon(faAngleRight);
      setSignupHtmlValue("Sign Up");


      setTimeout(function () {
        dispatch(setAuthLogin());
      }, 13000); 

      //   setUserInfo(data.userData);
    } else {
      toast.error(`${data.message}`, {
        icon: "😞",
        position: "top-right",
        style: {
          borderRadius: "10px",
          background: "#333",
          color: "#fff",
        },
      });
      setSignupIconClassname("");
      setSignupIcon(faAngleRight);
      setSignupHtmlValue("Sign Up");
    }
  };
  // const { state } = useLocation();
  // if (!state?.fromApp) {
  //     return <Redirect to="/" />;
  //   }
  return (
    <div
      className={`grid grid-cols-3 dashboardx txt-dark-bluex bg-whitex ${props.show}`}
    >
      {/* <div className='col-span-1 md:inline-block hidden button-solidx'>
      </div> */}
      <div className="col-span-1 md:flex hidden bg-dark-bluex justify-center items-center h-screen">
        <img src={Logo} alt="Logo" />
        {/* <div className='m-auto mt-auto h-12 w-40 text-center py-2 bg-blue-900 text-white'>Logo</div> */}
      </div>
      <div className="col-span-3 md:col-span-2 md:px-28 px-10 my-auto">
        <h1 className="p-2 pl-0 text-3xl text-left">
          Welcome to <span className="text-blue-600">TERP</span>
        </h1>
        <h4 className="pl-0 text-left">
          Create an account to gain access into the Trifecta Enterprise Resource
          Platform (TERP)
        </h4>
        <form className="grid grid-cols-2 gap-6 mt-10" onSubmit={handleSubmit} id="signup-form">
          <div className="col-span-1 text-left">
            <label className="text-sm" htmlFor="f-name">
              First Name
            </label>
            <br></br>
            <span className="absolute z-10 py-4 pl-3">
              <FontAwesomeIcon icon={["far", "user"]} />
            </span>
            <input
              type="text"
              className="pl-10 appearance-none border rounded w-full py-2 px-3 xtext-blue-700 bg-gray-100 mt-2 focus:outline-none focus:shadow-outline "
              placeholder="James"
              id="f-name"
              name="f-name"
              onChange={(e) => setFirstName(e.target.value)}
              required
            />
          </div>
          <div className="col-span-1 text-left">
            <label className="text-sm" htmlFor="l-name">
              Last Name
            </label>
            <br></br>
            <span className="absolute z-10 py-4 pl-3">
              <FontAwesomeIcon icon={["far", "user"]} />
            </span>
            <input
              type="text"
              className="pl-10 appearance-none border rounded w-full py-2 px-3 xtext-blue-700 bg-gray-100 mt-2 focus:outline-none focus:shadow-outline "
              placeholder="Adebola"
              id="l-name"
              name="l-name"
              onChange={(e) => setLastName(e.target.value)}
              required
            />
          </div>
          <div className="col-span-1 text-left">
            <label className="text-sm" htmlFor="phone-no">
              Phone Number
            </label>
            <br></br>
            <span className="absolute z-10 py-4 pl-3">
              <FontAwesomeIcon icon={["fas", "phone-alt"]} />
            </span>
            <input
              type="text"
              className="pl-10 appearance-none border rounded w-full py-2 px-3 xtext-blue-700 bg-gray-100 mt-2 focus:outline-none focus:shadow-outline "
              placeholder="0908765432"
              id="phone-no"
              name="phone-no"
              pattern="(0).{10}$"
              title="Enter correct phone number"
              onChange={(e) => setPhoneFunction(e.target.value)}
              required
            />
          </div>
          <div className="col-span-1 text-left">
            <label className="text-sm" htmlFor="Signup-email">
              Email Address
            </label>
            <br></br>
            <span className="absolute z-10 py-4 pl-3">
              <FontAwesomeIcon icon={["far", "envelope"]} />
            </span>
            <input
              type="email"
              className="pl-10 appearance-none border rounded w-full py-2 px-3 xtext-blue-700 bg-gray-100 mt-2 focus:outline-none focus:shadow-outline "
              placeholder="james@trifectaintegrated.com"
              id="Signup-email"
              name="Signup-email"
              pattern="[a-z0-9._%+-]+@trifectaintegrated.com"
              title="Work email only!!"
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <div className="w-full text-right text-xs text-blue-800">
              Please use work email preferably
            </div>
          </div>
          <div className="col-span-1 text-left">
            <label className="text-sm" htmlFor="job-role">
              Job Role
            </label>
            <br></br>
            <span className="absolute z-10 py-4 pl-3">
              <FontAwesomeIcon icon={["fas", "archive"]} />
            </span>
            <select
              className="pl-10 appearance-none border rounded w-full py-2 px-3 xtext-blue-700 bg-gray-100 mt-2 focus:outline-none focus:shadow-outline"
              onChange={(e) => setRole(e.target.value)}
              required
              // id="winning-company"
              // name="winning-company"
            >
              <option value="Other">-- Select Your Role --</option>

              <option value="Admin">Admin</option>

              <option value="Operations">Operations</option>
              <option value="Finance">Finance</option>
            </select>
          </div>
          <div className="col-span-1 text-left">
            <label className="text-sm" htmlFor="address">
              Address
            </label>
            <br></br>
            <span className="absolute z-10 py-4 pl-3">
              <FontAwesomeIcon icon={["fas", "map-marker-alt"]} />
            </span>
            <input
              type="text"
              className="pl-10 appearance-none border rounded w-full py-2 px-3 xtext-blue-700 bg-gray-100 mt-2 focus:outline-none focus:shadow-outline "
              placeholder="No, 4 Martin Luther King Road, Abuja"
              id="address"
              name="address"
              onChange={(e) => setAddress(e.target.value)}
              required
            />
          </div>
          <div className="col-span-1 text-left">
            <label className="text-sm" htmlFor="password">
              Password
            </label>
            <br></br>
            <span className="absolute z-10 py-4 pl-3">
              <FontAwesomeIcon icon={["fas", "shield-alt"]} />
            </span>
            <input
              type="password"
              className="pl-10 appearance-none border rounded w-full py-2 px-3 xtext-blue-700 bg-gray-100 mt-2 focus:outline-none focus:shadow-outline "
              placeholder="Password"
              id="password"
              pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
              title="Must contain at least one  number and one uppercase and lowercase letter, and at least 8 or more characters"
              name="password"
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="col-span-1 text-left">
            <label className="text-sm" htmlFor="Signup-email">
              Confirm Password
            </label>
            <br></br>
            <span className="absolute z-10 py-4 pl-3">
              <FontAwesomeIcon icon={["fas", "shield-alt"]} />
            </span>
            <input
              type="password"
              className="pl-10 appearance-none border rounded w-full py-2 px-3 xtext-blue-700 bg-gray-100 mt-2 focus:outline-none focus:shadow-outline "
              placeholder="Confirm Password"
              id="confirm-password"
              name="confirm-password"
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>
          <a
            name="signin-btn"
            id="signin-btn"
            className="border border-blue-900 text-center p-2"
            href="#"
            onClick={() => {
              dispatch(setAuthLogin());
            }}
          >
            Log In
          </a>

          <button
            name="Signup-btn"
            id="Signup-btn"
            className="p-3 button-solidx text-white rounded"
            href="#"
            role="submit"
          >
            <FontAwesomeIcon
              icon={signupIcon}
              className={signupIconClassname}
            />{" "}
            {signupHtmValue}{" "}
          </button>
          {/* <Link name="signin-btn" id="signin-btn" className="border border-blue-900 text-center p-2" href="#" to="/" >Log In</Link> */}

          {/* <button name="signin-btn" id="signin-btn" className="border border-blue-900 text-xm" href="#!" ><Link to="/log_in">Log In</Link></button> */}
        </form>
      </div>
      <Toaster />
    </div>
  );
}
