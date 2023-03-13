import {combineReducers} from 'redux';
import currentData from './currentData';
import currentDataBids from './currentDataBids';
import currentDataCompanies from './currentDataCompanies';
import currentDataTasks from './currentDataTasks';
import currentDataProjects from './currentDataProjects';
import currentDataEquipments from './currentDataEquipments';
import currentDataMeetings from './currentDataMeetings';
import currentDataVendors from './currentDataVendors';
import currentDataStaff from './currentDataStaff';
import counter from './counter';
import currentAuthPage from './currentAuthPage';


const allReducers = combineReducers({
    currentData, counter, currentDataBids,currentDataCompanies,currentDataTasks, currentDataProjects, currentDataEquipments, currentDataMeetings, currentDataVendors, currentDataStaff, currentAuthPage
});
export default allReducers