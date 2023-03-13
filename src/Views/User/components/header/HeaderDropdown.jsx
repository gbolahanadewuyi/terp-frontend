import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react';
import EmailIcon from '../../../../assets/icons/dash-header/EmailIcon';
import user from '../../../../tempDb/user';

export default function HeaderDropdown(props) {
  // temp
  var checkedx = "false";
  if(user.mode == "dark"){
    checkedx = "true";
  }
  else{
    checkedx = "false";
  }
// end

  function changeTheme(){
    var body = document.getElementsByTagName("body")[0];
    var darkmode_switch = document.getElementById("darkmode-switch").checked;
    if(darkmode_switch){
      body.classList.add("darkmoded");
      user.mode = "dark";
      checkedx = "true";
    }
    else{
      body.classList.remove("darkmoded");
      user.mode = "light";
      checkedx = "false";
    }
    // console.log(darkmode_switch)
    // body.classList.toggle("darkmoded")
    // console.log(body)
  }

  useEffect(()=>{
    var darkmode_switch = document.getElementById("darkmode-switch").checked;
    var body = document.getElementsByTagName("body")[0];
    if(user.mode == "dark"){
      body.classList.add("darkmoded");
     darkmode_switch = "true";
    }
    else{
      body.classList.remove("darkmoded");
      darkmode_switch = "false";
    }
  })


  return (
    <ul className={`header-dropdown ${props.showDropdown}`}>
        <li className='md:hidden flex' onClick={props.handleShowMail}><EmailIcon classx='fill-current'/>Email</li>
        <li className='md:hidden block'><FontAwesomeIcon icon={['fas', 'bell']}/>Notification</li>
        <li className='relative pl-10'>
          <span className="inline-block my-auto"><input type="checkbox" id="darkmode-switch" className="darkmode-switch" onChange={changeTheme} xchecked={checkedx}/></span>
          
          <label className="pl-1" htmlFor="darkmode-switch">Dark Mode</label>
        </li>
    </ul>
  )
}
