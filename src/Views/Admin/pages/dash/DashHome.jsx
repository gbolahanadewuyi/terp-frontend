import React, { useState, useEffect } from "react";

import SidePanel from "../../components/menu/SidePanel";
import { regularx, activex } from "../../components/menu/SidePanel";
import DashHeader from "../../components/header/DashHeader";

import HomeTableTab from "../../components/dash/dash_home/HomeTableTab";
import MyTasksWidget from "../../components/dash/dash_home/MyTasksWidget";
import BarChartx from "../../components/dash/dash_home/Charts/BarChartx";
import RadarChartx from "../../components/dash/dash_home/Charts/RadarChartx";
import GroupSummary from "../../components/dash/dash_home/GroupSummary";
import { Toaster, toast } from "react-hot-toast";
import LoadingScreen from "./LoadingScreen";

async function getDashboardData() {
  //gettoken
  const userInfoObject = localStorage.getItem("user");
  const userInfo = JSON.parse(userInfoObject);
  return fetch(
    "https://us-central1-terp-338409.cloudfunctions.net/app/api/dashboarddata",
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    }
  ).then((data) => data.json());
}

export default function DashHome({ updateUser }) {
  var active_selectr = {
    dash: activex,
    projects: regularx,
    bids: regularx,
    companies: regularx,
    tasks: regularx,
    equipments: regularx,
    staff: regularx,
    meetings: regularx,
    expenses: regularx,
    vendors: regularx,
    settings: regularx,
    logout: regularx,
  };

  const [dashboardData, setDashboardData] = useState();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(async () => {
    let mounted = true;
    const data = await getDashboardData();
    console.log(data);
    if (data.status == 403) {
      updateUser({});
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
      setIsLoading(false);
    } else if (data.status == 200) {
      if (mounted) {
        setDashboardData(data.data);
        setIsLoading(false);
      }
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
    return () => (mounted = false);
    // setBids(data)
  }, []);


  return (
    <>
      <div className="dashboardx">
        <SidePanel active_selectr={active_selectr} updateUser={updateUser} />
        <div className="main-body pr-3 bg-colr xbg-gray-200 || xgrid xgrid-rows-10 gap-2">
          <DashHeader title="Dashboard Overview" />

          <div className="contentx xrow-span-9 mt-3 px-2">
            <div className="my-auto text-lg pl-3 font-bold txt-headr md:hidden block">
              Dashboard Overview
            </div>
           {isLoading ? <LoadingScreen/> : 
            <><div className="mt-2">
                <GroupSummary datasummary={dashboardData} />
              </div><div className=" || grid grid-cols-3  gap-2 ">
                  <div className="md:col-span-2 col-span-3  || xgrid xgrid-row-7 gap-2">
                    <div className="mt-2">
                      <div className="bg-whitex rounded xchartr p-2 shadow">
                        <BarChartx datasummary={dashboardData} />
                      </div>
                      <HomeTableTab datasummary={dashboardData} />
                    </div>
                  </div>
                  <div className="right-column  md:col-span-1 col-span-3 || xgrid xgrid-rows-2 gap-2">
                    {/* <CalenderWidget/> */}
                    <div className="radar-chartx-container bg-whitex shadow rounded mt-2 xh-52">
                      {/* radar-chart */}
                      <h4 className=" p-2 pb-0 text-lg font-bold">Projects</h4>
                      <div className="radar-chartx px-auto xbg-slate-800 mx-auto">
                        <RadarChartx datasummary={dashboardData} />
                      </div>
                    </div>
                    <div className=""></div>
                    {/* <WeeklySchedule/> */}
                    <MyTasksWidget datasummary={dashboardData?.tasks} />
                  </div>
                </div></>}
          </div>
        </div>
      </div>
    </>
  );
}
