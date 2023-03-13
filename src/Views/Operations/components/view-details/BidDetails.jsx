/* eslint-disable no-script-url */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useEffect } from "react";
import DashHeaderDetails from "./DashHeaderDetails";
import EditBids from "../modals/EditDetails/EditBids";
import generic_logo from "../../../../assets/images/generic-company-logo.png";
import EditIcon from "../../../../assets/icons/Details/EditIcon";
import DocumentCopyIcon from "../../../../assets/icons/Details/DocumentCopyIcon";
import { toast } from "react-hot-toast";
// import DashHeader from '../dash/DashHeader';

async function getBidDetails(id) {
  //gettoken
  const userInfoObject = localStorage.getItem("user");
  const userInfo = JSON.parse(userInfoObject);
  console.log(userInfo);
  return fetch(
    `https://us-central1-terp-338409.cloudfunctions.net/app/api/getbid?id=${id}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    }
  ).then((data) => data.json());
}

export default function BidDetails(props) {
  const [details, setDetails] = useState();

  // const currentDataBids = useSelector(state => state.currentDataBids);
  const [showEdit, setShowEdit] = useState("hidden");
  const handleShowEdit = () => {
    if (showEdit === "hidden") {
      setShowEdit("");
    } else {
      setShowEdit("hidden");
    }
  };

  const getBidDetail = async (id) => {
    const data = await getBidDetails(id);
    console.log(data);
    if (data.status === 403) {
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
    } else if (data.status === 400) {
      toast.error(`${data.message}`, {
        icon: "😞",
        position: "top-right",
        style: {
          borderRadius: "10px",
          background: "#333",
          color: "#fff",
        },
      });
    } else if (data.status === 200) {
      setDetails(data.data);
      props.getBids();
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
    const data = await getBidDetails(props.id);
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
      if (mounted) {
        console.log(data.data);
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
  }, [props.id]);

  return (
    <>
      <EditBids
        details={details}
        id={props.id}
        show={showEdit}
        handleShow={handleShowEdit}
        updateUser={props.updateUser}
        getBidDetail={getBidDetail}
      />
      <div className={`details-main-body bg-white ${props.show}`}>
        <DashHeaderDetails
          title={details?.tender_title}
          status={details?.status}
          handleShow={props.handleShow}
        />
        <div className="my-3 text-lg pl-3 font-bold txt-headr md:flex lg:hidden relative">
          {details?.name}
          <br />{" "}
          <span className={`md:block hidden flt-id xwarn`}>
            {details?.status}
          </span>
          <span className={`md:hidden block-inline xwarn`}>
            {details?.status}
          </span>
        </div>

        <div className="bg-whitex w-full pr-5">
          <div className="details-summary gap-2x">
            <div className="details-summary-item">
              <div className="txt-greyed-out">Bid ID</div>
              <div className="font-bold">{props?.id}</div>
            </div>
            
            <div className="details-summary-item">
              <div className="txt-greyed-out">Client</div>
              <div className="font-bold">{details?.client}</div>
            </div>
            <div className="details-summary-item">
              <div className="txt-greyed-out">Client Department</div>
              <div className="font-bold">
                {details?.client_contract_management_department}
              </div>
            </div>
            <div className="details-summary-item">
              <div className="txt-greyed-out">Contract Sum</div>
              <div className="font-bold">₦{details?.contractSum}</div>
            </div>
            <div className="details-summary-item">
              <div className="txt-greyed-out">Company</div>
              <div className="font-bold">{details?.winning_company}</div>
            </div>
            <div className="details-summary-item">
              <div className="txt-greyed-out">Date Submitted</div>
              <div className="font-bold">{details?.date_submitted}</div>
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
            <div className="col-span-7 lg:col-span-5 details-desc">
             
              <div className="description mt-5">
                <div className="font-bold">BID SCOPE</div>
                <div>{details?.scope}</div>
              </div>
              <div className="description mt-5">
                <div className="font-bold">BID REMARKS</div>
                <div>{details?.remark}</div>
              </div>
              <div className="description mt-5">
                <div className="font-bold">TAGS</div>
                <div>{details?.tag}</div>
              </div>
             
            </div>

            <div className="side-content col-span-7 md:col-span-4 lg:col-span-2">
              <div>
                BIDDING COMPANIES
                <ul>
                  {details?.companies.map((e) => {
                    return (
                      <li className="relative mb-2" key={e}>
                        <img
                          src={generic_logo}
                          alt="company img"
                          width={30}
                          className="overflow-hidden object-cover rounded-full border-2 mr-3 absolute "
                        />
                        <div className="ml-9">{e}</div>
                      </li>
                    );
                  })}
                </ul>
              </div>
              <div className="mt-8">
                Files
                <ul>
                  <li className="flex">
                    <DocumentCopyIcon classx="fill-current txt-bluex mr-3" />
                    {details?.rfq?.length > 1 ? (
                      <a href={details?.rfq} target="_blank" rel="noreferrer">
                        RFQ
                      </a>
                    ) : (
                      <a href="javascript:void()" target="" rel="">
                        RFQ
                      </a>
                    )}
                  </li>
                  <li className="flex">
                    <DocumentCopyIcon classx="fill-current txt-bluex mr-3" />
                    {details?.financials?.length > 1 ? (
                      <a
                        href={details?.financials}
                        target="_blank"
                        rel="noreferrer"
                      >
                        Financials
                      </a>
                    ) : (
                      <a href="javascript:void()" target="" rel="">
                        Financials
                      </a>
                    )}
                  </li>
                  <li className="flex">
                    <DocumentCopyIcon classx="fill-current txt-bluex mr-3" />
                    {details?.letterofaward?.length > 1 ? (
                      <a
                        href={details?.letterofaward}
                        target="_blank"
                        rel="noreferrer"
                      >
                        Letter of Award
                      </a>
                    ) : (
                      <a href="javascript:void()" target="" rel="">
                        Letter of Award
                      </a>
                    )}
                  </li>
                  <li className="flex">
                    <DocumentCopyIcon classx="fill-current txt-bluex mr-3" />
                    {details?.acceptanceletter?.length > 1 ? (
                      <a
                        href={details?.acceptanceletter}
                        target="_blank"
                        rel="noreferrer"
                      >
                        Acceptance Letter
                      </a>
                    ) : (
                      <a href="javascript:void()" target="" rel="">
                        Acceptance Letter
                      </a>
                    )}
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
