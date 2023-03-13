import React, { useState, useEffect } from "react";

import SidePanel from "../../components/menu/SidePanel";
import { regularx, activex } from "../../components/menu/SidePanel";
import DashHeader from "../../components/header/DashHeader";

import AddConsumable from "../../components/modals/Add/AddConsumable";
import ConsumablesTable from "../../components/tables/Consumablestable";
import EditConsumable from "../../components/modals/EditDetails/EditConsumable";
import { toast } from "react-hot-toast";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import SearchSvg from "../../../../assets/icons/dash-projects/SearchSvg";
import LoadingScreen from "./LoadingScreen";

async function getEquipments() {
  //gettoken
  const userInfoObject = localStorage.getItem("user");
  const userInfo = JSON.parse(userInfoObject);
  return fetch(
    "https://us-central1-terp-338409.cloudfunctions.net/app/api/getequipments",
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    }
  ).then((data) => data.json());
}
export default function DashConsumables({ updateUser }) {
  const [isLoading, setIsLoading] = useState(true);
  const [equipments, setEquipments] = useState([]);
  const [equipmentsCopy, setEquipmentsCopy] = useState([]);
  const [detailsId, setDetailsId] = useState();

  var active_selectr = {
    dash: regularx,
    projects: regularx,
    bids: regularx,
    companies: regularx,
    tasks: regularx,
    equipments: activex,
    staff: regularx,
    meetings: regularx,
    expenses: regularx,
    vendors: regularx,
    settings: regularx,
    logout: regularx,
  };

  const [show, setShow] = useState("hidden");

  const handleShow = () => {
    if (show === "hidden") {
      setShow("");
    } else {
      setShow("hidden");
    }
  };
  const [showEdit, setShowEdit] = useState("hidden");

  const handleShowEdit = (id) => {
    if (showEdit === "hidden") {
      setDetailsId(id);
      setShowEdit("");
    } else {
      setShowEdit("hidden");
    }
  };

  function SearchFilter(typed_name) {
    setEquipments(
      equipmentsCopy.filter((e) => {
        return e.item.toLowerCase().includes(typed_name);
      })
    );
  }

  const getAllEquipments = async () => {
    const data = await getEquipments();
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
      setEquipments(data.data);
      setEquipmentsCopy(data.data);
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
  };

  useEffect(async () => {
    let mounted = true;
    const data = await getEquipments();
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
      if (mounted) {
        setEquipments(data.data);
        setEquipmentsCopy(data.data);
        setIsLoading(false);
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
  }, []);


  return (
    <>
      <>
        <AddConsumable
          show={show}
          handleShow={handleShow}
          updateUser={updateUser}
          getEquipments={getAllEquipments}
        />
        <EditConsumable
          id={detailsId}
          show={showEdit}
          handleShow={handleShowEdit}
          getEquipments={getAllEquipments}
        />
        <div className="dashboardx">
          <SidePanel active_selectr={active_selectr} updateUser={updateUser} />
          <div className="main-body bg-colr">
            <DashHeader title="Consumables" />

            <div className="contenty px-2 pr-5">
              <div className="my-auto text-lg pl-3 font-bold txt-headr md:hidden block">
                Consumables
              </div>
              {isLoading ? (
                <LoadingScreen />
              ) : (
                <>
                  <div className="search-buttonx xpx-2 my-6 relative grid grid-cols-12 gap-2">
                    <span className="absolute bottom-5 z-10 top-3 left-4 text-lg txt-darkblue3">
                      <SearchSvg classx="stroke-current w-5 h-5" />
                    </span>
                    {/* <span className='absolute bottom-5 z-10 top-2 left-4 text-lg'><FontAwesomeIcon icon={["fas", "search"]} /></span> */}
                    <input
                      type="text"
                      className="md:col-span-10 col-span-8 shadow appearance-none border rounded xw-9/12 py-2 pl-10 xtext-blue-700 bg-gray-100 focus:outline-none focus:shadow-outline "
                      placeholder="Enter Comapny Name"
                      id="title-search"
                      name="title-search"
                      onChange={(e)=>SearchFilter(e.target.value)}
                    />
                    <button
                      onClick={(e) => handleShow(e.target.value)}
                      className="md:col-span-2 col-span-4  button-solidx py-2 text-sm"
                    >
                      <FontAwesomeIcon icon={["fas", "plus"]} />
                      <span className="ml-2">New Consumable</span>
                    </button>
                  </div>
                  <ConsumablesTable
                    data={equipments}
                    rowsPerPage={10}
                    handleShow={handleShowEdit}
                  />
                </>
              )}
            </div>
          </div>
        </div>
      </>
    </>
  );
}
