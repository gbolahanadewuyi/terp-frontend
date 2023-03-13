import React, { useState, useEffect, useRef } from "react";
// import CustomFileUpload from "../../dash/CustomFileUpload";
import EditCustomFileUpload from "../../dash/EditCustomFileUpload";
import { toast } from "react-hot-toast";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner, faPlus } from "@fortawesome/free-solid-svg-icons";
import projectTempData from "../../../../../tempDb/projects";

async function getBids() {
  //gettoken
  const userInfoObject = localStorage.getItem("user");
  const userInfo = JSON.parse(userInfoObject);
  return fetch(
    "https://us-central1-terp-338409.cloudfunctions.net/app/api/getbids",
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    }
  ).then((data) => data.json());
}

async function getBid(e) {
  //gettoken
  const userInfoObject = localStorage.getItem("user");
  const userInfo = JSON.parse(userInfoObject);
  return fetch(
    `https://us-central1-terp-338409.cloudfunctions.net/app/api/getbid?id=${e}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    }
  ).then((data) => data.json());
}

async function updateProject(credentials, id) {
  console.log(credentials);

  const userInfoObject = localStorage.getItem("user");
  const userInfo = JSON.parse(userInfoObject);
  console.log(userInfo);
  try {
    const data = await fetch(
      `https://us-central1-terp-338409.cloudfunctions.net/app/api/updateProject?id=${id}`,
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

export default function EditProject(props) {
  // var naira_sign = '\u20a6'; z
  // var progress_style = {
  //     width: "90%"
  //   }
  const [projectdurations, setProjectDurations] = useState(
    projectTempData.durations
  );
  const [projectstatuses, setProjectStatuses] = useState(
    projectTempData.status
  );
  const [projectmilestones, setProjectMilestones] = useState(
    projectTempData.milestones
  );

  const [updateProjectHtmlValue, setUpdateProjectHtmlValue] =
    useState("Update Project");

  const [updateProjectIcon, setUpdateProjectIcon] = useState(faPlus);

  const [updateProjectIconClassname, setUpdateProjectIconClassname] =
    useState();

  const [bids, setBids] = useState();

  const [name, setProjectName] = useState("");
  const [client, setClient] = useState("");
  const [company, setCompany] = useState("");
  const [location, setLocation] = useState("");
  const [contractSum, setContractSum] = useState("");
  const [tag, setTag] = useState("");
  const [scope, setScope] = useState("");
  const [bidID, setBidID] = useState("");

  const [id, setId] = useState("");
  const [takeoff_date, setTakeoffDate] = useState("");
  const [duration, setDuration] = useState("");
  const [status, setStatus] = useState("");
  const [comment, setComment] = useState("");
  const [costOfExecution, setCostOfExecution] = useState("");
  // const [percentage_of_completion, setMilestone] = useState("");
  const [amountPaid, setAmountPaid] = useState("");
  // const [balanceowed, setBalanceOwed] = useState("");
  // const [paymentStatus, setPaymentStatus] = useState("");
  const [purchaseOrder, setPurchaseOrder] = useState("");
  const [workOrder, setWorkOrder] = useState("");
  const [letterofaward, setLetterOfAward] = useState("");
  const [acceptanceletter, setAcceptanceLetter] = useState("");
  const [invoiceDeliveryNote, setInvoiceDeliveryNote] = useState("");
  const [apgInvoice, setApgInvoice] = useState("");
  const [certificateOfCompletion, setCertificateOfCompletion] = useState("");

  useEffect(async () => {
    setProjectName(props.data?.name);
    setClient(props.data?.client);
    setCompany(props.data?.company);
    setLocation(props.data?.location);
    setContractSum(props.data?.contractSum);
    setTag(props.data?.tag);
    setScope(props.data?.scope);
    setBidID(props.data?.bidID);

    setId(props.id);
    setTakeoffDate(props.data?.takeoff_date);
    setDuration(props.data?.duration);
    setStatus(props.data?.status);
    setComment(props.data?.comment);
    setCostOfExecution(props.data?.costOfExecution);
    // setMilestone(props.data?.percentage_of_completion);
    setAmountPaid(props.data?.amountPaid);
    setInvoiceDeliveryNote(props.data?.invoiceDeliveryNote);
    setApgInvoice(props.data?.apgInvoice);
    // setBalanceOwed(props.data?.balanceowed);
    // setPaymentStatus(props.data?.paymentStatus);
    setPurchaseOrder(props.data?.purchaseOrder);
    setWorkOrder(props.data?.workOrder);
    setLetterOfAward(props.data?.letterofaward);
    setAcceptanceLetter(props.data?.acceptanceletter);
  }, [props.data, props.id]);

  useEffect(async () => {
    console.log(projectTempData);
    setProjectDurations(
      projectTempData.durations.filter((e) => {
        return e.duration !== duration;
      })
    );
  }, [duration]);

  useEffect(async () => {
    setProjectStatuses(
      projectTempData.status.filter((e) => {
        return e.status !== status;
      })
    );
  }, [status]);

  // useEffect(async () => {
  //   setProjectMilestones(
  //     projectTempData.milestones.filter((e) => {
  //       return e.percentage !== percentage_of_completion;
  //     })
  //   );
  // }, [percentage_of_completion]);

  useEffect(async () => {
    let mounted = true;
    const data = await getBids();
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
        setBids(
          data.data.filter((e) => {
            return e.id !== bidID;
          })
        );
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
  }, [bidID]);

  const handleBidSelection = async (e) => {
    console.log(e);
    const data = await getBid(e);
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
      setProjectName(data.data.tender_title);
      setTakeoffDate(); //fix
      setLocation(data.data.location);
      setClient(data.data.client);
      setCompany(data.data.winning_company);
      setContractSum(data.data.contractSum);
      setTag(data.data.tag);
      setScope(data.data.scope);
      setLetterOfAward(data.data.letterofaward);
      setBidID(e);
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

  // // Hook
  // function usePrevious(value) {
  //   // The ref object is a generic container whose current property is mutable ...
  //   // ... and can hold any value, similar to an instance property on a class
  //   const ref = useRef();
  //   // Store current value in ref
  //   useEffect(() => {
  //     ref.current = value;
  //   }, [value]); // Only re-run if value changes
  //   // Return previous value (happens before update in useEffect above)
  //   return ref.current;
  // }

  const handleSubmit = async (e) => {
    e.preventDefault();
    document.getElementById("updateProject-button").disabled = true;
    setUpdateProjectHtmlValue("Processing please wait....");
    setUpdateProjectIcon(faSpinner);
    setUpdateProjectIconClassname("spinner");
    const data = await updateProject(
      {
        contractSum,
        client,
        name,
        bidID,
        takeoff_date,
        duration,
        status,
        costOfExecution,
        comment,
        purchaseOrder,
        workOrder,
        tag,
        scope,
        invoiceDeliveryNote,
        apgInvoice,
        certificateOfCompletion,
        letterofaward,
        company,
        location,
        amountPaid,
        // percentage_of_completion,
        acceptanceletter,
      },
      id
    );
    console.log(data);
    if (data.status == 403) {
      toast.error(`${data.message}`, {
        icon: "😞",
        duration: 5000,
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
      setUpdateProjectIconClassname("");
      setUpdateProjectIcon(faPlus);
      setUpdateProjectHtmlValue("Update Project");
      document.getElementById("updateProject-button").disabled = false;
    } else if (data.status == 200) {
      toast.success("project updated successfully!", {
        duration: 5000,
        icon: "👏",
        position: "top-right",
        style: {
          borderRadius: "10px",
          background: "#333",
          color: "#fff",
        },
      });

      document.getElementById("updateProject-form").reset();

      setUpdateProjectIconClassname("");
      setUpdateProjectIcon(faPlus);
      setUpdateProjectHtmlValue("Update Project");
      document.getElementById("updateProject-button").disabled = false;
      props.handleShow();
      props.getProjectDetail(id);
    } else {
      toast.error(`Server error, please check your network connection`, {
        icon: "😞",
        duration: 5000,
        position: "top-right",
        style: {
          borderRadius: "10px",
          background: "#333",
          color: "#fff",
        },
      });
      setUpdateProjectIconClassname("");
      setUpdateProjectIcon(faPlus);
      setUpdateProjectHtmlValue("Update Project");
      document.getElementById("updateProject-button").disabled = false;
    }
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
            <h1 className=" p-2 pl-5 edit-modal-headr-x">Edit Project</h1>
          </div>

          <form
            className="grid grid-cols-4 grid-row-7 gap-4 px-10 py-6"
            id="updateProject-form"
            onSubmit={handleSubmit}
          >
            <div className="col-span-4 text-left">
              <label className="xtext-blue-900" htmlFor="payment-duration">
                Bid
              </label>
              <select
                type="text"
                className="shadow xappearance-none border rounded w-full py-2 px-3 xxtext-blue-700 bg-gray-100 mt-2 focus:outline-none focus:shadow-outline"
                id="payment-duration"
                name="payment-duration"
                onChange={(e) => handleBidSelection(e.target.value)}
              >
                <option className="" value={bidID}>
                  {name}
                </option>
                {bids?.map((e) => (
                  <option key={e?.id} value={e?.id}>
                    {e?.tender_title}
                  </option>
                ))}
              </select>
            </div>

            <div className="col-span-2 text-left">
              <label className="xtext-blue-900" htmlFor="take-off-date">
                Take-Off Date
              </label>
              <br></br>
              <input
                type="date"
                className="shadow appearance-none border rounded w-full py-2 px-3 xxtext-blue-700 bg-gray-100 mt-2 focus:outline-none focus:shadow-outline"
                id="take-off-date"
                value={takeoff_date}
                name="take-off-date"
                onChange={(e) => setTakeoffDate(e.target.value)}
              />
            </div>

            <div className="col-span-2  text-left">
              <label className="xtext-blue-900" htmlFor="payment-duration">
                Project Duration
              </label>
              <select
                type="text"
                className="shadow xappearance-none border rounded w-full py-2 px-3 xxtext-blue-700 bg-gray-100 mt-2 focus:outline-none focus:shadow-outline"
                onChange={(e) => setDuration(e.target.value)}
              >
                <option className="" value={duration}>
                  {duration}
                </option>

                {projectdurations?.map((e) => (
                  <option key={e?.id} value={e?.duration}>
                    {e?.duration}
                  </option>
                ))}
              </select>
            </div>

            {/* <div className="col-span-2  text-left">
              <label className="xtext-blue-900" htmlFor="milestone">
                Milestone
              </label>
              <select
                type="text"
                className="shadow xappearance-none border rounded w-full py-2 px-3 xxtext-blue-700 bg-gray-100 mt-2 focus:outline-none focus:shadow-outline"
                id="milestone"
                name="milestone"
                onChange={(e) => setMilestone(e.target.value)}
              >
                <option className="" value={percentage_of_completion}>
                  {percentage_of_completion}%
                </option>
                {projectmilestones?.map((e) => (
                  <option key={e?.id} value={e?.percentage}>
                    {e?.percentage}%
                  </option>
                ))}
              </select>
            </div> */}

            <div className="col-span-2 text-left">
              <label className="xtext-blue-900" htmlFor="cost-of-execution">
                Cost of Execution
              </label>
              <input
                type="text"
                className="shadow appearance-none border rounded w-full py-2 px-3 xxtext-blue-700 bg-gray-100 mt-2 focus:outline-none focus:shadow-outline"
                id="cost-of-execution"
                placeholder="Enter Cost of Execution"
                name="cost-of-execution"
                value={costOfExecution}
                onChange={(e) => setCostOfExecution(e.target.value)}
              />
            </div>

            {/* <div className="col-span-2 text-left">
              <label className="xtext-blue-900" htmlFor="payment-status">
                Payment Status
              </label>
              <select
                type="text"
                className="shadow xappearance-none border rounded w-full py-2 px-3 xxtext-blue-700 bg-gray-100 mt-2 focus:outline-none focus:shadow-outline"
                id="payment-status"
                name="payment-status"
                onChange={(e) => setPaymentStatus(e.target.value)}
              >
                <option className="xpass" value={paymentStatus}>
                  {paymentStatus}
                </option>
                <option className="xpass" value="half-payment">
                  Half Payment
                </option>
                <option className="xwarn" value="full-payment">
                  Full Payment
                </option>
                <option className="xfail" value="no-payment">
                  No Payment
                </option>
              </select>
            </div> */}

            <div className="col-span-2 text-left">
              <label className="xtext-blue-900" htmlFor="amount-paid">
                Amount Paid
              </label>
              <br></br>
              <input
                type="text"
                className="shadow appearance-none border rounded w-full py-2 px-3 xxtext-blue-700 bg-gray-100 mt-2 focus:outline-none focus:shadow-outline"
                placeholder=""
                id="amount-paid"
                name="amount-paid"
                value={amountPaid}
                onChange={(e) => setAmountPaid(e.target.value)}
              />
            </div>

            {/* <div className="col-span-2 text-left">
              <label className="xtext-blue-900" htmlFor="balance-owed">
                Balance Owed
              </label>
              <br></br>
              <input
                type="text"
                className="shadow appearance-none border rounded w-full py-2 px-3 xxtext-blue-700 bg-gray-100 mt-2 focus:outline-none focus:shadow-outline"
                placeholder=""
                id="balance-owed"
                name="balance-owed"
                value={balanceowed}
                onChange={(e) => setBalanceOwed(e.target.value)}
              />
            </div> */}

            <div className="col-span-2 text-left">
              <label className="xtext-blue-900" htmlFor="project-status">
                Project Status
              </label>
              <select
                type="text"
                className="shadow xappearance-none border rounded w-full py-2 px-3 xxtext-blue-700 bg-gray-100 mt-2 focus:outline-none focus:shadow-outline"
                id="project-status"
                name="project-status"
                onChange={(e) => setStatus(e.target.value)}
              >
                <option className="xpass" value={status}>
                  {status}
                </option>

                {projectstatuses?.map((e) => (
                  <option key={e?.id} value={e?.status}>
                    {e?.status}
                  </option>
                ))}
              </select>
            </div>

            <div className="col-span-2 text-left">
              <label>Remarks</label>
              <textarea
                className="shadow appearance-none border rounded w-full py-2 px-3 xxtext-blue-700 bg-gray-100 mt-2 focus:outline-none focus:shadow-outline"
                placeholder="Enter Project Remarks"
                id="purchase-order"
                name="purchase-order"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
              />
            </div>

            <div className="col-span-4 text-left">
              <div>Attachement File (PF, .docx, jpg formats)</div>
              <div className="grid grid-cols-2 gap-4">
                <div className="col-span-2 md:col-span-1">
                  <label>Apg Invoice:</label>
                  <EditCustomFileUpload
                    input_id="editApgInvoice"
                    setApgInvoice={setApgInvoice}
                  />
                </div>
                <div className="col-span-2 md:col-span-1">
                  <label>Invoice:</label>
                  <EditCustomFileUpload
                    input_id="editinvoice"
                    setInvoiceDeliveryNote={setInvoiceDeliveryNote}
                  />
                </div>
                <div className="col-span-2 md:col-span-1">
                  <label>Purchase Order:</label>
                  <EditCustomFileUpload
                    input_id="editpurchaseOrder"
                    setPurchaseOrder={setPurchaseOrder}
                  />
                </div>
                <div className="col-span-2 md:col-span-1">
                  <label>Work Order:</label>
                  <EditCustomFileUpload
                    input_id="editworkOrder"
                    setWorkOrder={setWorkOrder}
                  />
                </div>
                <div className="col-span-2 md:col-span-1">
                  <label>Certificate of Completion:</label>
                  <EditCustomFileUpload
                    input_id="editcertificate-of-completion"
                    setCertificateOfCompletion={setCertificateOfCompletion}
                  />
                </div>
              </div>
            </div>

            <button
              type="submit"
              className="md:col-start-4 col-start-3 md:col-span-1 col-span-2 shadow appearance-none border rounded w-full py-2 px-3 text-white button-solidx mt-2 focus:outline-none focus:shadow-outline"
              id="updateProject-button"
              value="Save Changes"
            >
              {" "}
              <FontAwesomeIcon
                icon={updateProjectIcon}
                className={updateProjectIconClassname}
              />{" "}
              {updateProjectHtmlValue}{" "}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
