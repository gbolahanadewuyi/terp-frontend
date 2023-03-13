import React from 'react';
import { BrowserRouter as Router, Redirect, Route, Switch } from "react-router-dom";
// import { BrowserRouter as Router, Switch, Route, Link, Routes } from "react-router-dom";

import DashHome from '../Views/Finance/pages/dash/DashHome';
import DashProjects from '../Views/Finance/pages/dash/DashProjects';
import DashBids from '../Views/Finance/pages/dash/DashBids';
import DashCompanies from '../Views/Finance/pages/dash/DashCompanies';
import DashTasks from '../Views/Finance/pages/dash/DashTasks';
import DashConsumables from '../Views/Finance/pages/dash/DashConsumables';
import DashExpenses from '../Views/Finance/pages/dash/DashExpenses';

// import DashMeetings from '../Views/Finance/pages/dash/DashMeetings';
// import DashVendors from '../Views/Finance/pages/dash/DashVendors';
// import DashStaff from '../Views/Finance/pages/dash/DashStaff';
import Settings from '../Views/Finance/pages/dash/Settings';

export default function Routez({ updateUser }) {
    return (
        <div>
            <Router>
                <Switch>
                    <Route exact path="/">
                        <DashHome updateUser={updateUser} />
                    </Route>
                    <Route path="/finance/projects">
                        <DashProjects updateUser={updateUser} />
                    </Route>
                    <Route path="/finance/bids" >
                        <DashBids updateUser={updateUser} />
                    </Route>
                    <Route path="/finance/companies">
                        <DashCompanies updateUser={updateUser} />
                    </Route>
                    <Route path="/finance/tasks">
                        <DashTasks updateUser={updateUser} />
                    </Route>
                    <Route path="/finance/consumables">
                        <DashConsumables updateUser={updateUser} />
                    </Route>
                    <Route path="/finance/expenses">
                        <DashExpenses updateUser={updateUser} />
                    </Route>
                    <Route path="/finance/settings" >
                        <Settings updateUser={updateUser} />
                    </Route>
                    <Route render={() => <Redirect to={{pathname: "/"}} />} />
                </Switch>
            </Router>
        </div>
    );
}
