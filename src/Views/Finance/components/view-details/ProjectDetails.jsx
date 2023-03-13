/* eslint-disable no-script-url */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useEffect } from "react";
import DashHeaderDetails from "./DashHeaderDetails";
import generic_logo from "../../../../assets/images/generic-company-logo.png";
import EditIcon from "../../../../assets/icons/Details/EditIcon";
import EditProject from "../modals/EditDetails/EditProject";
import DocumentCopyIcon from "../../../../assets/icons/Details/DocumentCopyIcon";
import MiniSidePanel from "../menu/MiniSidePanel";
import { Toaster, toast } from "react-hot-toast";
import { regularx, activex } from "../menu/MiniSidePanel";
// redux
import { useSelector } from "react-redux";
// import DashHeader from '../dash/DashHeader';

async function getProjectDetails(id) {
  //gettoken
  const userInfoObject = localStorage.getItem("user");
  const userInfo = JSON.parse(userInfoObject);
  console.log(userInfo);
  return fetch(
    `https://us-central1-terp-338409.cloudfunctions.net/app/api/getproject?id=${id}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    }
  ).then((data) => data.json());
}

async function getProjectExpenses(id) {
  //gettoken
  const userInfoObject = localStorage.getItem("user");
  const userInfo = JSON.parse(userInfoObject);
  return fetch(
    `https://us-central1-terp-338409.cloudfunctions.net/app/api/getProjectExpenses?id=${id}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    }
  ).then((data) => data.json());
}

