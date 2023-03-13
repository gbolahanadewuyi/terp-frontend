import React, { useEffect, useState } from "react";
import EditIcon from "../../../../assets/icons/Details/EditIcon";
import DashHeader from "../../components/header/DashHeader";
import { regularx, activex } from "../../components/menu/SidePanel";
import EditSettings from "../../components/modals/EditDetails/EditSettings";
import { toast } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";

import user from "../../../../tempDb/user";
import LoadingScreen from "./LoadingScreen";
import dummy_image from "../../../../assets/images/dummy.jpg";

// redux
import MiniSidePanel from "../../components/menu/MiniSidePanel";

import { setEditStaff } from "../../../../redux/actions/setData";

async function getStaff() {
  //gettoken
  const userInfoObject = localStorage.getItem("user");
  const userInfo = JSON.parse(userInfoObject);
  return fetch(
    `https://us-central1-terp-338409.cloudfunctions.net/app/api/getstaff?id=${userInfo.id}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    }
  ).then((data) => data.json());
}

export default function Settings(props) {
  var active_selectr = {
    dash: regularx,
    projects: regularx,
    bids: regularx,
    companies: regularx,
    tasks: regularx,
    equipments: regularx,
    meetings: regularx,
    vendors: regularx,
    staff: regularx,
    expenses: regularx,

    settings: activex,
    logout: regularx,
  };

  // loading screen after fetch
  const [isLoading, setIsLoading] = useState(true);
  const [details, setDetails] = useState();

    //   redux variables
    const dispatch = useDispatch();


  useEffect(async () => {
    let mounted = true;
    const data = await getStaff();
    console.log(data);
    if (data.status == 403) {
      props.updateUser({});
    } else if (data.status == 400) {
      toast.error(`${data.message}`, {
        icon: "😞",
        position: "top-right",
        style: {
          borderRadius: "10px",
          background: "#333",
          color: "#fff",
        },
      });
      setIsLoading(false);
    } else if (data.status == 200) {
      if (mounted) {
        setDetails(data.data);
        setIsLoading(false);
        dispatch(setEditStaff(data.data));
      }
    } else {
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
    return () => (mounted = false);
    // setBids(data)
  }, []);
  //

  const getStaffDetail = async () => {
    const data = await getStaff();
    console.log(data);
    if (data.status == 403) {
      toast.error(`${data.message}`, {
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
        icon: "😞",
        position: "top-right",
        style: {
          borderRadius: "10px",
          background: "#333",
          color: "#fff",
        },
      });
    } else if (data.status == 200) {
      setDetails(data.data);
    } else {
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
  };

  const [showEdit, setShowEdit] = useState("hidden");
  const handleShowEdit = () => {
    if (showEdit === "hidden") {
      setShowEdit("");
    } else {
      setShowEdit("hidden");
    }
  };

  return (
    <>
      <EditSettings show={showEdit} handleShow={handleShowEdit}  details={details}  getStaffDetail={getStaffDetail}/>
      <MiniSidePanel active_selectr={active_selectr}  updateUser={props.updateUser}/>
      <div className={`details-main-body bg-whitex ${props.show}`}>
        <DashHeader title={"Settings"} handleShow={props.handleShow} />
        {isLoading ? (
          <LoadingScreen />
        ) : (
          <>
            <div className="my-3 text-lg pl-3 font-bold txt-headr md:flex lg:hidden relative">
              {"Settings"}
              <br />{" "}
              <span className={`md:block hidden flt-id xwarn`}>Pending</span>
              <span className={`md:hidden block-inline xwarn`}>Pending</span>
            </div>
            <div className="bg-whitex w-full pr-5 txt-dark-bluex relative">
              <div className="grid justify-center w-full border-t border-t-blue-800 py-7">
                <span className="w-44 h-44 bg-cover rounded-md mr-0">
                  <img
                    src= {details?.photo_url === "" ? dummy_image : details?.photo_url}
                    alt=""
                    className="h-full w-full overflow-hidden object-cover rounded-full border-2 border-white"
                  />
                </span>
                <button
                  className="border-2 border px-2 py-1 rounded inline-block mt-2 whitespace-nowrap absolute top-5 right-5"
                  onClick={handleShowEdit}
                >
                  <EditIcon classx="fill-current inline" /> Edit Details
                </button>
                <div className="text-center font-bold text-lg">{details?.name}</div>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 grid-cols-1 gap-3] gap-y-10 px-10 text-center pb-10">
                <div className="details-summary-item">
                  <div className="txt-greyed-out">CONTACT</div>
                  <div className="font-bold">{details?.phone}</div>
                </div>
                <div className="details-summary-item">
                  <div className="txt-greyed-out">EMAIL</div>
                  <div className="font-bold">{details?.email}</div>
                </div>
                <div className="details-summary-item">
                  <div className="txt-greyed-out">ADDRESS</div>
                  <div className="font-bold">{details?.address}</div>
                </div>
                <div className="details-summary-item">
                  <div className="txt-greyed-out">DATE OF BIRTH</div>
                  <div className="font-bold">{details?.dob}</div>
                </div>
                <div className="details-summary-item">
                  <div className="txt-greyed-out">GENDER</div>
                  <div className="font-bold">{details?.gender}</div>
                </div>
                <div className="details-summary-item">
                  <div className="txt-greyed-out">ID TYPE</div>
                  <div className="font-bold">{details?.id_type}</div>
                </div>
                <div className="details-summary-item">
                  <div className="txt-greyed-out">ROLE</div>
                  <div className="font-bold">{details?.role}</div>
                </div>
                <div className="details-summary-item">
                  <div className="txt-greyed-out">DEPARTMENT</div>
                  <div className="font-bold">{details?.department}</div>
                </div>
                <div className="details-summary-item">
                  <div className="txt-greyed-out">ID NUMBER</div>
                  <div className="font-bold">{details?.id_number}</div>
                </div>
                <div className="details-summary-item">
                  <div className="txt-greyed-out">BANK ACCOUNT NAME</div>
                  <div className="font-bold">{details?.account_name}</div>
                </div>
                <div className="details-summary-item">
                  <div className="txt-greyed-out">ACCOUNT NUMBER</div>
                  <div className="font-bold">{details?.account_number}</div>
                </div>
                <div className="details-summary-item">
                  <div className="txt-greyed-out">BANK NAME</div>
                  <div className="font-bold">{details?.bank}</div>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
}
