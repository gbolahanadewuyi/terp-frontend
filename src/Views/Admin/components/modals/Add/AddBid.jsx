import React, { useState, useEffect, useRef } from "react";
import Multiselect from "multiselect-react-dropdown";
import CustomFileUpload from "../../dash/CustomFileUpload";
import FinancialsFileUpload from "../../dash/financialsFileUpload";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner, faPlus } from "@fortawesome/free-solid-svg-icons";
import { Toaster, toast } from "react-hot-toast";

async function createBid(credentials) {
  console.log(credentials);
  console.log(JSON.stringify(credentials));

  const userInfoObject = localStorage.getItem("user");
  const userInfo = JSON.parse(userInfoObject);
  console.log(userInfo);
  return fetch(
    "https://us-central1-terp-338409.cloudfunctions.net/app/api/bid",
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

export default function AddBid(props) {
  const [createBidHtmlValue, setCreateBidHtmlValue] = useState("Create Bid");
  const [createBidIcon, setCreateBidIcon] = useState(faPlus);
  const [createBidIconClassname, setCreateBidIconClassname] = useState();

  const [companylist, setCompanyList] = useState(); //stores companies list

  const [tenderTitle, setTenderTile] = useState();
  const [client, setClient] = useState();
  const [client_contract_management_department, setClientDep] = useState();
  const [projectLocation, setProjectLocation] = useState();
  const [tag, setTag] = useState("N/A");
  const [contractSum, setContractSum] = useState();
  const [tenderNo, setTenderNumber] = useState();
  const [deadline, setDeadline] = useState();
  const [dateSubmitted, setDateSubmitted] = useState();
  const [companies, setBiddingCompanies] = useState([]);
  const [winningCompany, setWinnigCompany] = useState();
  const [scope, setBidScope] = useState();
  const [rfq, setRfq] = useState();
  const [financials, setFinancials] = useState();

  // useEffect(async ()=>{
  //   let mounted = true;
  //   if(mounted){
  //     console.log(biddingCompanies)
  //   }
  // }, [biddingCompanies])

  useEffect(async () => {
    let mounted = true;
    const data = await getCompanies();
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
        setCompanyList(data.data);
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

  const biddingCompaniesFunction = (event) => {
    console.log(event);
    console.log(event.map((data) => data.name));
    setBiddingCompanies(event.map((data) => data.name)); //it is an async function
  };

  const removeBiddingCompanies = (event) => {
    console.log(event);
    // let filteredArray = biddingCompanies.filter(item => item !== event)
    setBiddingCompanies(event.map((data) => data.name));
    console.log(companies);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    document.getElementById("createBid-button").disabled = true;
    setCreateBidHtmlValue("Processing please wait....");
    setCreateBidIcon(faSpinner);
    setCreateBidIconClassname("spinner");
    const data = await createBid({
      tenderTitle,
      client,
      client_contract_management_department,
      projectLocation,
      contractSum,
      tenderNo,
      deadline,
      dateSubmitted,
      companies,
      winningCompany,
      scope,
      rfq,
      financials,
      tag,
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
      setCreateBidIconClassname("");
      setCreateBidIcon(faPlus);
      setCreateBidHtmlValue("Create Bid");
      document.getElementById("createBid-button").disabled = false;
    } else if (data.status == 200) {
      toast.success("New Bid Created!", {
        duration: 5000,
        icon: "👏",
        position: "top-right",
        style: {
          borderRadius: "10px",
          background: "#333",
          color: "#fff",
        },
      });
      document.getElementById("createBid-form").reset();
      setCreateBidIconClassname("");
      setCreateBidIcon(faPlus);
      setCreateBidHtmlValue("Create Bid");
      document.getElementById("createBid-button").disabled = false;
      props.handleShow();
      props.getBids();
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
      setCreateBidIconClassname("");
      setCreateBidIcon(faPlus);
      setCreateBidHtmlValue("Create Bid");
      document.getElementById("createBid-button").disabled = false;
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
            <h1 className=" p-2 pl-5 edit-modal-headr-x">Create Bid</h1>
          </div>
          <form
            className="grid grid-cols-4 grid-row-7 gap-4 px-5 py-6"
            id="createBid-form"
            onSubmit={handleSubmit}
          >
            <div className="col-span-2 text-left">
              <label className="xtext-blue-900" htmlFor="project-title">
                Tender Title
              </label>
              <br></br>
              <textarea
                type="text"
                onChange={(e) => setTenderTile(e.target.value)}
                className="shadow xappearance-none border rounded w-full py-2 px-3 xtext-blue-700 bg-gray-100 mt-2 focus:outline-none focus:shadow-outline"
                id="tender-title"
                name="tender-title"
                required
              ></textarea>
            </div>

            <div className="col-span-2 text-left">
              <label className="text-blue-900" htmlFor="client-name">
                Client
              </label>
              <input
                type="text"
                onChange={(e) => setClient(e.target.value)}
                className="shadow appearance-none border rounded w-full py-2 px-3 xtext-blue-700 bg-gray-100 mt-2 focus:outline-none focus:shadow-outline"
                id="client-name"
                placeholder="Enter Client Name"
                name="client-name"
                required
              />
            </div>
            <div className="col-span-2 text-left">
              <label className="text-blue-900" htmlFor="client-department">
                Client Department
              </label>
              <input
                type="text"
                onChange={(e) => setClientDep(e.target.value)}
                className="shadow appearance-none border rounded w-full py-2 px-3 xtext-blue-700 bg-gray-100 mt-2 focus:outline-none focus:shadow-outline"
                id="client-department"
                placeholder="Enter Client Department"
                name="client-department"
              />
            </div>
            <div className="col-span-2 text-left">
              <label className="text-blue-900" htmlFor="client-department">
                Project Location
              </label>
              <input
                type="text"
                onChange={(e) => setProjectLocation(e.target.value)}
                className="shadow appearance-none border rounded w-full py-2 px-3 xtext-blue-700 bg-gray-100 mt-2 focus:outline-none focus:shadow-outline"
                id="client-department"
                placeholder="Enter Client Department"
                name="client-department"
                required
              />
            </div>
            <div className="col-span-2 text-left">
              <label className="text-blue-900" htmlFor="contract-sum">
                Contract Sum
              </label>
              <input
                type="text"
                onChange={(e) => setContractSum(e.target.value)}
                className="shadow appearance-none border rounded w-full py-2 px-3 xtext-blue-700 bg-gray-100 mt-2 focus:outline-none focus:shadow-outline"
                id="contract-sum"
                placeholder="Ten Million, Two Hundred and Seven Thousand Naira "
                name="contract-sum"
                required
              />
            </div>
            <div className="col-span-2 text-left">
              <label className="text-blue-900" htmlFor="tender-number">
                Tender Number
              </label>
              <input
                type="text"
                onChange={(e) => setTenderNumber(e.target.value)}
                className="shadow appearance-none border rounded w-full py-2 px-3 xtext-blue-700 bg-gray-100 mt-2 focus:outline-none focus:shadow-outline"
                id="tender-number"
                placeholder="TRF/NIG/31/2021"
                name="tender-number"
              />
            </div>
            <div className="col-span-4 text-left">
              <label className="text-blue-900" htmlFor="clent-name">
                Bidding Companies
              </label>
              <Multiselect
                isObject={true}
                onRemove={(e) => removeBiddingCompanies(e)}
                // onKeyPressFn={function noRefCheck() {}}
                // onSearch={function noRefCheck() {}}
                onSelect={(e) => biddingCompaniesFunction(e)}
                options={companylist}
                displayValue="name"
                
              />
            </div>

            <div className="md:col-span-2 col-span-4 text-left">
              <label className="text-blue-900" htmlFor="winning-company">
                Winning Company
              </label>
              <br></br>
              <select
                className="shadow xappearance-none border rounded w-full py-2 px-3 xtext-blue-700 bg-gray-100 mt-2 focus:outline-none focus:shadow-outline"
                onChange={(e) => setWinnigCompany(e.target.value)}
                required
                // id="winning-company"
                // name="winning-company"
              >
                <option value="⬇️ Select Company ⬇️">
                  {" "}
                  -- Select a Comapany --{" "}
                </option>

                {companylist?.map((e) => (
                  <option key={e?.id} value={e?.name}>
                    {e?.name}
                  </option>
                ))}
                {/* <option value="">Jmnc</option> */}
              </select>
            </div>
            <div className="col-span-2 text-left">
              <label className="text-blue-900" htmlFor="date-submittd">
                Tag
              </label>
              <select
                className="shadow xappearance-none border rounded w-full py-2 px-3 xtext-blue-700 bg-gray-100 mt-2 focus:outline-none focus:shadow-outline"
                onChange={(e) => setTag(e.target.value)}
                // id="winning-company"
                // name="winning-company"
              >
                <option value="">-- Select a Tag --</option>
                <option value="Construction">Construction</option>
                <option value="Procurement">Procurement</option>
                <option value="Transmission"> Transmission</option>
                <option value="Repairs"> Repairs</option>
                <option value="Civil"> Civil</option>
              </select>
            </div>
            <div className="col-span-2 text-left">
              <label className="text-blue-900" htmlFor="date-submittd">
                Date Submitted
              </label>
              <input
                type="date"
                onChange={(e) => setDateSubmitted(e.target.value)}
                className="shadow appearance-none border rounded w-full py-2 px-3 xtext-blue-700 bg-gray-100 mt-2 focus:outline-none focus:shadow-outline"
                id="date-submittd"
                placeholder="2/3/2021"
                name="date-submittd"
                
              />
            </div>
            <div className="col-span-2 text-left">
              <label className="text-blue-900" htmlFor="deadline">
                Deadline
              </label>
              <input
                type="date"
                className="shadow appearance-none border rounded w-full py-2 px-3 xtext-blue-700 bg-gray-100 mt-2 focus:outline-none focus:shadow-outline"
                id="deadline"
                placeholder="2/3/2021"
                name="deadline"
                onChange={(e) => setDeadline(e.target.value)}
                
              />
            </div>
            <div className="md:col-span-4 col-span-3 text-left">
              <label className="text-blue-900" htmlFor="bid-scope">
                Bid Scope
              </label>
              <br></br>
              <textarea
                onChange={(e) => setBidScope(e.target.value)}
                className="shadow xappearance-none border rounded w-full py-2 px-3 xtext-blue-700 bg-gray-100 mt-2 focus:outline-none focus:shadow-outline"
                id="bid-scope"
                name="bid-scope"
                required
              ></textarea>
            </div>

            <div className="md:col-span-2 col-span-4 row-span-5 text-left">
              <label className="text-blue-900 w-full">
                Attachment Files (PDF, .docx, jpg formats)
              </label>
              <br></br>
              <div className="grid grid-cols-4 gap-3">
                <div className="col-span-4 text-left">
                  <label className="text-blue-900" htmlFor="date-submitted">
                    RFQ:
                  </label>
                  <br></br>
                  <CustomFileUpload input_id={"rfq-file"} setRfq={setRfq} />
                </div>
              </div>
            </div>
            <div className="col-span-2 text-left">
              <label className="text-blue-900" htmlFor="date-submitted">
                Financial Credentials:
              </label>
              <br></br>
              <br></br>
              <CustomFileUpload
                input_id={"financials-file"}
                setFinancials={setFinancials}
              />
            </div>
            <button
              type="submit"
              className="md:col-start-4 col-start-3 md:col-span-1 col-span-2 shadow appearance-none border rounded w-full py-2 px-3 button-solidx mt-2 focus:outline-none focus:shadow-outline"
              id="createBid-button"
              value="Create Bid"
            >
              <FontAwesomeIcon
                icon={createBidIcon}
                className={createBidIconClassname}
              />{" "}
              {createBidHtmlValue}{" "}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
