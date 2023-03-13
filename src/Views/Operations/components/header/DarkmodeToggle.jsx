import React, { useEffect, useState } from 'react';
import user from '../../../../tempDb/user';

export default function DarkmodeToggle() {

  const [checkedx, setCheckedx] = useState(true);
  function initial_theme_change(){
      if(user.mode === "dark"){
        setCheckedx(true);
      }
      else{
        setCheckedx(false);
      }
  }

  function changeTheme(){
    var body = document.getElementsByTagName("body")[0];
    var darkmode_switch = document.getElementById("darkmode-switch").checked;
    if(darkmode_switch){
      body.classList.add("darkmoded");
      user.mode = "dark";
      setCheckedx(true);

    }
    else{
      body.classList.remove("darkmoded");
      user.mode = "light";
      setCheckedx(false);
    }
  }

  useEffect(()=>{
    // var darkmode_switch = document.getElementById("darkmode-switch").checked;
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
   
        <div className='' >
          <span className="inline-block my-auto"><input type="checkbox" id="darkmode-switch" className="darkmode-switch"  onClick={changeTheme} onChange={()=>{}} checked={checkedx}/></span>
          <label className="pl-1" htmlFor="darkmode-switch">Dark Mode</label>
        </div>
  )
}
