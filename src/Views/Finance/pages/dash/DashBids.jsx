import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Toaster, toast } from "react-hot-toast";
import SidePanel from "../../components/menu/SidePanel";
import DashHeader from "../../components/header/DashHeader";
import { regularx, activex } from "../../components/menu/SidePanel";

import AddBid from "../../components/modals/Add/AddBid";
import SearchSvg from "../../../../assets/icons/dash-projects/SearchSvg";
import BidDetails from "../../components/view-details/BidDetails";
import MiniSidePanel from "../../components/menu/MiniSidePanel";
import BidCards from "../../components/cards/BidCards";
import LoadingScreen from './LoadingScreen';

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

export default function DashBids({ updateUser }) {
  const [bids, setBids] = useState([]);
  const [bidsCopy, setBidsCopy] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  var active_selectr = {
    dash: regularx,
    projects: regularx,
    bids: activex,
    companies:regularx,
    tasks: regularx,
    equipments :regularx,
    staff : regularx,
    meetings : regularx,
    expenses: regularx,
    vendors : regularx,
    settings: regularx,
    logout: regularx
  };

  const [show, setShow] = useState("hidden");
  const [showTile, setShowTile] = useState("");
  const [showDetails, setShowDetails] = useState("hidden");
  const [showDetailsId, setShowDetailsId] = useState();

  const handleShow = () => {
    if (show === "hidden") {
      setShow("");
    } else {
      setShow("hidden");
    }
  };
  const handleShowDetails = (id) => {
    if (showDetails === "hidden") {
      setShowDetailsId(id);
      setShowDetails("");
      setShowTile("hidden");
    } else {
      setShowDetails("hidden");
      setShowTile("");
    }
  };

  const getBid = async () => {
    const data = await getBids();
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
      setBids(data.data);
      setBidsCopy(data.data);
      
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
    let mounted = true;
    const data = await getBids();
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
      setIsLoading(false)
    } else if (data.status == 200) {
      if (mounted) {
        setBids(data.data);
        setBidsCopy(data.data);
        setIsLoading(false)
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

  function SearchFilter(typed_name) {
    setBids(
      bidsCopy.filter((e) => {
        return e.tender_title.toLowerCase().includes(typed_name);
      })
    );
  }

  return (
    <>
    
    <div>
      <AddBid
        show={show}
        handleShow={handleShow}
        getBids={getBid}
        updateUser={updateUser}
      />
      <div className={showDetails}>
        <MiniSidePanel
          active_selectr={active_selectr}
          updateUser={updateUser}
        />
        <BidDetails
          id={showDetailsId}
          show={showDetails}
          handleShow={handleShowDetails}
          getBids={getBid}
          updateUser={updateUser}
        />
      </div>
      <div className={`dashboardx grid md:grid-cols-7 grid-cols-5 ${showTile}`}>
        <SidePanel active_selectr={active_selectr} updateUser={updateUser} />
        <div
          className={`main-body col-span-7 row-span-5 bg-colr || xgrid xgrid-rows-10 xgap-2`}
        >
          <DashHeader title="Bids" />
          {isLoading ? <LoadingScreen/> : 
          <div className="contentx">
            <div className="my-auto text-lg pl-3 font-bold txt-headr md:hidden block">
              Bids
            </div>
            <div className="search-buttonx my-6 relative grid grid-cols-12 gap-2">
              <span className="absolute bottom-5 z-10 top-3 left-4 text-lg txt-darkblue3">
                <SearchSvg classx="stroke-current w-5 h-5" />
              </span>
              {/* <span className='absolute bottom-5 z-10 top-2 left-4 text-lg'><FontAwesomeIcon icon={["fas", "search"]} /></span> */}
              <input
                type="text"
                className="md:col-span-10 col-span-8 shadow appearance-none border rounded xw-9/12 py-2 pl-10 xtext-blue-700 bg-gray-100 focus:outline-none focus:shadow-outline "
                placeholder="Enter Bid Title"
                id="title-search"
                name="title-search"
                onChange={(e)=>SearchFilter(e.target.value)}
              />
              <button
                onClick={handleShow}
                className="md:col-span-2 col-span-4 bg-bluex xml-3 py-2 text-white rounded"
              >
                <FontAwesomeIcon icon={["fas", "plus"]} />
                <span className="ml-2 text-sm">New Bid</span>
              </button>
            </div>
            <BidCards
              data={bids}
              rowsPerPage={9}
              handleShowDetails={handleShowDetails}
            />
          </div>}
        </div>
      </div>
    </div>
    </>
  );
}
