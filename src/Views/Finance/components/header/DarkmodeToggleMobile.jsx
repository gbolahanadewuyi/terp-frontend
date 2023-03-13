import React, { useEffect, useState } from 'react';
import user from '../../../../tempDb/user';

export default function DarkmodeToggleMobile() {

  const [checkedxM, setCheckedxM] = useState('');
  function initial_theme_change(){
      if(user.mode === "dark"){
        setCheckedxM(true);
      }
      else{
        setCheckedxM(false);
      }
  }

  function changeTheme(){
    var body = document.getElementsByTagName("body")[0];
    var darkmode_switch = document.getElementById("darkmode-switch-mobile").checked;
    if(darkmode_switch){
      body.classList.add("darkmoded");
      user.mode = "dark";
      setCheckedxM(true);

    }
    else{
      body.classList.remove("darkmoded");
      user.mode = "light";
      setCheckedxM(false);
    }
  }

  useEffect(()=>{
    // var darkmode_switch = document.getElementById("darkmode-switch-mobile").checked;
    var body = document.getElementsByTagName("body")[0];
    if(user.mode === "dark"){
      body.classList.add("darkmoded");
      // darkmode_switch = true;
      initial_theme_change()
    }
    else{
      body.classList.remove("darkmoded");
      // darkmode_switch = false;
      initial_theme_change()
    }
  },[])


  return (
   
        <div className=''   onClick={changeTheme}>
          <span className="inline-block my-auto"><input type="checkbox" id="darkmode-switch-mobile" className="darkmode-switch-mobile" onChange={()=>{}} checked={checkedxM}/></span>
          <label className="pl-1" htmlFor="darkmode-switch-mobile">Dark Mode</label>
        </div>
  )
}
