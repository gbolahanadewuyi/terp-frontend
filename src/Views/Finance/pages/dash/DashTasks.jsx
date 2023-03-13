import React, { useState, useEffect } from "react";

import SidePanel from "../../components/menu/SidePanel";
import MiniSidePanel from "../../components/menu/MiniSidePanel";
import { regularx, activex } from "../../components/menu/SidePanel";
import DashHeader from "../../components/header/DashHeader";

import TasksTable from "../../components/tables/TasksTable";
import AddTask from "../../components/modals/Add/AddTask";
import TaskDetails from "../../components/view-details/TaskDetails";
import LoadingScreen from "./LoadingScreen";

// import tasks from '../../../../tempDb/tasks';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import SearchSvg from "../../../../assets/icons/dash-projects/SearchSvg";
import { toast } from "react-hot-toast";

async function getTasks() {
  //gettoken
  const userInfoObject = localStorage.getItem("user");
  const userInfo = JSON.parse(userInfoObject);
  return fetch(
    "https://us-central1-terp-338409.cloudfunctions.net/app/api/getstafftasks",
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    }
  ).then((data) => data.json());
}

export default function DashTasks({ updateUser }) {
  const [tasks, setTasks] = useState([]);
  const [tasksCopy, setTasksCopy] = useState([]);
  const [detailsId, setDetailsId] = useState();
  const [isLoading, setIsLoading] = useState(true);

  var active_selectr = {
    dash: regularx,
    projects: regularx,
    bids: regularx,
    companies: regularx,
    tasks: activex,
    equipments: regularx,
    meetings: regularx,
    vendors: regularx,
    staff: regularx,
    expenses: regularx,
    logout: regularx,
    settings: regularx,
  };

  const refreshGetTasks = async () => {
    const data = await getTasks();
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
      setTasks(data.data);
      setTasksCopy(data.data);
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
    const data = await getTasks();
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
        setTasks(data.data);
        setTasksCopy(data.data);
        if (data.data.length < 1){
          toast.success(`You have no tasks`, {
            duration: 5000,
            icon: "👏",
            position: "top-right",
            style: {
              borderRadius: "10px",
              background: "#333",
              color: "#fff",
            },
          });
        }
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

  const [show, setShow] = useState("hidden");
  const [showTile, setShowTile] = useState("");
  const [showDetails, setShowDetails] = useState("hidden");
  // const [Data, setData] = useState(tasks);

  const handleShow = () => {
    if (show === "hidden") {
      setShow("");
    } else {
      setShow("hidden");
    }
  };
  const handleShowDetails = (id) => {
    if (showDetails === "hidden") {
      setDetailsId(id);
      setShowDetails("");
      setShowTile("hidden");
    } else {
      setShowDetails("hidden");
      setShowTile("");
    }
  };

  function SearchFilter(typed_name) {
    setTasks(
      tasksCopy.filter((e) => {
        return e.name.toLowerCase().includes(typed_name);
      })
    );
  }

  return (
    <>
      <AddTask
        show={show}
        handleShow={handleShow}
        updateUser={updateUser}
        getTasks={refreshGetTasks}
      />
      <div className={showDetails}>
        <MiniSidePanel
          active_selectr={active_selectr}
          updateUser={updateUser}
        />
        <TaskDetails
          id={detailsId}
          show={showDetails}
          handleShow={handleShowDetails}
          updateUser={updateUser}
        />
      </div>
      <div
        className={`dashboardx grid md:grid-cols-7 grid-cols-5 overflow-hidden ${showTile}`}
      >
        <SidePanel active_selectr={active_selectr} updateUser={updateUser} />
        <div className={`main-body bg-colr`}>
          <DashHeader title="Tasks" />

          <div className="contenty px-2 pr-5">
            <div className="my-auto text-lg pl-3 font-bold txt-headr md:hidden block">
              Tasks
            </div>

            <>
              <div className="search-buttonx xpx-2 my-6 relative grid grid-cols-10 gap-2">
                <span className="absolute bottom-5 z-10 top-3 left-4 text-lg txt-darkblue3">
                  <SearchSvg classx="stroke-current w-5 h-5" />
                </span>

                <input
                  type="text"
                  className="md:col-span-8 col-span-6 shadow appearance-none border rounded xw-9/12 py-2 pl-10 xtext-blue-700 bg-gray-100 focus:outline-none focus:shadow-outline "
                  placeholder="Enter Task Name"
                  id="title-search"
                  name="title-search"
                  onChange={(e) => SearchFilter(e.target.value)}
                />
                <button
                  onClick={(e) => handleShow(e.target.value)}
                  className="md:col-span-2 col-span-4 button-solidx xpy-2 text-sm"
                >
                  <FontAwesomeIcon icon={["fas", "plus"]} />
                  <span className="ml-2">New Task</span>
                </button>
              </div>
              {isLoading ? (
                <LoadingScreen />
              ) : (
                <TasksTable
                  data={tasks}
                  rowsPerPage={10}
                  handleShow={handleShowDetails}
                />
              )}
            </>
          </div>
        </div>
      </div>
    </>
  );
}
