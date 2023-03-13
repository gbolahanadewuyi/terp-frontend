import React, { useEffect, useState } from "react";

import SidePanel from "../../components/menu/SidePanel";
import MiniSidePanel from "../../components/menu/MiniSidePanel";
import { regularx, activex } from "../../components/menu/SidePanel";
import DashHeader from "../../components/header/DashHeader";

import StaffTable from "../../components/tables/StaffTable";
import AddCompanies from "../../components/modals/Add/AddCompanies";
import StaffDetails from "../../components/view-details/StaffDetails";
import { toast } from "react-hot-toast";

import staff from "../../../../tempDb/staff";

// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import SearchSvg from "../../../../assets/icons/dash-projects/SearchSvg";
import LoadingScreen from "./LoadingScreen";

async function getStaffs() {
  //gettoken
  const userInfoObject = localStorage.getItem("user");
  const userInfo = JSON.parse(userInfoObject);
  return fetch(
    "https://us-central1-terp-338409.cloudfunctions.net/app/api/getstaffs",
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    }
  ).then((data) => data.json());
}

export default function DashStaff({ updateUser }) {
  var active_selectr = {
    dash: regularx,
    projects: regularx,
    bids: regularx,
    companies: regularx,
    tasks: regularx,
    equipments: regularx,
    meetings: regularx,
    vendors: regularx,
    staff: activex,
    expenses: regularx,

    logout: regularx,
    settings: regularx,
  };

  const [show, setShow] = useState("hidden");
  const [showTile, setShowTile] = useState("");
  const [showDetails, setShowDetails] = useState("hidden");
  const [staffs, setStaffs] = useState([]);
  const [staffsCopy, setStaffsCopy] = useState([]);

  // loading screen after fetch
  const [isLoading, setIsLoading] = useState(true);

  useEffect(async () => {
    const data = await getStaffs();
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
      setIsLoading(false);
    } else if (data.status == 200) {
      setStaffs(data.data);
      setStaffsCopy(data.data);
      setIsLoading(false);
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
  }, []);

  const refreshStaffs = async () => {
    const data = await getStaffs();
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
      setStaffs(data.data);
      setStaffsCopy(data.data);
      // setIsLoading(false);
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
  const handleShowDetails = () => {
    if (showDetails === "hidden") {
      setShowDetails("");
      setShowTile("hidden");
    } else {
      setShowDetails("hidden");
      setShowTile("");
    }
  };

  function SearchFilter(typed_name) {
    setStaffs(
      staffsCopy.filter((e) => {
        return e.name.toLowerCase().includes(typed_name);
      })
    );
  }

  function dynamicSort(property) {
    var sortOrder = 1;
    if (property[0] === "-") {
      sortOrder = -1;
      property = property.substr(1);
    }
    return function (a, b) {
      /* next line works with strings and numbers,
       * and you may want to customize it to your needs
       */
      var result =
        a[property] < b[property] ? -1 : a[property] > b[property] ? 1 : 0;
      return result * sortOrder;
    };
  }

  function sortingHat(sortingProperty) {
    setStaffs(staff.sort(dynamicSort(sortingProperty)));
    //    useTable()
  }

  return (
    <>
      <AddCompanies show={show} handleShow={handleShow} />
      <div className={showDetails}>
        <MiniSidePanel
          active_selectr={active_selectr}
          updateUser={updateUser}
        />
        <StaffDetails show={showDetails} handleShow={handleShowDetails}  getStaffs={refreshStaffs}/>
      </div>
      <div className={`dashboardx ${showTile}`}>
        <SidePanel active_selectr={active_selectr} updateUser={updateUser} />
        <div className="main-body bg-colr">
          <DashHeader title="Staff" />

          {isLoading ? (
            <LoadingScreen />
          ) : (
            <div className="contentx px-2pr-5txt-dark-bluex">
              <div className="my-auto text-lg pl-3 font-bold txt-headr md:hidden block">
                Staff
              </div>
              <div className="search-buttonx xpx-2 my-6 relative grid grid-cols-12 gap-2">
                <span className="absolute bottom-5 z-10 top-3 left-4 text-lg txt-darkblue3">
                  <SearchSvg classx="stroke-current w-5 h-5" />
                </span>
                <input
                  type="text"
                  className="col-span-12 shadow appearance-none border rounded xw-9/12 py-2 pl-10 text-blue-700 bg-gray-100 focus:outline-none focus:shadow-outline "
                  placeholder="Enter Staff
                  Name"
                  id="title-search"
                  name="title-search"
                  onChange={(e) => SearchFilter(e.target.value)}
                />
                {/* <button onClick={handleShow} className='md:col-span-3 col-span-5 bg-bluex xml-3 py-2 text-white rounded'><FontAwesomeIcon icon={['fas', 'plus']}/><span className='ml-2 text-sm'>New Company</span></button> */}
              </div>

              <StaffTable
                data={staffs}
                rowsPerPage={10}
                handleShow={handleShowDetails}
                sortingHat={sortingHat}
              />
            </div>
          )}
        </div>
      </div>
    </>
  );
}
