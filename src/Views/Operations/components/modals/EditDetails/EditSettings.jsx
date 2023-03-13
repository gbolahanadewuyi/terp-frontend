import React, { useState, useRef, useEffect } from "react";
import CustomFileUpload from "../../dash/CustomFileUpload";
import approvedBanks from "../../../../../tempDb/approvedBanks";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-hot-toast";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner, faPlus } from "@fortawesome/free-solid-svg-icons";
// import ProjectMembersAvatar from './ProjectMembersAvatar';
// import CurrencyFormat from 'react-currency-format';

async function updateStaff(credentials, id) {
  console.log(credentials);

  const userInfoObject = localStorage.getItem("user");
  const userInfo = JSON.parse(userInfoObject);
  console.log(userInfo);
  try {
    const data = await fetch(
      `https://us-central1-terp-338409.cloudfunctions.net/app/api/updateStaff`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userInfo.token}`,
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



export default function EditSettings(props) {
  // redux variables
  const currentDataStaff = useSelector((state) => state.currentDataStaff);

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [dob, setDob] = useState("");
  const [id_type, setId_Type] = useState("");
  const [id_number, setId_number] = useState("");
  const [gender, setGender] = useState("");
  const [address, setAddress] = useState("");
  const [bank_name, setBank_name] = useState("");
  const [account_number, setAccountNumber] = useState("");
  const [account_name, setAccountName] = useState("");

  const [photo_url, setPhotoURL] = useState();
  const [id_file, setIdFile] = useState();

  useEffect(async () => {
    setName(currentDataStaff.name);
    setPhone(currentDataStaff.phone);
    setDob(currentDataStaff.dob);
    setId_Type(currentDataStaff.id_type);
    setId_number(currentDataStaff.id_number);
    setGender(currentDataStaff.gender);
    setAddress(currentDataStaff.address);
    setBank_name(currentDataStaff.bank_name);
    setAccountNumber(currentDataStaff.account_number);
    setPhotoURL(currentDataStaff.photo_url);
    setIdFile(currentDataStaff.id_file);
    setAccountName(currentDataStaff.account_name);
    // setBids(data)
  }, [currentDataStaff]);

  const [updateStaffHtmlValue, setUpdateStaffHtmlValue] =
    useState("Save Changes");
  const [updateStaffIcon, setUpdateStaffIcon] = useState(faPlus);
  const [updateStaffIconClassname, setUpdateStaffIconClassname] = useState();


  const handleSubmit = async (e) => {
    e.preventDefault();
    document.getElementById("updateProfile-button").disabled = false;
    setUpdateStaffHtmlValue("Processing please wait....");
    setUpdateStaffIcon(faSpinner);
    setUpdateStaffIconClassname("spinner");
    const data = await updateStaff({
      name,
      phone,
      dob,
      id_type,
      id_number,
      gender,
      address,
      bank_name,
      account_number,
      account_name,
      photo_url,
      id_file,
    });
    console.log(data);
    if (data.status == 403) {
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
      props.updateUser({});
    } else if (data.status == 400) {
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
      setUpdateStaffIconClassname("");
      setUpdateStaffIcon(faPlus);
      setUpdateStaffHtmlValue("Save Changes");
      document.getElementById("updateProfile-button").disabled = false;
    } else if (data.status == 200) {
      toast.success("Your Info Updated Successfully!", {
        duration: 5000,
        icon: "👏",
        position: "top-right",
        style: {
          borderRadius: "10px",
          background: "#333",
          color: "#fff",
        },
      });
      document.getElementById("editSettings").reset();
      setUpdateStaffIconClassname("");
      setUpdateStaffIcon(faPlus);
      setUpdateStaffHtmlValue("Save Changes");
      document.getElementById("updateProfile-button").disabled = false;
      updateUserImage();
      props.handleShow();
      let loggedInUser = JSON.parse(localStorage.getItem("user"));
      loggedInUser.photo_url = photo_url;
      localStorage.setItem("user", JSON.stringify(loggedInUser));
      props.getStaffDetail();
    } else {
      toast.error(`Server error, please check your network connection`, {
        duration: 5000,
        icon: "😞",
        position: "top-right",
        style: {
          borderRadius: "10px",
          background: "#333",
          color: "#fff",
        },
      });
      setUpdateStaffIconClassname("");
      setUpdateStaffIcon(faPlus);
      setUpdateStaffHtmlValue("Save Changes");
      document.getElementById("updateProfile-button").disabled = false;
    }
  };

  const updateUserImage = async () => {
    const userInfoObject = localStorage.getItem("user");
    const userInfo = JSON.parse(userInfoObject);
    userInfo.photo_url = photo_url;
    //save back to localstorage
    localStorage.setItem("user", JSON.stringify(userInfo));
  };

  return (
    <div className={props.show}>
      <div className="xback-board txt-dark-bluex">
        <div className="modal-inner-edit-x2">
          <div className="modal-edit-head-v2 relative">
            <div className="w-full" onClick={props.handleShow}>
              <svg
                className="xsvg-close absolute top-2 right-2"
                fill="#fff"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 30 30"
                width="30px"
                height="30px"
              >
                {" "}
                <path d="M 7 4 C 6.744125 4 6.4879687 4.0974687 6.2929688 4.2929688 L 4.2929688 6.2929688 C 3.9019687 6.6839688 3.9019687 7.3170313 4.2929688 7.7070312 L 11.585938 15 L 4.2929688 22.292969 C 3.9019687 22.683969 3.9019687 23.317031 4.2929688 23.707031 L 6.2929688 25.707031 C 6.6839688 26.098031 7.3170313 26.098031 7.7070312 25.707031 L 15 18.414062 L 22.292969 25.707031 C 22.682969 26.098031 23.317031 26.098031 23.707031 25.707031 L 25.707031 23.707031 C 26.098031 23.316031 26.098031 22.682969 25.707031 22.292969 L 18.414062 15 L 25.707031 7.7070312 C 26.098031 7.3170312 26.098031 6.6829688 25.707031 6.2929688 L 23.707031 4.2929688 C 23.316031 3.9019687 22.682969 3.9019687 22.292969 4.2929688 L 15 11.585938 L 7.7070312 4.2929688 C 7.5115312 4.0974687 7.255875 4 7 4 z" />
              </svg>
            </div>
            <h1 className=" p-2 pl-5 edit-modal-headr-x">Edit Profile</h1>
          </div>
          <form
            className="grid grid-cols-4 grid-row-7 gap-4 px-10 py-6"
            id="editSettings"
            onSubmit={handleSubmit}
          >
            <div className="col-span-4 text-left">
              <label className="xtext-blue-900" htmlFor="first_name">
                First Name
              </label>
              <br></br>
              <input
                type="text"
                value={name}
                className="shadow appearance-none border rounded w-full py-2 px-3 xxtext-blue-700 bg-gray-100 mt-2 focus:outline-none focus:shadow-outline "
                placeholder="Enter First Name"
                id="first_name"
                name="first_name"
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div className="col-span-2 md:col-span-1 text-left">
              <label className="" htmlFor="date_of_birth">
                Date of Birth
              </label>
              <br></br>
              <input
                type="date"
                value={dob}
                className="shadow appearance-none border rounded w-full py-2 px-3 xxtext-blue-700 bg-gray-100 mt-2 focus:outline-none focus:shadow-outline"
                name="date_of_birth"
                onChange={(e) => setDob(e.target.value)}
              />
            </div>
            <div className="md:col-span-1 col-span-2 text-left">
              <label className="xtext-blue-900" htmlFor="gender">
                Gender
              </label>
              <select
                type="text"
                className="shadow xappearance-none border rounded w-full py-2 px-3 xxtext-blue-700 bg-gray-100 mt-2 focus:outline-none focus:shadow-outline"
                id="gender"
                name="gender"
                defaultValue={gender}
                onChange={(e) => setGender(e.target.value)}
              >
                <option className="" value="Male">
                  Male
                </option>
                <option className="" value="Female">
                  Female
                </option>
              </select>
            </div>
            <div className="md:col-span-1 col-span-2 text-left">
              <label className="xtext-blue-900" htmlFor="id_type">
                ID Type
              </label>
              <select
                type="text"
                className="shadow xappearance-none border rounded w-full py-2 px-3 xxtext-blue-700 bg-gray-100 mt-2 focus:outline-none focus:shadow-outline"
                id="id_type"
                name="id_type"
                defaultValue={id_type}
                onChange={(e) => setId_Type(e.target.value)}
              >
                <option className="" value="Voter's Card">
                  Voter's Card
                </option>
                <option className="" value="Driver's License">
                  Driver's License
                </option>
                <option className="" value="National Identity Card">
                  National Identity Card
                </option>
              </select>
            </div>
            <div className="col-span-2 md:col-span-1 text-left">
              <label className="" htmlFor="id_number">
                ID Number
              </label>
              <input
                type="text"
                value={id_number}
                className="shadow appearance-none border rounded w-full py-2 px-3 xxtext-blue-700 bg-gray-100 mt-2 focus:outline-none focus:shadow-outline"
                id="id_number"
                placeholder="23475956"
                name="id_number"
                onChange={(e) => setId_number(e.target.value)}
              />
            </div>

            <div className="md:col-span-2 col-span-4 text-left">
              <label className="" htmlFor="contact_number">
                Contact Number
              </label>
              <br></br>
              <input
                type="text"
                value={phone}
                className="shadow appearance-none border rounded w-full py-2 px-3 xxtext-blue-700 bg-gray-100 mt-2 focus:outline-none focus:shadow-outline"
                placeholder="09056653909"
                id="contact_number"
                name="contact_number"
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>
            <div className="md:col-span-2 col-span-4 text-left">
              <label className="" htmlFor="address">
                Address
              </label>
              <br></br>
              <input
                type="text"
                value={address}
                className="shadow appearance-none border rounded w-full py-2 px-3 xxtext-blue-700 bg-gray-100 mt-2 focus:outline-none focus:shadow-outline"
                placeholder="Number 4 Joseph Ali Street, Abuja"
                id="address"
                name="address"
                onChange={(e) => setAddress(e.target.value)}
              />
            </div>
            <div className="md:col-span-2 col-span-4 text-left">
              <label className="" htmlFor="bank_account_name">
                Bank Account Name
              </label>
              <br></br>
              <input
                type="text"
                value={account_name}
                className="shadow appearance-none border rounded w-full py-2 px-3 xxtext-blue-700 bg-gray-100 mt-2 focus:outline-none focus:shadow-outline"
                placeholder="Olivia Pope and Associates"
                id="bank_account_name"
                name="bank_account_name"
                onChange={(e) => setAccountName(e.target.value)}
              />
            </div>
            <div className="md:col-span-1 col-span-2 text-left">
              <label className="" htmlFor="account_number">
                {" "}
                Account Number
              </label>
              <br></br>
              <input
                type="text"
                value={account_number}
                className="shadow appearance-none border rounded w-full py-2 px-3 xxtext-blue-700 bg-gray-100 mt-2 focus:outline-none focus:shadow-outline"
                placeholder="31123562021"
                id="account_number"
                name="account_number"
                onChange={(e) => setAccountNumber(e.target.value)}
              />
            </div>
            <div className="md:col-span-1 col-span-2 text-left">
              <label className="" htmlFor="bank_name">
                {" "}
                Bank Name
              </label>
              <br></br>
              <select
                type="text"
                className="shadow xappearance-none border rounded w-full py-2 px-3 xxtext-blue-700 bg-gray-100 mt-2 focus:outline-none focus:shadow-outline"
                id="bank_name"
                name="bank_name"
                defaultValue={bank_name}
                onChange={(e) => setBank_name(e.target.value)}
              >
                {approvedBanks.map((e) => {
                  return (
                    <option key={e.id} className="" value={e.name}>
                      {e.name}
                    </option>
                  );
                })}
              </select>
            </div>

            <div className="col-span-4 text-left">
              <div>Attachement File (PF, .docx, jpg formats)</div>
              <div className="grid md:grid-cols-2 grid-cols-1 gap-4">
                <div>
                  <label>Profile Picture:</label>
                  <CustomFileUpload
                    input_id="profile_picture"
                    setPhotoURL={setPhotoURL}
                  />
                </div>
                <div>
                  <label>MEANS OF IDENTIFICATION:</label>
                  <CustomFileUpload
                    input_id="means_of_id"
                    setIdFile={setIdFile}
                  />
                </div>
              </div>
            </div>
            <button
              type="submit"
              className="md:col-start-4 col-start-3 md:col-span-1 col-span-2 shadow appearance-none border rounded w-full py-2 px-3 text-white button-solidx mt-2 focus:outline-none focus:shadow-outline"
              id="updateProfile-button"
              value="Save Changes"
            >
              {" "}
              <FontAwesomeIcon
                icon={updateStaffIcon}
                className={updateStaffIconClassname}
              />{" "}
              {updateStaffHtmlValue}{" "}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
