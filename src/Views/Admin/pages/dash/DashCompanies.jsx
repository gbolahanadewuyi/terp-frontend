import React, { useState, useEffect } from "react";
import SidePanel from "../../components/menu/SidePanel";
import DashHeader from "../../components/header/DashHeader";
import { regularx, activex } from "../../components/menu/SidePanel";

import SearchSvg from "../../../../assets/icons/dash-projects/SearchSvg";
import CompaniesTable from "../../components/tables/CompaniesTable";
import AddCompanies from "../../components/modals/Add/AddCompanies";
import CompanyDetails from "../../components/view-details/CompanyDetails";
import MiniSidePanel from "../../components/menu/MiniSidePanel";
import { toast } from "react-hot-toast";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner, faAngleRight } from "@fortawesome/free-solid-svg-icons";
import LoadingScreen from "./LoadingScreen";

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

export default function DashCompanies({ updateUser }) {
  var active_selectr = {
    dash: regularx,
    projects: regularx,
    bids: regularx,
    companies: activex,
    tasks: regularx,
    equipments: regularx,
    meetings: regularx,
    vendors: regularx,
    staff: regularx,
    expenses: regularx,
    logout: regularx,
    settings: regularx,
  };

  const [show, setShow] = useState("hidden");
  const [showTile, setShowTile] = useState("");
  const [showDetails, setShowDetails] = useState("hidden");

  const [detailsId, setDetailsId] = useState(); //company id passed to details component

  const [companies, setCompanies] = useState([]);
  const [companiesCopy, setCompaniesCopy] = useState([]);

  const [isLoading, setIsloading] = useState(true);

  useEffect(async () => {
    let mounted = true;
    const data = await getCompanies();
    console.log(data);
    if (data.status == 403) {
      updateUser({});
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
      setIsloading(false);
      
    } else if (data.status == 200) {
      if (mounted) {
        setCompanies(data.data);
        setCompaniesCopy(data.data);
        setIsloading(false);
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

  const getAllCompanies = async () => {
    const data = await getCompanies();
    console.log(data);
    if (data.status == 403) {
      updateUser({});
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
      setCompanies(data.data);
      setCompaniesCopy(data.data);
      // setCompanyStatus(true)
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

  const handleShow = () => {
    if (show === "hidden") {
      setShow("");
    } else {
      setShow("hidden");
    }
  };
  const handleShowDetails = (id) => {
    if (showDetails === "hidden") {
      console.log(id);
      setDetailsId(id);
      setShowDetails("");
      setShowTile("hidden");
    } else {
      setShowDetails("hidden");
      setShowTile("");
      setDetailsId();
    }
  };

  

  function SearchFilter(typed_name) {
    console.log(typed_name)
    // var typed_name = document.getElementById("title-search").value.toLowerCase();
    setCompanies(
      companiesCopy.filter((e) => {
        return e.name.toLowerCase().includes(typed_name);
      })
    );
  }


  return (
    <>
      <AddCompanies
        show={show}
        handleShow={handleShow}
        updateUser={updateUser}
        getCompanies={getAllCompanies}
      />
      <div className={showDetails}>
        <MiniSidePanel active_selectr={active_selectr} updateUser={updateUser}/>
        <CompanyDetails
          show={showDetails}
          id={detailsId}
          getCompanies={getAllCompanies}
          handleShow={handleShowDetails}
        />
      </div>
      <div className={`dashboardx ${showTile}`}>
        <SidePanel active_selectr={active_selectr} updateUser={updateUser}/>
        <div className="main-body bg-colr">
          <DashHeader title="Companies" />

          {isLoading ? (
            <LoadingScreen />
          ) : (
            <div className="contentx px-2pr-5txt-dark-bluex">
              <div className="my-auto text-lg pl-3 font-bold txt-headr md:hidden block">
                Companies
              </div>
              {isLoading ? (
                <LoadingScreen />
              ) : (
                <>
                  <div className="search-buttonx xpx-2 my-6 relative grid grid-cols-12 gap-2">
                    <span className="absolute bottom-5 z-10 top-3 left-4 text-lg txt-darkblue3">
                      <SearchSvg classx="stroke-current w-5 h-5" />
                    </span>
                    <input
                      type="text"
                      className="md:col-span-9 col-span-7 shadow appearance-none border rounded xw-9/12 py-2 pl-10 xtext-blue-700 bg-gray-100 focus:outline-none focus:shadow-outline "
                      placeholder="Enter Comapny Name"
                      id="title-search"
                      name="title-search"
                      onChange={(e) => SearchFilter(e.target.value)}
                    />
                    <button
                      onClick={handleShow}
                      className="md:col-span-3 col-span-5 bg-bluex xml-3 py-2 text-white rounded"
                    >
                      <FontAwesomeIcon icon={["fas", "plus"]} />
                      <span className="ml-2 text-sm">New Company</span>
                    </button>
                  </div>
                  <CompaniesTable
                    data={companies}
                    rowsPerPage={10}
                    handleShowDetails={handleShowDetails}
                  />
                </>
              )}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
