import React, { useState, useEffect } from "react";
import DashHeaderDetails from "./DashHeaderDetails";
import EditIcon from "../../../../assets/icons/Details/EditIcon";
import EditTask from "../modals/EditDetails/EditTask";
import { toast } from "react-hot-toast";
// import generic_logo from '../../../../assets/images/generic-company-logo.png'
// import DashHeader from '../dash/DashHeader';

async function getTask(id) {
  //gettoken
  const userInfoObject = localStorage.getItem("user");
  const userInfo = JSON.parse(userInfoObject);
  console.log(userInfo);
  return fetch(
    `https://us-central1-terp-338409.cloudfunctions.net/app/api/gettask?id=${id}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    }
  ).then((data) => data.json());
}

export default function TaskDetails(props) {
  const [details, setDetails] = useState();

  const [showEdit, setShowEdit] = useState("hidden");
  const handleShowEdit = () => {
    if (showEdit === "hidden") {
      setShowEdit("");
    } else {
      setShowEdit("hidden");
    }
  };

  const refreshTaskDetails = async (id) => {
    const data = await getTask(id);
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

  useEffect(async () => {
    if (!props.id) {
      console.log("no id");
      return null;
    }
    console.log(props.id);
    let mounted = true;
    const data = await getTask(props.id);
    console.log(data);
    if (data.status == 403) {
      props.updateUser({});
    } else if (data.status == 400) {
      setDetails("");
    } else if (data.status == 200) {
      if (mounted) {
        setDetails(data.data);
      }
    } else {
      //do nothing
    }
    return () => (mounted = false);
    // setBids(data)
  }, [props.id]);

  return (
    <>
      <EditTask
        show={showEdit}
        details={details}
        handleShow={handleShowEdit}
        updateUser={props.updateUser}
        id={props.id}
        getTask={refreshTaskDetails}
      />
      <div className={`details-main-body bg-whitex ${props.show}`}>
        <DashHeaderDetails
          title={details?.name}
          handleShow={props.handleShow}
          status={details?.status}
        />

        <div className="my-3 text-lg pl-3 font-bold txt-headr md:flex lg:hidden relative">
          {details?.name}
          <br />{" "}
          <span className={`md:block hidden flt-id xwarn`}>
            {details?.status}
          </span>
          <span className={`md:hidden block-inline xwarn`}>
            {details?.name}
          </span>
        </div>

        <div className="bg-whitex w-full pr-5 txt-dark-bluex">
          <div className="details-summary">
            <div className="details-summary-item">
              <div className="txt-greyed-out">Initiated By</div>
              <div className="font-bold">{details?.initiatedBy}</div>
            </div>
            <div className="details-summary-item">
              <div className="txt-greyed-out">Assigned To </div>
              <div className="font-bold">{details?.assignedTo}</div>
            </div>
            <div className="details-summary-item">
              <div className="txt-greyed-out">Date Created</div>
              <div className="font-bold">
                {details?.startDate}
              </div>
            </div>
            <div className="details-summary-item">
              <div className="txt-greyed-out">Due Date</div>
              <div className="font-bold">{details?.deadline}</div>
            </div>
            <div className="details-summary-edit-btn">
              <button
                className="border-2 border- px-2 py-1 rounded inline-block mt-2 whitespace-nowrap"
                onClick={handleShowEdit}
              >
                <EditIcon classx="fill-current inline" /> Edit Details
              </button>
            </div>
          </div>
          <div className="m-4 bg-whitex shadow grid grid-cols-7 gap-12 p-7">
            <div className="col-span-7 md:col-span-5 details-desc">
              <div className="description mt-5">
                <div className="font-bold">TASK SCOPE</div>
                <div>{details?.scope}</div>
              </div>
              <div className="description mt-5">
                <div className="font-bold">TASK REMARKS</div>
                <div>{details?.tasks}</div>
              </div>
              <div className="description mt-5">
                <div className="font-bold">TAGS</div>
                <div>{details?.tag}</div>
              </div>
            </div>

            <div className="side-content md:col-span-2 col-span-7">
              <div>
                <div className="font-bold">PEOPLE INVOLVED</div>
                <ul>
                  {details?.peopleInvolved.map((e)=>{
                    return (
                      <li className="flex" key={e}> {e}</li>
                    )
                  })}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
