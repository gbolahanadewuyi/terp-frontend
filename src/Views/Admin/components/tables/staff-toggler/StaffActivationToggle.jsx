import React, { useEffect, useState } from 'react';
import { toast } from "react-hot-toast";

async function activateAccount(id) { 
  console.log(id)

  const userInfoObject = localStorage.getItem("user");
  const userInfo = JSON.parse(userInfoObject);
  console.log(userInfo);
  try {
    const data = await fetch(
      `https://us-central1-terp-338409.cloudfunctions.net/app/api/activateaccount?id=${id}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userInfo.token}`,
        },
        // body: JSON.stringify(credentials),
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

async function deactivateAccount(id) { 
  console.log(id)

  const userInfoObject = localStorage.getItem("user");
  const userInfo = JSON.parse(userInfoObject);
  console.log(userInfo);
  try {
    const data = await fetch(
      `https://us-central1-terp-338409.cloudfunctions.net/app/api/deactivateaccount?id=${id}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userInfo.token}`,
        },
        // body: JSON.stringify(credentials),
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


export default function StaffActivationToggle(props) {

  const [status, setStatus] = useState()

  const [checkedxM, setCheckedxM] = useState('');
  function initial_theme_change(){
      if(props.data.accountStatus === "Active"){
        setCheckedxM(true);
      }
      else{
        setCheckedxM(false);
      }
  }

  

 async function changeStatus(){
    var activation_switch = document.getElementById(`staff-activation-toggle-${props.data.id}`).checked;
    if(activation_switch){
      console.log("Active")
      const data = await activateAccount(props.data.id);
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
        props.updateUser({});
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
        toast.success("Staff Account Activated!", {
          icon: "👏",
          position: "top-right",
          style: {
            borderRadius: "10px",
            background: "#333",
            color: "#fff",
          },
        });
        props.data.accountStatus = "Active";
        setCheckedxM(true);
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
    }
    else{
      console.log("Inactive")
      const data = await deactivateAccount(props.data.id);
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
        props.updateUser({});
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
        toast.success("Staff Account Deactivated!", {
          icon: "👏",
          position: "top-right",
          style: {
            borderRadius: "10px",
            background: "#333",
            color: "#fff",
          },
        });
        props.data.accountStatus = "Inactive";
        setCheckedxM(false);
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
  }}

  useEffect(()=>{initial_theme_change()},[])




  return (
    <div onClick={changeStatus}>
      <span className="inline-block toggle-button mr-auto"><input type="checkbox" id={`staff-activation-toggle-${props.data.id}`} className="staff-activation-toggle" onChange={()=>{}} checked={checkedxM}/></span>
      <label className="pl-1" htmlFor={`staff-activation-toggle-${props.data.id}`}>{props.data.accountStatus}</label>
    </div>
  )
}
