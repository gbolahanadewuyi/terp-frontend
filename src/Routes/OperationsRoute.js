import React from 'react';
import { BrowserRouter as Router, Redirect, Route, Switch } from "react-router-dom";
// import { BrowserRouter as Router, Switch, Route, Link, Routes } from "react-router-dom";

import DashHome from '../Views/Operations/pages/dash/DashHome';
import DashProjects from '../Views/Operations/pages/dash/DashProjects';
import DashBids from '../Views/Operations/pages/dash/DashBids';
import DashCompanies from '../Views/Operations/pages/dash/DashCompanies';
import DashTasks from '../Views/Operations/pages/dash/DashTasks';
import DashConsumables from '../Views/Operations/pages/dash/DashConsumables';
// import DashExpenses from '../Views/Operations/pages/dash/DashExpenses';
// import DashMeetings from '../Views/Operations/pages/dash/DashMeetings';
// import DashVendors from '../Views/Operations/pages/dash/DashVendors';
// import DashStaff from '../Views/Operations/pages/dash/DashStaff';
import Settings from '../Views/Operations/pages/dash/Settings';

export default function Routez({ updateUser }) {
    return (
        <div>
            <Router>
                <Switch>
                    <Route exact path="/">
                        <DashHome updateUser={updateUser} />
                    </Route>
                    <Route path="/operations/projects">
                        <DashProjects updateUser={updateUser} />
                    </Route>
                    <Route path="/operations/bids" >
                        <DashBids updateUser={updateUser} />
                    </Route>
                    <Route path="/operations/companies">
                        <DashCompanies updateUser={updateUser} />
                    </Route>
                    <Route path="/operations/tasks">
                        <DashTasks updateUser={updateUser} />
                    </Route>
                    <Route path="/operations/consumables">
                        <DashConsumables updateUser={updateUser} />
                    </Route>
                    <Route path="/operations/settings" >
                        <Settings updateUser={updateUser} />
                    </Route>
                    <Route render={() => <Redirect to={{pathname: "/"}} />} />
                </Switch>
            </Router>
        </div>
    );
}
