import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import dummy_user from "../../../../assets/images/dummy.jpg";
import ArrowleftIcon from "../../../../assets/icons/tables/ArrowLeftIcon";
import SendMail from "../modals/SendEmail";
import EmailIcon from "../../../../assets/icons/dash-header/EmailIcon";
// import plus_image from '../../../images/plus-icon.png'

export var userx = {
  name: "James Ajebola",
  image: dummy_user,
  amountx: 20000,
  total_amountx: 20000,
};

export default function DashHeaderDetails(props) {
  const [name, setName] = useState();
  const [photo, setPhoto] = useState();

  const [showMail, setShowMail] = useState("hidden");

  const handleShowMail = () => {
    if (showMail === "hidden") {
      setShowMail("");
    } else {
      setShowMail("hidden");
    }
  };

  useEffect(() => {
    async function getUserInfo() {
      const userInfoObject = localStorage.getItem("user");
      const userInfo = JSON.parse(userInfoObject);
      setName(userInfo.name);
      setPhoto(userInfo.photo_url);
    }
    getUserInfo();
  });
  var status_cn;
  if (props?.status === "Won" || props?.status === "Completed") {
    status_cn =
      "ml-auto capitalize bg-green-100 text-green-500 rounded-lg text-s p-1 px-2";
  } else if (props?.status === "Lost" || props?.status === "Cancelled") {
    status_cn =
      "ml-auto capitalize bg-red-100 text-red-500 rounded-lg text-s p-1 px-2";
  } else if (
    props?.status === "Pending" ||
    props?.status === "Submitted and Pending Approval" ||
    props?.status === "Ongoing"
  ) {
    status_cn =
      "ml-auto capitalize bg-amber-100 text-amber-500 rounded-lg text-s p-1 px-2";
  }
  return (
    <>
      <SendMail show={showMail} handleShow={handleShowMail} />
      <div className="headr bg-whitex flex pr-4 border-b">
        <div className="my-auto text-lg pl-3 font-bold txt-headr flex">
          <button onClick={props.handleShow}>
            <ArrowleftIcon classx="stroke-current xw-full xh-full mr-3" />
          </button>
          <span className="hidden lg:block">
            {props.title}
            {}
            <span className={status_cn}>{props?.status}</span>
          </span>
        </div>
        <div className="txt-dark-bluex-v2 ml-auto mr-3 my-auto flex h-full align-middle py-4">
          <span className="pr-10 relative top-1 hidden md:block">
            <button onClick={handleShowMail}>
              <EmailIcon classx="fill-current" />
            </button>
          </span>
          <span className="pr-10 relative top-1">
            <FontAwesomeIcon icon={["fas", "bell"]} />
          </span>
          <span className="inline-flex relative">
            <span className="pr-2 pl-10 cborder border-l-2">{name}</span>
            <span className="w-8 h-8 bg-cover rounded-md mr-0">
              <img
                src={photo}
                alt=""
                className="h-full w-full overflow-hidden object-cover rounded-full border-2 border-white"
              />
            </span>
          </span>
        </div>
      </div>
    </>
  );
}