export default function ProjectDetails(props) {
  var active_selectr = {
    dash: regularx,
    projects: activex,
    bids: regularx,
    companies: regularx,
    tasks: regularx,
    equipments: regularx,
    meetings: regularx,
    expenses: regularx,
    logout: regularx,
    settings: regularx,
  };

  const [details, setDetails] = useState();
  const [expenses, setExpenses] = useState([]);
  const [showEdit, setShowEdit] = useState("hidden");
  const handleShowEdit = () => {
    if (showEdit === "hidden") {
      setShowEdit("");
    } else {
      setShowEdit("hidden");
    }
  };

  const getProjectDetail = async (id) => {
    const data = await getProjectDetails(id);
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
      props.getProjects();
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
    const data = await getProjectDetails(props.id);
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

  useEffect(async () => {
    if (!props.id) {
      console.log("no id");
      return null;
    }
    console.log(props.id);
    let mounted = true;
    const data = await getProjectExpenses(props.id);
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
        setExpenses(data.data);
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

  var naira_sign = "\u20a6";
  // var temp_table = [
  //   {
  //     id: 1,
  //     expense: "Repair of Grinding and Shredding Equipment",
  //     amount: "972,231.00",
  //     date: "28 Feb 2021",
  //     category: "Cleaning & Maintenance",
  //   },
  //   {
  //     id: 2,
  //     expense: "Repair of Grinding and Shredding Equipment",
  //     amount: "972,231.00",
  //     date: "28 Feb 2021",
  //     category: "Cleaning & Maintenance",
  //   },
  //   {
  //     id: 3,
  //     expense: "Repair of Grinding and Shredding Equipment",
  //     amount: "972,231.00",
  //     date: "28 Feb 2021",
  //     category: "Cleaning & Maintenance",
  //   },
  //   {
  //     id: 4,
  //     expense: "Repair of Grinding and Shredding Equipment",
  //     amount: "972,231.00",
  //     date: "28 Feb 2021",
  //     category: "Cleaning & Maintenance",
  //   },
  // ];

  return (
    <>
      <EditProject
        data={details}
        id={props.id}
        show={showEdit}
        handleShow={handleShowEdit}
        updateUser={props.updateUser}
        getProjectDetail={getProjectDetail}
      />
      <div className={`mainbody ${props.show}`}>
        <MiniSidePanel
          active_selectr={active_selectr}
          updateUser={props.updateUser}
        />
        <div className={props.show}>
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
                {details?.bidID}
              </span>
            </div>

            <div className="bg-whitex w-full pr-5">
              <div className="details-summary gap-1">
                <div className="details-summary-item">
                  <div className="txt-greyed-out">Bid ID</div>
                  <div className="font-bold">{details?.bidID}</div>
                </div>
                <div className="xmy-2 xflex-auto details-summary-item">
                  <div className="txt-greyed-out">Location</div>
                  <div className="font-bold text-wrap">{details?.location}</div>
                </div>
                {/* <div className="details-summary-item">
                  <div className="txt-greyed-out">Client Department</div>
                  <div className="font-bold">{details?.c}</div>
                </div> */}
                <div className="details-summary-item">
                  <div className="txt-greyed-out">Client</div>
                  <div className="font-bold">{details?.client}</div>
                </div>
                <div className="details-summary-item">
                  <div className="txt-greyed-out">Company</div>
                  <div className="font-bold">{details?.company}</div>
                </div>
                <div className="details-summary-item">
                  <div className="txt-greyed-out">Take-Off Date</div>
                  <div className="font-bold">{details?.takeoff_date}</div>
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
                    <div className="font-bold">PROJECT DESCRIPTION</div>
                    <div>{details?.scope}</div>
                  </div>
                  <div className="description mt-5">
                    <div className="font-bold">PROJECT REMARKS</div>
                    <div>{details?.comment}</div>
                  </div>
                  <div className="description mt-5">
                    <div className="font-bold">TAGS</div>
                    <div>{details?.tag}</div>
                  </div>
                </div>
                <div className="side-content col-span-7 md:col-span-4 lg:col-span-2">
                  <div className="w-full">
                    <span className="font-bold">FINANCIAL DETAILS</span>
                    <ul>
                      <li className="relative">
                        <span className="txt-greyed-out">Contract Sum</span>
                        <span className="absolute right-1 font-bold">
                          ₦{details?.contractSum}
                        </span>
                      </li>
                      <li className="relative">
                        <span className="txt-greyed-out">
                          Cost of Execution
                        </span>
                        <span className="absolute right-1 font-bold">
                          ₦{details?.costOfExecution}
                        </span>
                      </li>
                      {/* <li className="relative">
                        <span className="txt-greyed-out">Payment Status</span>
                        <span className="absolute right-1 xwarn px rounded-2">
                          {details?.paymentStatus}
                        </span>
                      </li> */}
                      <li className="relative">
                        <span className="txt-greyed-out">Amount Paid</span>
                        <span className="absolute right-1 txt-pass">
                          ₦{details?.amountPaid}
                        </span>
                      </li>
                      <li className="relative">
                        <span className="txt-greyed-out">Balance Owed</span>
                        <span className="absolute right-1 txt-fail">
                          ₦{details?.balanceOwed}
                        </span>
                      </li>
                      <li className="flex"></li>
                    </ul>
                  </div>
                  <div className="mt-8">
                    <span className="font-bold">FILES</span>
                    <ul>
                      <li className="flex mt-2">
                        <DocumentCopyIcon classx="fill-current txt-bluex mr-3" />
                        {details?.letterofaward?.length > 1  ? (
                          <a
                            href={details?.letterofaward}
                            target="_blank"
                            rel="noreferrer"
                          >
                            {" "}
                            Letter of Award{" "}
                          </a>
                        ) : (
                          <a
                            href="javascript:void()"
                            target=""
                            rel="noreferrer"
                          >
                            {" "}
                            Letter of Award{" "}
                          </a>
                        )}
                      </li>
                      <li className="flex mt-2">
                        <DocumentCopyIcon classx="fill-current txt-bluex mr-3" />
                        {details?.acceptanceletter?.length > 1  ? (
                          <a
                            href={details?.acceptanceletter}
                            target="_blank"
                            rel="noreferrer"
                          >
                            {" "}
                            Acceptance Letter{" "}
                          </a>
                        ) : (
                          <a
                            href="javascript:void()"
                            target="_blank"
                            rel="noreferrer"
                          >
                            {" "}
                            Acceptance Letter{" "}
                          </a>
                        )}
                      </li>

                      <li className="flex mt-2">
                        <DocumentCopyIcon classx="fill-current txt-bluex mr-3" />
                        {details?.purchaseOrder?.length > 1 ? (
                          <a
                            href={details?.purchaseOrder}
                            target="_blank"
                            rel="noreferrer"
                          >
                            {" "}
                            Purchase Order{" "}
                          </a>
                        ) : (
                          <a
                            href="javascript:void()"
                            target=""
                            rel="noreferrer"
                          >
                            {" "}
                            Purchase Order{" "}
                          </a>
                        )}
                      </li>
                      <li className="flex mt-2">
                        <DocumentCopyIcon classx="fill-current txt-bluex mr-3" />
                        {details?.workOrder?.length > 1  ? (
                          <a
                            href={details?.workOrder}
                            target="_blank"
                            rel="noreferrer"
                          >
                            {" "}
                            Work Order{" "}
                          </a>
                        ) : (
                          <a
                            href="javascript:void()"
                            target=""
                            rel="noreferrer"
                          >
                            {" "}
                            Work Order{" "}
                          </a>
                        )}
                      </li>
                      <li className="flex mt-2">
                        <DocumentCopyIcon classx="fill-current txt-bluex mr-3" />
                        {details?.apgInvoice?.length > 1  ? (
                          <a
                            href={details?.apgInvoice}
                            target="_blank"
                            rel="noreferrer"
                          >
                            {" "}
                            APG Invoice{" "}
                          </a>
                        ) : (
                          <a
                            href="javascript:void()"
                            target=""
                            rel="noreferrer"
                          >
                            {" "}
                            APG Invoice{" "}
                          </a>
                        )}
                      </li>
                      <li className="flex mt-2">
                        <DocumentCopyIcon classx="fill-current txt-bluex mr-3" />
                        {details?.invoiceDeliveryNote?.length > 1 ? (
                          <a
                            href={details?.invoiceDeliveryNote}
                            target="_blank"
                            rel="noreferrer"
                          >
                            {" "}
                            Invoice{" "}
                          </a>
                        ) : (
                          <a
                            href="javascript:void()"
                            target=""
                            rel="noreferrer"
                          >
                            {" "}
                            Invoice{" "}
                          </a>
                        )}
                      </li>
                      <li className="flex mt-2">
                        <DocumentCopyIcon classx="fill-current txt-bluex mr-3" />
                        {details?.certificateOfCompletion?.length > 1  ? (
                          <a
                            href={details?.certificateOfCompletion}
                            target="_blank"
                            rel="noreferrer"
                          >
                            {" "}
                            Certificate of completion{" "}
                          </a>
                        ) : (
                          <a
                            href="javascript:void()"
                            target=""
                            rel="noreferrer"
                          >
                            {" "}
                            Certificate of completion{" "}
                          </a>
                        )}
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="mx-4">
                PROJECT EXPENSES
                <div className="flex flex-col">
                  <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                    <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                      <div className="shadow overflow-hidden border-b border-gray-200 xsm:rounded-lg">
                        <table className="min-w-full divide-y divide-gray-200 xtable-auto">
                          <thead className="bg-gray-100 text-sm font-medium">
                            <tr>
                              <th
                                scope="col"
                                className="px-6 py-3 text-left font-medium text-gray-500 xtracking-wider"
                              >
                                ID
                              </th>
                              <th
                                scope="col"
                                className="px-6 py-3 text-center font-medium text-gray-500 xtracking-wider"
                              >
                                Expense
                              </th>
                              <th
                                scope="col"
                                className="px-6 py-3 text-center font-medium text-gray-500 tracking-wider"
                              >
                                Amount
                              </th>
                              <th
                                scope="col"
                                className="px-3 py-3 text-center font-medium text-gray-500 tracking-wider"
                              >
                                Date
                              </th>
                              <th
                                scope="col"
                                className="px-6 py-3 text-center font-medium text-gray-500 tracking-wider"
                              >
                                AuthorisedBy
                              </th>
                            </tr>
                          </thead>
                          <tbody className="bg-whitex divide-y divide-gray-200">
                            {expenses?.map((e) => {
                              return (
                                <tr key={e.id}>
                                  <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="flex items-center">
                                      {e?.id}
                                    </div>
                                  </td>
                                  <td className="px-6 py-4 whitespace-nowrap text-center">
                                    {e?.description}
                                  </td>
                                  <td className="px-6 py-4 whitespace-nowrap  text-center">
                                    {naira_sign}
                                    {e?.amount}
                                  </td>
                                  <td className="px-6 py-4 whitespace-nowrap text-center">
                                    {e?.date}
                                  </td>
                                  <td className="px-6 py-4 whitespace-nowrap text-center">
                                    {e?.authorisedBy}
                                  </td>
                                </tr>
                              );
                            })}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
