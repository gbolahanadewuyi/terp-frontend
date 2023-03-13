import React, { useState } from 'react';

import SidePanel from '../../components/menu/SidePanel';
import MiniSidePanel from '../../components/menu/MiniSidePanel';
import {regularx, activex} from '../../components/menu/SidePanel';
import DashHeader from '../../components/header/DashHeader';

import AddProject from '../../components/modals/Add/AddProject';
import ProjectDetails from '../../components/view-details/ProjectDetails';
import ProjectCards from '../../components/cards/ProjectCards';

import projectsx from '../../../../tempDb/projects';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import SearchSvg from '../../../../assets/icons/dash-projects/SearchSvg';

export default function DashProjects() {
    var active_selectr = {
        dash: regularx,
        projects: activex,
        bids: regularx,
        companies: regularx,
        tasks: regularx,
        equipments : regularx,
        meetings : regularx,
        expenses: regularx,
        logout: regularx,
        settings: regularx
    }
    
    const [show, setShow] = useState("hidden");
    const [showTile, setShowTile] = useState("");
    const [showDetails, setShowDetails] = useState("hidden");
    const [Data, setData] = useState(projectsx);
    
    const handleShow = () => {
      if(show === "hidden"){ setShow("") }
      else{setShow("hidden")}
    }
    const handleShowDetails = () => {
        if(showDetails === "hidden"){ setShowDetails(""); setShowTile("hidden") }
        else{setShowDetails("hidden"); setShowTile("")}
    }

    function SearchFilter(){
      var typed_name = document.getElementById("title-search").value.toLowerCase();
      setData(projectsx.filter(e=>{
        return(e.name.toLowerCase().includes(typed_name))
      }))
    }


    
    // const [Projectslisst]
  return (
  <div>
    <AddProject show={show} handleShow={handleShow}/>
    <div className={showDetails}>
      <MiniSidePanel active_selectr={active_selectr}/>
      <ProjectDetails  name={projectsx[0].name} show={showDetails} handleShow={handleShowDetails}/>
    </div>
    <div className={`dashboardx grid grid-cols-7 ${showTile}`}>
      <SidePanel active_selectr={active_selectr}/>
      <div className={`main-body bg-colr ${showTile}`}>
        <DashHeader title='Projects'/>

        <div className="contentx">
          <div className='my-auto text-lg pl-3 font-bold txt-headr md:hidden block'>
            Projects
          </div>
          <div className='search-buttonx my-6 relative grid grid-cols-12 gap-2'>
            <span className='absolute bottom-5 z-10 top-3 left-4 text-lg txt-darkblue3'>
              <SearchSvg classx='stroke-current w-5 h-5'/>
            </span>
            {/* <span className='absolute bottom-5 z-10 top-2 left-4 text-lg'><FontAwesomeIcon icon={["fas", "search"]} /></span> */}
            <input type="text" className="md:col-span-10 col-span-8 shadow appearance-none border rounded py-2 pl-10 xtext-blue-700 bg-gray-100 focus:outline-none focus:shadow-outline " placeholder="Enter Project Title" id='title-search' name='title-search' onChange={SearchFilter}/>
            <button onClick={handleShow} className='md:col-span-2 col-span-4 bg-bluex xml-3 py-2 text-white rounded text-sm'><FontAwesomeIcon icon={['fas', 'plus']}/><span className='ml-2'>New Project</span></button>
          </div>
          <ProjectCards data={Data} rowsPerPage={6} handleShowDetails={handleShowDetails}/>


        </div>
      </div>
    </div>
  </div>
    );
}
