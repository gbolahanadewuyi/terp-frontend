import React, { useState, useEffect, useRef } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner, faPlus } from "@fortawesome/free-solid-svg-icons";
import { Toaster, toast } from "react-hot-toast";
import CustomFileUpload from "../../dash/CustomFileUpload";
// import ProjectMembersAvatar from './ProjectMembersAvatar';
// import CurrencyFormat from 'react-currency-format';

async function getBids() {
  //gettoken
  const userInfoObject = localStorage.getItem("user");
  const userInfo = JSON.parse(userInfoObject);
  return fetch(
    "https://us-central1-terp-338409.cloudfunctions.net/app/api/getBidsWon",
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

async function createProject(credentials) {
  console.log(JSON.stringify(credentials));
  const userInfoObject = localStorage.getItem("user");
  const userInfo = JSON.parse(userInfoObject);
  console.log(userInfo);
  return fetch(
    "https://us-central1-terp-338409.cloudfunctions.net/app/api/createProject",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
      body: JSON.stringify(credentials),
    }
  ).then((data) => data.json());
}

export default function AddProject(props) {
  const [createProjectHtmlValue, setCreateProjectHtmlValue] =
    useState("Create Project");
  const [createProjectIcon, setCreateProjectIcon] = useState(faPlus);
  const [createProjectIconClassname, setCreateProjectIconClassname] =
    useState();

  const [Bids, setBids] = useState();

  const [name, setProjectName] = useState("");
  const [client, setClient] = useState("");
  const [company, setCompany] = useState("");
  const [location, setLocation] = useState("");
  const [contractSum, setContractSum] = useState("");
  const [tag, setTag] = useState("");
  const [scope, setScope] = useState("");
  const [letterofaward, setLetterOfAward] = useState();
  const [acceptanceletter, setAcceptanceLetter] = useState();

  const [bidID, setBidID] = useState();
  const [takeoff_date, setTakeoffDate] = useState();
  const [duration, setDuration] = useState();
  const [comment, setComment] = useState();
  const [costOfExecution, setCostOfExecution] = useState();
  const [purchaseOrder, setPurchaseOrder] = useState();
  const [workOrder, setWorkOrder] = useState();

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
        setBids(data.data);
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

  const handleBidSelection = async (e) => {
    if (e === "⬇️ Select BID ⬇️") {
      console.log("no id");
      setProjectName("");
      setLocation("");
      setClient("");
      setCompany("");
      setContractSum("");
      setTag("");
      setScope("");
      setLetterOfAward("");
      setBidID("");
      return null;
    }
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
      setLocation(data.data.location);
      setClient(data.data.client);
      setCompany(data.data.winning_company);
      setContractSum(data.data.contractSum);
      setTag(data.data.tag);
      setScope(data.data.scope);
      setLetterOfAward(data.data.letterofaward);
      setAcceptanceLetter(data.data.acceptanceletter);
      setBidID(e);
    } else {
      toast.error(
        `Server error, could not get bid.Please check your network connection`,
        {
          icon: "😞",
          duration: 5000,
          position: "top-right",
          style: {
            borderRadius: "10px",
            background: "#333",
            color: "#fff",
          },
        }
      );
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    document.getElementById("createProject-button").disabled = true;
    setCreateProjectHtmlValue("Processing please wait....");
    setCreateProjectIcon(faSpinner);
    setCreateProjectIconClassname("spinner");
    const data = await createProject({
      contractSum,
      client,
      name,
      bidID,
      takeoff_date,
      duration,
      company,
      location,
      costOfExecution,
      comment,
      purchaseOrder,
      workOrder,
      tag,
      scope,
      letterofaward,
      acceptanceletter,
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
      setCreateProjectIconClassname("");
      setCreateProjectIcon(faPlus);
      setCreateProjectHtmlValue("Create Project");
      document.getElementById("createProject-button").disabled = false;
    } else if (data.status == 200) {
      toast.success("New Project Created!", {
        duration: 5000,
        icon: "👏",
        position: "top-right",
        style: {
          borderRadius: "10px",
          background: "#333",
          color: "#fff",
        },
      });
      document.getElementById("createProject-form").reset();
      setCreateProjectIconClassname("");
      setCreateProjectIcon(faPlus);
      setCreateProjectHtmlValue("Create Project");
      document.getElementById("createProject-button").disabled = false;
      props.handleShow();
      props.getProjects();
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
      setCreateProjectIconClassname("");
      setCreateProjectIcon(faPlus);
      setCreateProjectHtmlValue("Create Project");
      document.getElementById("createProject-button").disabled = false;
    }
  };

  return (
    <div className={props.show}>
      <div className="xback-board txt-dark-bluex">
        <div className="modal-inner-edit-x">
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
            <h1 className=" p-2 pl-5 edit-modal-headr-x">Create Project</h1>
          </div>
          <form
            className="grid grid-cols-4 grid-row-7 gap-4 px-5 py-6 "
            id="createProject-form"
            onSubmit={handleSubmit}
          >
            <div className="md:col-span-4 col-span-4 text-left">
              <label className="xtext-blue-900" htmlFor="bid-id">
                Bid ID
              </label>
              <br></br>
              <select
                className="shadow xappearance-none border rounded w-full py-2 px-3 xtext-blue-700 bg-gray-100 mt-2 focus:outline-none focus:shadow-outline"
                onChange={(e) => handleBidSelection(e.target.value)}
                required
                // id="winning-company"
                // name="winning-company"
              >
                <option value="⬇️ Select BID ⬇️"> -- Select a Bid -- </option>

                {Bids?.map((e) => (
                  <option key={e?.id} value={e?.id}>
                    {e?.tender_title}
                  </option>
                ))}
                {/* <option value="">Jmnc</option> */}
              </select>
            </div>

            <div className="col-span-2 text-left">
              <label className="xtext-blue-900" htmlFor="project-title">
                Project Title
              </label>
              <br></br>
              <input
                type="text"
                className="shadow appearance-none border rounded w-full py-2 px-3 xxtext-blue-700 bg-gray-100 mt-2 focus:outline-none focus:shadow-outline "
                placeholder="Enter Project Title"
                id="project-title"
                name="project-title"
                value={name}
                disabled
              />
            </div>
            <div className="col-span-2 text-left">
              <label className="xtext-blue-900" htmlFor="client-name">
                Client
              </label>
              <input
                type="text"
                className="shadow appearance-none border rounded w-full py-2 px-3 xxtext-blue-700 bg-gray-100 mt-2 focus:outline-none focus:shadow-outline"
                id="client-name"
                placeholder="Client"
                name="client-name"
                value={client}
                disabled
              />
            </div>
            <div className="col-span-2 text-left">
              <label className="xtext-blue-900" htmlFor="company">
                Company
              </label>
              <br></br>
              <input
                type="text"
                className="shadow appearance-none border rounded w-full py-2 px-3 xxtext-blue-700 bg-gray-100 mt-2 focus:outline-none focus:shadow-outline "
                placeholder="Enter Company Name"
                id="company"
                name="Company"
                value={company}
                disabled
              />
            </div>
            <div className="col-span-2 text-left">
              <label className="xtext-blue-900" htmlFor="project-location">
                Location
              </label>
              <input
                type="text"
                className="shadow appearance-none border rounded w-full py-2 px-3 xtext-blue-700 bg-gray-100 mt-2 focus:outline-none focus:shadow-outline"
                id="project-location"
                placeholder="Project Location"
                name="project-location"
                value={location}
                disabled
              />
            </div>
            <div className="col-span-2 text-left">
              <label className="xtext-blue-900" htmlFor="contract-sum">
                Scope
              </label>
              <textarea
                className="shadow appearance-none border rounded w-full py-2 px-3 xxtext-blue-700 bg-gray-100 mt-2 focus:outline-none focus:shadow-outline"
                placeholder="Project Scope"
                id=""
                name=""
                value={scope}
                disabled
              />
            </div>
            <div className="col-span-2 text-left">
              <label className="xtext-blue-900" htmlFor="cost-of-execution">
                Tag
              </label>
              <input
                type="text"
                className="shadow appearance-none border rounded w-full py-2 px-3 xxtext-blue-700 bg-gray-100 mt-2 focus:outline-none focus:shadow-outline"
                id="cost-of-execution"
                placeholder="Tag"
                name="tag"
                value={tag}
                disabled
              />
            </div>

            <div className="col-span-2 text-left">
              <label className="xtext-blue-900" htmlFor="contract-sum">
                Contract Sum
              </label>
              <input
                type="text"
                className="shadow appearance-none border rounded w-full py-2 px-3 xxtext-blue-700 bg-gray-100 mt-2 focus:outline-none focus:shadow-outline"
                id="contract-sum"
                placeholder="Contract Sum"
                name="contract-sum"
                value={contractSum}
                disabled
              />
            </div>
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
                onChange={(e) => setCostOfExecution(e.target.value)}
              />
            </div>

            <div className="col-span-2 text-left">
              <label className="xtext-blue-900" htmlFor="take-off-date">
                Take-Off Date
              </label>
              <br></br>
              <input
                type="date"
                className="shadow appearance-none border rounded w-full py-2 px-3 xxtext-blue-700 bg-gray-100 mt-2 focus:outline-none focus:shadow-outline"
                id="take-off-dater"
                name="take-off-dater"
                onChange={(e) => setTakeoffDate(e.target.value)}
                
              />
            </div>
            <div className="col-span-2 text-left">
              <label className="xtext-blue-900" htmlFor="payment-status">
                Project Duration
              </label>
              <select
                type="text"
                className="shadow xappearance-none border rounded w-full py-2 px-3 xxtext-blue-700 bg-gray-100 mt-2 focus:outline-none focus:shadow-outline"
                id="payment-status"
                name="payment-status"
                onChange={(e) => setDuration(e.target.value)}
                required
              >
                <option className="" value="1 month">
                  1 Month
                </option>
                <option className="" value="2 Months">
                  2 Months
                </option>
                <option className="" value="3 Months">
                  3 Months
                </option>
                <option className="" value="6 Months">
                  6 Months
                </option>
                <option className="" value="1 Year">
                  1 Year
                </option>
              </select>
            </div>
            <div className="col-span-4 text-left">
              <div>Attachement File (PF, .docx, jpg formats)</div>
              <div className="grid grid-cols-2 gap-4">
                {/* <div>
                  <label>Letter Of Award:</label>
                  <CustomFileUpload input_id="letter-of-award" />
                </div> */}
                <div>
                  <label>Purchase Order:</label>
                  <CustomFileUpload
                    input_id="purchase-order"
                    setPurchaseOrder={setPurchaseOrder}
                  />
                </div>
                <div>
                  <label>Work Order:</label>
                  <CustomFileUpload
                    input_id="work-order"
                    setWorkOrder={setWorkOrder}
                  />
                </div>
              </div>
            </div>
            <div className="col-span-4">
              <label>Remarks</label>
              <textarea
                className="shadow appearance-none border rounded w-full py-2 px-3 xxtext-blue-700 bg-gray-100 mt-2 focus:outline-none focus:shadow-outline"
                placeholder="Enter Project Remarks"
                id="purchase-order"
                name="purchase-order"
                onChange={(e) => setComment(e.target.value)}
              />
            </div>
            <button
              type="submit"
              className="md:col-start-4 col-start-3 md:col-span-1 col-span-2 shadow appearance-none border rounded w-full py-2 px-3 text-white button-solidx mt-2 focus:outline-none focus:shadow-outline"
              id="createProject-button"
              value="Create Project"
            >
              {" "}
              <FontAwesomeIcon
                icon={createProjectIcon}
                className={createProjectIconClassname}
              />{" "}
              {createProjectHtmlValue}{" "}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
