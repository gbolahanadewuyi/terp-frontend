import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import Logo from "../../../../assets/images/logo.png";
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import BuildingSvg from '../../../icons/dash-projects/SearchSvg';
import BidIconSvg from "../../../../assets/icons/dash-sidepanel/BidIconSvg";
import FolderOpenSvg from "../../../../assets/icons/dash-sidepanel/FolderOpenSvg";
import DashHomeIcon from "../../../../assets/icons/dash-sidepanel/DashHomeIcon";
import CompaniesIcon from "../../../../assets/icons/dash-sidepanel/CompaniesIcon";
import EquipmentsIcon from "../../../../assets/icons/dash-sidepanel/EquipmentsIcon";
import ExpensesIcon from "../../../../assets/icons/dash-sidepanel/ExpensesIcon";
import TasksIcon from "../../../../assets/icons/dash-sidepanel/TasksIcon";
import SettingsIcon from "../../../../assets/icons/dash-sidepanel/SettingsIcon";
import LogOutIcon from "../../../../assets/icons/dash-sidepanel/LogOutIcon";
import MeetingsIcon from "../../../../assets/icons/dash-sidepanel/MeetingIcon";
import VendorsIcon from "../../../../assets/icons/dash-sidepanel/VendorsIcon";
import StaffIcon from "../../../../assets/icons/dash-sidepanel/StaffIcon";
// import MenuIcon from '../../../../assets/icons/dash-sidepanel/MenuIcon';
import ArrowleftIcon from "../../../../assets/icons/tables/ArrowLeftIcon";

// temp
// import {useHistory} from 'react-router-dom'

export var regularx = "my-0 p-2 w-full txt-greyx block px-8 sidepanel-item";
export var activex =
  "shadow-lg my-0 p-4 w-full txt-bluex bg-colr block px-8 active-panel sidepanel-item";

export function closeNav() {
  let body_width = document.getElementsByTagName("body")[0].clientWidth;
  if (body_width <= "1024") {
    document.getElementsByClassName("sidepanel")[0].style.width = "0px";
    document.getElementsByClassName("sidepanel")[0].style.overflow = "hidden";
  }
}

export default function SidePanel({ active_selectr, updateUser }) {
  const handleLogout = () => {
    console.log("logout");
    localStorage.clear();
    updateUser({});
  };

  function openNav() {
    document.getElementsByClassName("sidepanel")[0].style.width = "240px";
  }

  function checkeResize() {
    let body_width = document.getElementsByTagName("body")[0].clientWidth;
    if (body_width >= "1024") {
      openNav();
      //  console.log(body_width)
    }
  }

  window.addEventListener("resize", checkeResize);

  useEffect(() => {
    // to close nav on rerender
    closeNav();
  }, []);

  return (
    <div className="fixed xcol-span-1 row-span-5 bg-whitex sidepanel z-10 shadow-lg xfixed">
      <div>
        <div className="absolute left-4 top-5 lg:hidden" onClick={closeNav}>
          <ArrowleftIcon classx="stroke-current txt-bluex" />
        </div>
        <div className="logo-sidepanel xmx-auto">
          {/* <div className='bg-blue-900 text-white text-center p-3'>Logo</div> */}
          <img src={Logo} alt="" />
        </div>
        <div className="text-left">
          <Link to="/" className={active_selectr.dash}>
            <DashHomeIcon classx="inline w-5 mr-3 stroke-current" />
            Dashboard
          </Link>
          <Link to="/bids" className={active_selectr.bids}>
            <BidIconSvg classx="inline w-5 mr-3 stroke-current" />
            Bids
          </Link>
          <Link to="/projects" className={active_selectr.projects}>
            <FolderOpenSvg classx="inline w-5 mr-3 stroke-current" />
            Projects
          </Link>
          
          <Link to="/companies" className={active_selectr.companies}>
            <CompaniesIcon classx="inline w-5 mr-3 stroke-current" />
            Companies
          </Link>
          <Link to="/tasks" className={active_selectr.tasks}>
            <TasksIcon classx="inline w-5 mr-3 stroke-current" />
            Tasks
          </Link>
          <Link to="/consumables" className={active_selectr.equipments}>
            <EquipmentsIcon classx="inline w-5 mr-3 stroke-current" />
            Consumables
          </Link>

          {/* <Link to="/dash_meetings" className={active_selectr.meetings}>
            <MeetingsIcon classx="inline w-5 mr-3 stroke-current" />
            Meetings
          </Link> */}

          {/* <Link to="/dash_vendors" className={active_selectr.vendors}>
            <VendorsIcon classx="inline w-5 mr-3 stroke-current" />
            Vendors
          </Link> */}
          <Link to="/expenses" className={active_selectr.expenses}>
            <ExpensesIcon classx="inline w-5 mr-3 stroke-current" />
            Expenses
          </Link>
          <Link to="/staff" className={active_selectr.staff}>
            <StaffIcon classx="inline w-5 mr-3 stroke-current" />
            Staffs
          </Link>
        </div>
        <div className="mt-10 absolutebottom-3 ">
          <Link to="/settings" className={active_selectr.settings}>
            <SettingsIcon classx="inline w-5 mr-3 stroke-current" />
            Settings
          </Link>

          <Link to="#" onClick={handleLogout} className={active_selectr.logout} >
            <LogOutIcon classx="inline w-5 mr-3 stroke-current" /> Log Out
          </Link>
          {/* <button onClick={handleLogout} className={active_selectr.settings}>
            <LogOutIcon classx="inline w-5 mr-3 stroke-current" />
            Log Out
          </button> */}
        </div>
      </div>
    </div>
  );
}
