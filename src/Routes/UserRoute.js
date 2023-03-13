import React from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
// import { BrowserRouter as Router, Switch, Route, Link, Routes } from "react-router-dom";

import DashHome from '../Views/User/pages/dash/DashHome';
import DashProjects from '../Views/User/pages/dash/DashProjects';
import DashBids from '../Views/User/pages/dash/DashBids';
import DashCompanies from '../Views/User/pages/dash/DashCompanies';
import DashTasks from '../Views/User/pages/dash/DashTasks';
import DashEquipments from '../Views/User/pages/dash/DashEquipments';
import DashExpenses from '../Views/User/pages/dash/DashExpenses';
import LogIn from '../Auth/LogIn';
import SignUp from '../Auth/SignUp';
// import '../Views/User/pages/dash/DashHomeStyle.css'

export default function UserRoutez() {
  return( 
  <div>
    <Router>
      <Switch>
        <Route exact path="/">
          <DashHome/>
        </Route>
        <Route path="/dash_projects">
          <DashProjects/>
        </Route>
        <Route path="/dash_bids" >
          <DashBids/>
        </Route>
        <Route path="/dash_companies">
          <DashCompanies/>
        </Route>
        <Route path="/dash_tasks">
          <DashTasks/>
        </Route>
        {/* <Route path="/dash_equipments">
          <DashEquipments/>
        </Route>
        <Route path="/dash_expenses">
          <DashExpenses/>
        </Route> */}
      </Switch>
    </Router>
  </div>
  );
}
