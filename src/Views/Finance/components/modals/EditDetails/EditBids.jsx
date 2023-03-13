import React, { useEffect, useState, useRef } from "react";
import Multiselect from "multiselect-react-dropdown";
import EditCustomFileUpload from "../../dash/EditCustomFileUpload";
import EditFinancialsFileUpload from "../../dash/EditFinancialsUpload";
import { toast } from "react-hot-toast";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner, faPlus } from "@fortawesome/free-solid-svg-icons";
import bidTemp from "../../../../../tempDb/bids_temp";

async function getCompanies() {
  //gettoken
  const userInfoObject = localStorage.getItem("user");
  const userInfo = JSON.parse(userInfoObject);
  return fetch(
    "https://us-central1-terp-338409.cloudfunctions.net/app/api/getcompanies",
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    }
  ).then((data) => data.json());
}

async function updateBid(credentials, id) {
  console.log(credentials);

  const userInfoObject = localStorage.getItem("user");
  const userInfo = JSON.parse(userInfoObject);
  console.log(userInfo);
  try {
    const data = await fetch(
      `https://us-central1-terp-338409.cloudfunctions.net/app/api/updateBid?id=${id}`,
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

export default function EditBids(props) {
  const [updateBidHtmlValue, setUpdateBidHtmlValue] = useState("Update Bid");
  const [updateBidIcon, setUpdateBidIcon] = useState(faPlus);
  const [updateBidIconClassname, setUpdateBidIconClassname] = useState();
  

  const [statuses, setStatuses] = useState(bidTemp.status)

  const [companies, setCompanies] = useState();

  const [id, setId] = useState("");
  const [tenderTitle, setTenderTile] = useState("");
  const [client, setClient] = useState("");
  const [client_contract_management_department, setClientDep] = useState("");
  const [projectLocation, setProjectLocation] = useState("");
  const [tag, setTag] = useState("");
  const [contractSum, setContractSum] = useState("");
  const [tenderNo, setTenderNumber] = useState("");
  const [deadline, setDeadline] = useState("");
  const [dateSubmitted, setDateSubmitted] = useState("");
  const [status, setStatus] = useState("");
  const [biddingcompanies, setBiddingCompanies] = useState("");

  const [selectedBiddingCompanies, setSelectedBiddingCompanies] = useState([]);

  const [winningCompany, setWinnigCompany] = useState("");
  const [scope, setBidScope] = useState("");
  const [rfq, setRfq] = useState("");
  const [financials, setFinancials] = useState([]);
  const [letterofaward, setLetterOfAward] = useState("");
  const [acceptanceletter, setAcceptanceLetter] = useState("");

  useEffect(async () => {
    setId(props?.id);
    setTenderTile(props?.details?.tender_title);
    setClient(props?.details?.client);
    setClientDep(props?.details?.client_contract_management_department);
    setProjectLocation(props.details?.location);
    setTag(props?.details?.tag);
    setContractSum(props?.details?.contractSum);
    setTenderNumber(props?.details?.tender_no);
    setDeadline(props?.details?.deadline);
    setDateSubmitted(props?.details?.date_submitted);
    setStatus(props?.details?.status);
    setBiddingCompanies(props?.details?.companies);

    //dropdown selected values
    setSelectedBiddingCompanies(
      props?.details?.companies.map((el) => ({ name: el }))
    );

    setWinnigCompany(props?.details?.winning_company);
    setBidScope(props?.details?.scope);
    setRfq(props?.details?.rfq);
    setFinancials(props?.details?.financials);
    setLetterOfAward(props?.details?.letterofaward);
    setAcceptanceLetter(props?.details?.acceptanceletter);
  }, [props.details, props.id]);

  useEffect(async () => {
    console.log(biddingcompanies);
  }, [biddingcompanies]);

  useEffect(async()=>{
    console.log(bidTemp)
     setStatuses(
       bidTemp?.status?.filter((e)=>{
         return e.status !== status
       })
     )
  },[status])

  useEffect(async () => {
    let mounted = true;
    const data = await getCompanies();
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
        setCompanies(
          data.data.filter((e) => {
            return e.name !== winningCompany;
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
  }, [winningCompany]);

  const biddingCompaniesFunction = (event) => {
    console.log(event);
    console.log(event.map((data) => data.name));
    setBiddingCompanies(event.map((data) => data.name)); //it is an async function
  };

  const removeBiddingCompanies = (event) => {
    console.log(event);
    // let filteredArray = biddingCompanies.filter(item => item !== event)
    setBiddingCompanies(event.map((data) => data.name));
    console.log(biddingcompanies);
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    document.getElementById("editBid-button").disabled = true;
    setUpdateBidHtmlValue("Processing please wait....");
    setUpdateBidIcon(faSpinner);
    setUpdateBidIconClassname("spinner");
    const data = await updateBid(
      {
        tenderTitle,
        client,
        client_contract_management_department,
        projectLocation,
        tag,
        contractSum,
        tenderNo,
        deadline,
        dateSubmitted,
        biddingcompanies,
        winningCompany,
        scope,
        rfq,
        financials,
        letterofaward,
        acceptanceletter,
        status,
      },
      id
    );
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

      setUpdateBidIconClassname("");
      setUpdateBidIcon(faPlus);
      setUpdateBidHtmlValue("Update Bid");
      document.getElementById("editBid-button").disabled = false;
    } else if (data.status == 200) {
      toast.success("Bid updated successfully!", {
        duration: 5000,
        icon: "👏",
        position: "top-right",
        style: {
          borderRadius: "10px",
          background: "#333",
          color: "#fff",
        },
      });
      document.getElementById("editBid-form").reset();
      setUpdateBidIconClassname("");
      setUpdateBidIcon(faPlus);
      setUpdateBidHtmlValue("Update Bid");
      document.getElementById("editBid-button").disabled = false;
      props.handleShow();
      props.getBidDetail(id);
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
      setUpdateBidIconClassname("");
      setUpdateBidIcon(faPlus);
      setUpdateBidHtmlValue("Update Bid");
      document.getElementById("editBid-button").disabled = false;
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
            <h1 className=" p-2 pl-5 edit-modal-headr-x">Edit Bid</h1>
          </div>

          <form
            className="grid grid-cols-4 xgrid-row-7 gap-4 px-10 py-6"
            onSubmit={handleSubmit}
            id="editBid-form"
          >
            <div className="col-span-4 text-left">
              <label className="xtext-blue-900" htmlFor="project-title">
                Tender Title
              </label>
              <br></br>
              <input
                type="text"
                value={tenderTitle}
                className="shadow appearance-none border rounded w-full py-2 px-3 xxtext-blue-700 bg-gray-100 mt-2 focus:outline-none focus:shadow-outline "
                placeholder="Enter Tender Title"
                id="tender-title"
                name="tender-title"
                onChange={(e) => setTenderTile(e.target.value)}
              />
            </div>

            <div className="col-span-2 text-left">
              <label className="xtext-blue-900" htmlFor="project-title">
                Tender No
              </label>
              <br></br>
              <input
                type="text"
                value={tenderNo}
                className="shadow appearance-none border rounded w-full py-2 px-3 xxtext-blue-700 bg-gray-100 mt-2 focus:outline-none focus:shadow-outline "
                placeholder="Enter Tender Title"
                id="tender-title"
                name="tender-title"
                onChange={(e) => setTenderNumber(e.target.value)}
              />
            </div>
            <div className="col-span-2 text-left">
              <label className="text-blue-900" htmlFor="client-name">
                Client
              </label>
              <input
                type="text"
                value={client}
                className="shadow appearance-none border rounded w-full py-2 px-3 xxtext-blue-700 bg-gray-100 mt-2 focus:outline-none focus:shadow-outline"
                id="client-name"
                placeholder="Enter Client Name"
                name="client-name"
                onChange={(e) => setClient(e.target.value)}
              />
            </div>
            <div className="col-span-2 text-left">
              <label className="text-blue-900" htmlFor="client-department">
                Client Department
              </label>
              <input
                type="text"
                value={client_contract_management_department}
                className="shadow appearance-none border rounded w-full py-2 px-3 xxtext-blue-700 bg-gray-100 mt-2 focus:outline-none focus:shadow-outline"
                id="client-department"
                placeholder="Enter Client Department"
                name="client-department"
                onChange={(e) => setClientDep(e.target.value)}
              />
            </div>
            <div className="col-span-2 text-left">
              <label className="text-blue-900" htmlFor="contract-sum">
                Contract Sum
              </label>
              <input
                type="text"
                value={contractSum}
                className="shadow appearance-none border rounded w-full py-2 px-3 xxtext-blue-700 bg-gray-100 mt-2 focus:outline-none focus:shadow-outline"
                id="contract-sum"
                placeholder="Ten Million, Two Hundred and Seven Thousand Naira "
                name="contract-sum"
                onChange={(e) => setContractSum(e.target.value)}
              />
            </div>
            <div className="col-span-2 text-left">
              <label className="text-blue-900" htmlFor="tender-number">
                Project Location
              </label>
              <input
                type="text"
                value={projectLocation}
                className="shadow appearance-none border rounded w-full py-2 px-3 xxtext-blue-700 bg-gray-100 mt-2 focus:outline-none focus:shadow-outline"
                id="tender-number"
                placeholder="TRF/NIG/31/2021"
                name="tender-number"
                onChange={(e) => setProjectLocation(e.target.value)}
              />
            </div>
            <div className="col-span-2 text-left">
              <label className="text-blue-900" htmlFor="tender-number">
                Tag
              </label>
              <input
                type="text"
                value={tag}
                className="shadow appearance-none border rounded w-full py-2 px-3 xxtext-blue-700 bg-gray-100 mt-2 focus:outline-none focus:shadow-outline"
                id="tender-number"
                placeholder="TRF/NIG/31/2021"
                name="tender-number"
                onChange={(e) => setTag(e.target.value)}
              />
            </div>
            <div className="col-span-4 text-left">
              <label className="text-blue-900" htmlFor="clent-name">
                Bidding Companies
              </label>
              <Multiselect
                isObject={true}
                onRemove={(e) => removeBiddingCompanies(e)}
                selectedValues={selectedBiddingCompanies}
                // onKeyPressFn={function noRefCheck() {}}
                // onSearch={function noRefCheck() {}}
                onSelect={(e) => biddingCompaniesFunction(e)}
                options={companies}
                displayValue="name"
              />
            </div>

            <div className="md:col-span-2 col-span-4 text-left">
              <label className="text-blue-900" htmlFor="winning-company">
                Winning Company
              </label>
              <br></br>
              <select
                className="shadow xappearance-none border rounded w-full py-2 px-3 xxtext-blue-700 bg-gray-100 mt-2 focus:outline-none focus:shadow-outline"
                id="winning-company"
                name="winning-company"
                onChange={(e) => setWinnigCompany(e.target.value)}
              >
                <option className="" value={winningCompany} selected>
                  {winningCompany}
                </option>
                {companies?.map((e) => (
                  <option key={e?.id} value={e?.name}>
                    {e?.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="col-span-2  text-left">
              <label className="text-blue-900" htmlFor="deadline">
                Deadline
              </label>
              <input
                type="date"
                value={deadline}
                className="shadow appearance-none border rounded w-full py-2 px-3 xxtext-blue-700 bg-gray-100 mt-2 focus:outline-none focus:shadow-outline"
                id="deadline"
                name="deadline"
                onChange={(e) => setDeadline(e.target.value)}
              />
            </div>

            <div className="col-span-2 text-left">
              <label className="text-blue-900" htmlFor="date-submittd">
                Date Submitted
              </label>
              <input
                type="date"
                value={dateSubmitted}
                className="shadow appearance-none border rounded w-full py-2 px-3 xxtext-blue-700 bg-gray-100 mt-2 focus:outline-none focus:shadow-outline"
                id="date-submittd"
                name="date-submittd"
                onChange={(e) => setDateSubmitted(e.target.value)}
              />
            </div>

            <div className="col-span-2 text-left">
              <label className="text-blue-900" htmlFor="date-submittd">
                Status
              </label>
              <select
                className="shadow xappearance-none border rounded w-full py-2 px-3 xxtext-blue-700 bg-gray-100 mt-2 focus:outline-none focus:shadow-outline"
                id=""
                name=""
                onChange={(e) => setStatus(e.target.value)}
              >
                <option className="" value={status}>
                  {status}
                </option>
                {statuses.map((e) => (
                  <option key={e?.id} value={e?.status}>
                    {e?.status}
                  </option>
                ))}
              </select>
            </div>

            <div className="col-span-4 text-left">
              <label className="text-blue-900" htmlFor="bid-scope">
                Scope
              </label>
              <br></br>
              <textarea
                value={scope}
                className="shadow xappearance-none border rounded w-full py-2 px-3 xxtext-blue-700 bg-gray-100 mt-2 focus:outline-none focus:shadow-outline"
                id="bid-scope"
                name="bid-scope"
                onChange={(e) => setBidScope(e.target.value)}
              ></textarea>
            </div>

            <div className="md:col-span-4 col-span-4 text-left">
              <label className=" w-full">
                Attachment Files (PDF, .docx, jpg formats)
              </label>
              <br></br>
              <div className="grid grid-cols-4 gap-3">
                <div className="col-span-3 md:col-span-1">
                  <label className="" htmlFor="rfq-file">
                    RFQ:
                  </label>
                  <br></br>
                  <EditCustomFileUpload
                    input_id="editrfq-file"
                    setRfq={setRfq}
                  />
                </div>
                <div className="col-span-2 md:col-span-1">
                  <label className="" htmlFor="fin-credentials-file">
                    Financial Credentials:
                  </label>
                  <EditCustomFileUpload
                    input_id="edit-financials-file"
                    setFinancials={setFinancials}
                  />
                </div>
                <div className="col-span-2 md:col-span-1">
                  <label className="" htmlFor="acceptance-letter">
                    Letter Of Award:
                  </label>
                  <EditCustomFileUpload
                    input_id="editletterOfAward"
                    setLetterOfAward={setLetterOfAward}
                  />
                </div>
                <div className="col-span-2 md:col-span-1">
                  <label className="" htmlFor="acceptance-letter">
                    Acceptance Letter:
                  </label>
                  <EditCustomFileUpload
                    input_id="editacceptanceLetter"
                    setAcceptanceLetter={setAcceptanceLetter}
                  />
                </div>
              </div>
            </div>
            <button
              type="submit"
              className="md:col-start-4 col-start-3 md:col-span-1 col-span-2 shadow appearance-none border rounded w-full py-2 px-3 button-solidx mt-2 focus:outline-none focus:shadow-outline"
              id="editBid-button"
              value="Save Changes"
            >
              {" "}
              <FontAwesomeIcon
                icon={updateBidIcon}
                className={updateBidIconClassname}
              />{" "}
              {updateBidHtmlValue}{" "}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
