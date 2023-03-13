import React from 'react';
import SidePanel from '../../components/menu/SidePanel';
import {regularx, activex} from '../../components/menu/SidePanel';
import DashHeader from '../../components/header/DashHeader';

export default function DashExpenses() {
    var active_selectr = {
        dash: regularx,
        projects: regularx,
        bids: regularx,
        companies: regularx,
        tasks: regularx,
        equipments : regularx,
        meetings : regularx,
        expenses: activex,
        logout: regularx,
        settings: regularx
    }    
  return (
    <div className='dashboardx grid md:grid-cols-7 grid-cols-5'>
    <SidePanel active_selectr={active_selectr}/>
    <div className='main-body col-span-7 row-span-5 bg-colr || grid grid-rows-10 gap-2'>
      <DashHeader title='Expenses'/>

      <div className="row-span-9 ||  grid grid-rows-10 gap-2">
        <div className='my-auto text-lg pl-3 font-bold txt-headr md:hidden block'>
          Expenses
        </div>

      </div>
    </div>
  </div>
    );
}
