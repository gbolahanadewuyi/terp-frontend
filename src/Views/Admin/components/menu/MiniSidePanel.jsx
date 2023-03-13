import React from "react";
import { Link } from "react-router-dom";
import Logo_mini from "../../../../assets/images/logo-mini.png";
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import BuildingSvg from '../../../icons/dash-projects/SearchSvg';
import BidIconSvg from '../../../../assets/icons/dash-sidepanel/BidIconSvg';
import FolderOpenSvg from '../../../../assets/icons/dash-sidepanel/FolderOpenSvg';
import DashHomeIcon from '../../../../assets/icons/dash-sidepanel/DashHomeIcon';
import CompaniesIcon from '../../../../assets/icons/dash-sidepanel/CompaniesIcon';
import EquipmentsIcon from '../../../../assets/icons/dash-sidepanel/EquipmentsIcon';
import ExpensesIcon from '../../../../assets/icons/dash-sidepanel/ExpensesIcon';
import TasksIcon from '../../../../assets/icons/dash-sidepanel/TasksIcon';
import VendorsIcon from '../../../../assets/icons/dash-sidepanel/VendorsIcon';
import StaffIcon from '../../../../assets/icons/dash-sidepanel/StaffIcon';
import SettingsIcon from '../../../../assets/icons/dash-sidepanel/SettingsIcon';
import LogOutIcon from '../../../../assets/icons/dash-sidepanel/LogOutIcon';
import MeetingsIcon from '../../../../assets/icons/dash-sidepanel/MeetingIcon';

export var regularx = "my-0 p-3 w-full txt-greyx block px-8 sidepanel-item";
export var activex =
  "shadow-lg my-0 p-4 w-full txt-bluex bg-colr block px-8 active-panel sidepanel-item";
export default function MiniSidePanel({ active_selectr, updateUser }) {
  const handleLogout = () => {
    console.log("logout");
    localStorage.clear();
    updateUser({});
  };
  return (
  <div className="fixed xcol-span-1 row-span-5 bg-whitex mini-sidepanel z-10 shadow-lg xfixed hidden sm:block">
        <div className="mini-logo-sidepanel content">
          {/* <div className='bg-blue-900 text-white text-center p-3'>Logo</div> */}
          <img src={Logo_mini} alt='' width={30} className='block mx-auto'/>
        </div>
        <div className="text-left">
          <Link to="/" className={active_selectr.dash}><DashHomeIcon classx='inline w-5 mr-3 stroke-current'/></Link>
          <Link to="/bids" className={active_selectr.bids}><BidIconSvg classx='inline w-5 mr-3 stroke-current'/></Link>
          <Link to="/projects" className={active_selectr.projects}><FolderOpenSvg classx='inline w-5 mr-3 stroke-current'/></Link>
          <Link to="/companies" className={active_selectr.companies}><CompaniesIcon classx='inline w-5 mr-3 stroke-current'/></Link>
          <Link to="/tasks" className={active_selectr.tasks}><TasksIcon classx='inline w-5 mr-3 stroke-current'/></Link>
          <Link to="/consumables" className={active_selectr.equipments}><EquipmentsIcon classx='inline w-5 mr-3 stroke-current'/></Link>
          {/* <Link to="/dash_meetings" className={active_selectr.meetings}><MeetingsIcon classx='inline w-5 mr-3 stroke-current'/></Link>
          <Link to="/dash_vendors" className={active_selectr.meetings}><VendorsIcon classx='inline w-5 mr-3 stroke-current'/></Link> */}
          
          <Link to="/expenses" className={active_selectr.expenses}><ExpensesIcon classx='inline w-5 mr-3 stroke-current'/></Link>
          <Link to="/staff" className={active_selectr.meetings}><StaffIcon classx='inline w-5 mr-3 stroke-current'/></Link>
        </div>
        <div className='xmt-8 absolute bottom-3 '>
          <Link to="/settings" className={active_selectr.settings}><SettingsIcon classx='inline w-5 mr-3 stroke-current'/></Link>
          {/* <Link to="/" className={active_selectr.logout}><LogOutIcon classx='inline w-5 mr-3 stroke-current'/></Link> */}
          <button onClick={handleLogout} className={active_selectr.logout}>
          <LogOutIcon classx="inline w-5 mr-3 stroke-current" />
        </button>
        </div>
  </div>
  );
}
