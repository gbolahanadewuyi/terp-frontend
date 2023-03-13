import React from 'react';
import { BrowserRouter as Router, Redirect, Route, Switch } from "react-router-dom";
// import { BrowserRouter as Router, Switch, Route, Link, Routes } from "react-router-dom";

import DashHome from '../Views/Admin/pages/dash/DashHome';
import DashProjects from '../Views/Admin/pages/dash/DashProjects';
import DashBids from '../Views/Admin/pages/dash/DashBids';
import DashCompanies from '../Views/Admin/pages/dash/DashCompanies';
import DashTasks from '../Views/Admin/pages/dash/DashTasks';
import DashConsumables from '../Views/Admin/pages/dash/DashConsumables';
import DashExpenses from '../Views/Admin/pages/dash/DashExpenses';
import DashMeetings from '../Views/Admin/pages/dash/DashMeetings';
import DashVendors from '../Views/Admin/pages/dash/DashVendors';
import DashStaff from '../Views/Admin/pages/dash/DashStaff';
import Settings from '../Views/Admin/pages/dash/Settings';

export default function Routez({updateUser}) {
  return( 
  <div>
    <Router>
      <Switch>
        <Route exact path="/">
          <DashHome updateUser={updateUser}/>
        </Route>
        {/* <Route path="/sign_up">
          <SignUp />
        </Route> */}
        <Route path="/projects">
          <DashProjects updateUser={updateUser}/>
        </Route>
        <Route path="/bids" >
          <DashBids updateUser={updateUser}/>
        </Route>
        <Route path="/companies">
          <DashCompanies updateUser={updateUser}/>
        </Route>
        <Route path="/tasks">
          <DashTasks updateUser={updateUser}/>
        </Route>
        <Route path="/consumables">
          <DashConsumables updateUser={updateUser}/>
        </Route>
        {/* <Route path="/meetings">
          <DashMeetings updateUser={updateUser}/>
        </Route> */}
        <Route path="/staff">
          <DashStaff updateUser={updateUser}/>
        </Route>
        {/* <Route path="/vendors">
          <DashVendors/>
        </Route> */}
        <Route path="/expenses">
          <DashExpenses updateUser={updateUser}/>
        </Route>
        <Route path="/settings" >
          <Settings updateUser={updateUser}/>
        </Route>
        <Route render={() => <Redirect to={{pathname: "/"}} />} />
      </Switch>
    </Router>
  </div>
  );
}
