import React, { useEffect, useState } from "react";
import DashHeaderDetails from "./DashHeaderDetails";
import EditIcon from "../../../../assets/icons/Details/EditIcon";
// import generic_logo from '../../../../assets/images/generic-company-logo.png'
// import DashHeader from '../dash/DashHeader';
import user from "../../../../tempDb/user";
import dummy_image from "../../../../assets/images/dummy.jpg";
import { toast } from "react-hot-toast";

// redux
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { setEditStaff } from "../../../../redux/actions/setData";
import EditStaff from "../modals/EditDetails/EditStaff";

async function getStaff(id) {
  //gettoken
  const userInfoObject = localStorage.getItem("user");
  const userInfo = JSON.parse(userInfoObject);
  return fetch(
    `https://us-central1-terp-338409.cloudfunctions.net/app/api/getstaff?id=${id}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    }
  ).then((data) => data.json());
}

export default function StaffDetails(props) {
  const dispatch = useDispatch();

  const [showEdit, setShowEdit] = useState("hidden");
  const [details, setDetails] = useState();
  const [detailsId, setDetailsId] = useState(0);
  const handleShowEdit = (id) => {
    if (showEdit === "hidden") {
      setDetailsId(id);
      setShowEdit("");
    } else {
      setShowEdit("hidden");
    }
  };

  // redux variables
  const currentDataStaff = useSelector((state) => state.currentDataStaff);

  useEffect(async () => {
      console.log(currentDataStaff?.id)
    if (!currentDataStaff.id) {
      console.log("no id");
      return null;
    }
    let mounted = true;
    const data = await getStaff(currentDataStaff.id);
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
    } else if (data.status == 200) {
      if (mounted) {
        setDetails(data.data);
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
  }, [currentDataStaff.id]);

  const getStaffDetail = async (id) => {
    const data = await getStaff(id);
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
      props.getStaffs();
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

  return (
    <>
      <EditStaff
        show={showEdit}
        id={detailsId}
        handleShow={handleShowEdit}
        updateUser={props.updateUser}
        getStaffDetail={getStaffDetail}
        refreshStaffs={props.refreshStaffs}
      />
      <div className={`details-main-body bg-whitex ${props.show}`}>
        <DashHeaderDetails
          title="Staff Details"
          handleShow={props.handleShow}
        />

        <div className="my-3 text-lg pl-3 font-bold txt-headr md:flex lg:hidden relative">
          Staff Details
          <br />{" "}
          <span className={`md:block hidden flt-id xwarn`}>
            {details?.accountStatus}
          </span>
          <span className={`md:hidden block-inline xwarn`}>
            {details?.accountStatus}
          </span>
        </div>

        <div className="bg-whitex w-full pr-5 txt-dark-bluex">
          <div className="details-summary text-center w-full mx-auto">
            <div className="details-summary-item">
              <div className="txt-greyed-out">Name</div>
              <div className="font-bold">{details?.name}</div>
            </div>
            <div className="details?-summary-item">
              <div className="txt-greyed-out">Contact</div>
              <div className="font-bold">{details?.phone}</div>
            </div>
            <div className="details-summary-item">
              <div className="txt-greyed-out">Email</div>
              <div className="font-bold">{details?.email}</div>
            </div>
            <div className="details-summary-item">
              <div className="txt-greyed-out">Role</div>
              <div className="font-bold">{details?.role}</div>
            </div>
            <div className="details-summary-item">
              <div className="txt-greyed-out">Department</div>
              <div className="font-bold">{details?.department}</div>
            </div>
          </div>
          <div className="grid justify-center w-full border-t border-t-gray-00 py-7 relative">
            <span className="w-44 h-44 bg-cover rounded-md mr-0">
              <img
                src={
                  details?.photo_url === "" ? dummy_image : details?.photo_url
                }
                alt=""
                className="h-full w-full overflow-hidden object-cover rounded-full border-2 border-white"
              />
            </span>
            <button
              className="border-2 border px-2 py-1 rounded inline-block mt-2 whitespace-nowrap absolute top-5 right-5"
              //   onClick={()=>handleShowEdit(currentDataStaff)}
              onClick={() => {
                dispatch(setEditStaff(details));
                handleShowEdit(currentDataStaff.id);
              }}
            >
              <EditIcon classx="fill-current inline" /> Edit Details
            </button>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 grid-cols-1 gap-1 gap-y-10 px-10 text-center pb-10 uppercase">
            <div className="details-summary-item2">
              <div className="font-bold">DATE OF BIRTH</div>
              <div className="txt-greyed-out">{details?.dob}</div>
            </div>
            <div className="details-summary-item2">
              <div className="font-bold">GENDER</div>
              <div className="txt-greyed-out">{details?.gender}</div>
            </div>
            <div className="details-summary-item2">
              <div className="font-bold">ADDRESS</div>
              <div className="txt-greyed-out">{details?.address}</div>
            </div>

            <div className="details-summary-item2">
              <div className="font-bold">ID TYPE</div>
              <div className="txt-greyed-out">{details?.id_type}</div>
            </div>
            <div className="details-summary-item2">
              <div className="font-bold">ID NUMBER</div>
              <div className="txt-greyed-out">{details?.id_number}</div>
            </div>

            <div className="details-summary-item2">
              <div className="font-bold">SALARY</div>
              <div className="txt-greyed-out">{details?.salary}</div>
            </div>

            <div className="details-summary-item2">
              <div className="font-bold">BANK ACCOUNT NAME</div>
              <div className="txt-greyed-out">{details?.bank_account_name}</div>
            </div>
            <div className="details-summary-item2">
              <div className="font-bold">ACCOUNT NUMBER</div>
              <div className="txt-greyed-out">
                {details?.bank_account_number}
              </div>
            </div>
            <div className="details-summary-item2">
              <div className="font-bold">BANK NAME</div>
              <div className="txt-greyed-out">Zenith Bank</div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
