import React, {useState} from 'react';

import SidePanel from '../../components/menu/SidePanel';
import {regularx, activex} from '../../components/menu/SidePanel'
import DashHeader from '../../components/header/DashHeader';

import AddEquipment from '../../components/modals/Add/AddEquipment';
import EquipmentsTable from '../../components/tables/Eqiupmentstable';
import EditEquipment from '../../components/modals/EditDetails/EditEquipment';

import equipments from '../../../../tempDb/equipments';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import SearchSvg from '../../../../assets/icons/dash-projects/SearchSvg';

export default function DashEquipments() {
    var active_selectr = {
        dash: regularx,
        projects: regularx,
        bids: regularx,
        companies: regularx,
        tasks: regularx,
        equipments : activex,
        meetings : regularx,
        expenses: regularx,
        logout: regularx,
        settings: regularx
    }    

    const [show, setShow] = useState("hidden");
    const [Data, setData] = useState(equipments);

    const handleShow = () => {
        if(show === "hidden"){ setShow("") }
        else{setShow("hidden")}
    }
    const [showEdit, setShowEdit] = useState("hidden");
    const handleShowEdit = () => {
        if(showEdit === "hidden"){ setShowEdit("") }
        else{setShowEdit("hidden")}
    }

    function SearchFilter(){
      var typed_name = document.getElementById("title-search").value.toLowerCase();
      setData(equipments.filter(e=>{
        return(e.namex.toLowerCase().includes(typed_name))
      }))
    }

  return (
  <>
    <AddEquipment show={show} handleShow={handleShow}/>
    <EditEquipment show={showEdit} handleShow={handleShowEdit}/>
    <div className='dashboardx'>
      <SidePanel active_selectr={active_selectr}/>
      <div className='main-body bg-colr'>
        <DashHeader title='Equipments'/>

        <div className="contenty px-2 pr-5">
          <div className='my-auto text-lg pl-3 font-bold txt-headr md:hidden block'>
            Equipments
          </div>
          <div className='search-buttonx xpx-2 my-2 relative grid grid-cols-12 gap-2'>
            <span className='absolute bottom-5 z-10 top-3 left-4 text-lg txt-darkblue3'>
              <SearchSvg classx='stroke-current w-5 h-5'/>
            </span>
            {/* <span className='absolute bottom-5 z-10 top-2 left-4 text-lg'><FontAwesomeIcon icon={["fas", "search"]} /></span> */}
            <input type="text" className="md:col-span-10 col-span-8 shadow appearance-none border rounded xw-9/12 py-2 pl-10 xtext-blue-700 bg-gray-100 focus:outline-none focus:shadow-outline " placeholder="Enter Comapny Name" id='title-search' name='title-search' onChange={SearchFilter}/>
            <button onClick={handleShow} className='md:col-span-2 col-span-4  button-solidx py-2 text-sm'><FontAwesomeIcon icon={['fas', 'plus']}/><span className='ml-2'>New Equipment</span></button>
          </div>
          
          <EquipmentsTable data={Data} rowsPerPage={10} handleShow={handleShowEdit}/>


        </div>
      </div>
    </div>
  </>
    );
}
