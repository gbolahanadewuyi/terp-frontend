import React, { useState, useEffect } from "react";
import SidePanel from "../../components/menu/SidePanel";
import DashHeader from "../../components/header/DashHeader";
import { regularx, activex } from "../../components/menu/SidePanel";
import { Toaster, toast } from "react-hot-toast";

import AddProject from "../../components/modals/Add/AddProject";
// import {userx} from './components/DashHeader'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import SearchSvg from "../../../../assets/icons/dash-projects/SearchSvg";
import ProjectDetails from "../../components/view-details/ProjectDetails";
import MiniSidePanel from "../../components/menu/MiniSidePanel";
import ProjectCards from "../../components/cards/ProjectCards";
import LoadingScreen from './LoadingScreen';

async function getProjects() {
  //gettoken
  const userInfoObject = localStorage.getItem("user");
  const userInfo = JSON.parse(userInfoObject);
  console.log(userInfo);
  try {
    const data = await fetch(
      "https://us-central1-terp-338409.cloudfunctions.net/app/api/getprojects",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userInfo.token}`,
        },
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

export default function DashProjects({ updateUser }) {
  const [projects, setProjects] = useState([]);
  const [projectsCopy, setProjectsCopy] = useState([])
  const [isLoading, setIsLoading] = useState(true);
  var active_selectr = {
    dash: regularx,
    projects: activex,
    bids: regularx,
    companies: regularx,
    tasks: regularx,
    equipments: regularx,
    staff: regularx,
    meetings: regularx,
    expenses: regularx,
    vendors: regularx,
    settings: regularx,
    logout: regularx,
  };
  var naira_sign = "\u20a6";

  const [show, setShow] = useState("hidden");
  const [showTile, setShowTile] = useState("");
  const [showDetails, setShowDetails] = useState("hidden");
  const [detailsId, setShowDetailsId] = useState();

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

  const getProject = async () => {
    const data = await getProjects();
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
      setProjects(data.data);
      setProjectsCopy(data.data)
      setIsLoading(false)
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
    const data = await getProjects();
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
      if (mounted) {
        setProjects(data.data);
        setProjectsCopy(data.data)
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
  }, []);

  function SearchFilter(typed_name) {
    // var typed_name = document.getElementById("title-search").value.toLowerCase();
    setProjects(
      projectsCopy.filter((e) => {
        return e.name.toLowerCase().includes(typed_name);
      })
    );
  }

  // const [Projectslisst]
  return (
    <>
   
    <div>
      <AddProject
        show={show}
        handleShow={handleShow}
        getProjects={getProject}
        updateUser={updateUser}
      />
      <ProjectDetails
        id={detailsId}
        show={showDetails}
        handleShow={handleShowDetails}
        getProjects={getProject}
        updateUser={updateUser}
      />
      <div className={`dashboardx grid grid-cols-7 ${showTile}`}>
        <SidePanel active_selectr={active_selectr} updateUser={updateUser} />
        <div className={`main-body bg-colr ${showTile}`}>
          <DashHeader title="Projects" />
          {isLoading ? <LoadingScreen/> : 
          <div className="contentx">
            <div className="my-auto text-lg pl-3 font-bold txt-headr md:hidden block">
              Projects
            </div>
            <div className="search-buttonx my-6 relative grid grid-cols-12 gap-2">
              <span className="absolute bottom-5 z-10 top-3 left-4 text-lg txt-darkblue3">
                <SearchSvg classx="stroke-current w-5 h-5" />
              </span>
              {/* <span className='absolute bottom-5 z-10 top-2 left-4 text-lg'><FontAwesomeIcon icon={["fas", "search"]} /></span> */}
              <input
                type="text"
                className="md:col-span-10 col-span-8 shadow appearance-none border rounded py-2 pl-10 xtext-blue-700 bg-gray-100 focus:outline-none focus:shadow-outline "
                placeholder="Enter Project Title"
                id="title-search"
                name="title-search"
                onChange={(e) => SearchFilter(e.target.value)}
              />
              <button
                onClick={handleShow}
                className="md:col-span-2 col-span-4 bg-bluex xml-3 py-2 text-white rounded text-sm"
              >
                <FontAwesomeIcon icon={["fas", "plus"]} />
                <span className="ml-2">New Project</span>
              </button>
            </div>
            <ProjectCards
              data={projects}
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
