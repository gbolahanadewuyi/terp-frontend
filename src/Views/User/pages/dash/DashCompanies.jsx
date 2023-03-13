import React, { useState } from 'react';

import SidePanel from '../../components/menu/SidePanel';
import MiniSidePanel from '../../components/menu/MiniSidePanel';
import {regularx, activex} from '../../components/menu/SidePanel'
import DashHeader from '../../components/header/DashHeader';

import CompaniesTable from '../../components/tables/CompaniesTable';
import AddCompanies from '../../components/modals/Add/AddCompanies';
import CompanyDetails from '../../components/view-details/CompanyDetails';

import companiesx from '../../../../tempDb/companiesx';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import SearchSvg from '../../../../assets/icons/dash-projects/SearchSvg';

export default function DashCompanies() {
    var active_selectr = {
        dash: regularx,
        projects: regularx,
        bids: regularx,
        companies: activex,
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
    const [Data, setData] = useState(companiesx);
    
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
    setData(companiesx.filter(e=>{
      return(e.company_name.toLowerCase().includes(typed_name))
    }))
  }
     
  return (
    <>
      <AddCompanies show={show} handleShow={handleShow}/>
      <div className={showDetails}>
        <MiniSidePanel active_selectr={active_selectr}/>
        <CompanyDetails name={companiesx[0].company_name} show={showDetails} handleShow={handleShowDetails}/>
      </div>
      <div className={`dashboardx ${showTile}`}>
          <SidePanel active_selectr={active_selectr}/>
          <div className='main-body bg-colr'>
            <DashHeader title='Companies'/>

            <div className="contentx px-2pr-5txt-dark-bluex">
              <div className='my-auto text-lg pl-3 font-bold txt-headr md:hidden block'>
                companies
              </div>
              <div className='search-buttonx xpx-2 xmy-2 relative grid grid-cols-12 gap-2'>
                <span className='absolute bottom-5 z-10 top-3 left-4 text-lg txt-darkblue3'>
                  <SearchSvg classx='stroke-current w-5 h-5'/>
                </span>
                <input type="text" className="md:col-span-9 col-span-7 shadow appearance-none border rounded xw-9/12 py-2 pl-10 xtext-blue-700 bg-gray-100 focus:outline-none focus:shadow-outline " placeholder="Enter Comapny Name" id='title-search' name='title-search' onChange={SearchFilter}/>
                <button onClick={handleShow} className='md:col-span-3 col-span-5 bg-bluex xml-3 py-2 text-white rounded'><FontAwesomeIcon icon={['fas', 'plus']}/><span className='ml-2 text-sm'>New Company</span></button>
              </div>
            
              <CompaniesTable data={Data} rowsPerPage={10} handleShow={handleShowDetails}/>


            </div>
          </div>
        </div>
    </>
    );
}
