import React, {useState} from 'react';
import Multiselect from 'multiselect-react-dropdown';
import LinkIcon from '../../../../../assets/icons/dash-meetings/LinkIcon';
import LocationIcon from '../../../../../assets/icons/dash-meetings/LocationIcon';
import people from '../../../../../tempDb/people'
// import MultiSelect from '../../multiselct-dropdown/MultiSelect';
// import '../../../'
// import React, { useState } from 'react';
// import { colourOptions } from './multiSelect/data';
// import { default as ReactSelect } from "react-select";
// import ProjectMembersAvatar from './ProjectMembersAvatar';
// import Multiselectr from './multiSelect/MultiSelectr';



export default function AddMeeting(props) {
    
    const [showOnlineOptions, setShowOnlineOptions] = useState("");
    const [showPhysicalOptions, setShowPhysicalOptions] = useState("hidden");
    const handleShowModeOptions = () => {
        if(document.getElementById('mode').value === "online"){setShowOnlineOptions(""); setShowPhysicalOptions("hidden")}
        else{setShowOnlineOptions("hidden"); setShowPhysicalOptions("")}
    }
    let people_x = [];
    people.map(e=> people_x.push(e.name))

  return( 
    <div className={props.show}>
        <div className="xback-board">
            <div className="modal-inner">
                <div className="w-full" onClick={props.handleShow}>
                        <svg className="xsvg-close float-right fill-current" xfill="#000000" xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 30 30" width="30px" height="30px">    <path d="M 7 4 C 6.744125 4 6.4879687 4.0974687 6.2929688 4.2929688 L 4.2929688 6.2929688 C 3.9019687 6.6839688 3.9019687 7.3170313 4.2929688 7.7070312 L 11.585938 15 L 4.2929688 22.292969 C 3.9019687 22.683969 3.9019687 23.317031 4.2929688 23.707031 L 6.2929688 25.707031 C 6.6839688 26.098031 7.3170313 26.098031 7.7070312 25.707031 L 15 18.414062 L 22.292969 25.707031 C 22.682969 26.098031 23.317031 26.098031 23.707031 25.707031 L 25.707031 23.707031 C 26.098031 23.316031 26.098031 22.682969 25.707031 22.292969 L 18.414062 15 L 25.707031 7.7070312 C 26.098031 7.3170312 26.098031 6.6829688 25.707031 6.2929688 L 23.707031 4.2929688 C 23.316031 3.9019687 22.682969 3.9019687 22.292969 4.2929688 L 15 11.585938 L 7.7070312 4.2929688 C 7.5115312 4.0974687 7.255875 4 7 4 z"/></svg>
                </div>
                        <h1 className=' p-2 pl-0 text-3xl text-left'>Add New Meeting</h1>
                <form className="grid grid-cols-4 xgrid-row-7 gap-4">
                        <div className="col-span-4 text-left">
                            <label className='text-blue-900' htmlFor="meeting-title">Meeting Title</label><br></br>
                            <input type="text" className="shadow appearance-none border rounded w-full py-2 px-3 bg-gray-100 mt-2 focus:outline-none focus:shadow-outline " placeholder="Enter Meeting Title" id='meeting-title' name='meeting-title'/>
                        </div>

                        <div className="col-span-4 text-left">
                            <label className='text-blue-900' htmlFor="meeting-scope">Meeting Scope</label>
                            <textarea type="text"className="shadow appearance-none border rounded w-full py-2 px-3 xtext-blue-700 bg-gray-100 mt-2 focus:outline-none focus:shadow-outline" id="meeting-scope" placeholder="Enter Meeting Scope" name='meeting-scope' rows={3}></textarea>
                        </div>
                        <div className='col-span-4 grid grid-cols-7 gap-3'>
                            <div className="md:col-span-3 col-span-4 text-left"> 
                                <label className='text-blue-900' htmlFor="date">Date</label>
                                <input type="date" className="shadow appearance-none border rounded w-full py-2 px-3 bg-gray-100 mt-2 focus:outline-none focus:shadow-outline" id="date" placeholder="Enter Client Department" name='date'/>
                            </div>
                            <div className="md:col-span-1 col-span-3 text-left"> 
                                <label className='text-blue-900' htmlFor="start-time">Start Time</label>
                                <input type="time" className="shadow appearance-none border rounded w-full py-2 px-3 bg-gray-100 mt-2 focus:outline-none focus:shadow-outline" id="start-time" name='start-time'/>
                            </div>
                            <div className="md:col-span-1 col-span-3 text-left"> 
                                <label className='text-blue-900' htmlFor="end-time">End Time</label>
                                <input type="time" className="shadow appearance-none border rounded w-full py-2 px-3 bg-gray-100 mt-2 focus:outline-none focus:shadow-outline" id="end-time" placeholder="Enter Client Department" name='end-time'/>
                            </div>
                            <div className="md:col-span-2 col-span-4 text-left"> 
                                <label className='' htmlFor="meeting-status">Meeting Status</label>
                                <select type="text" className="shadow border rounded w-full py-2 px-3 bg-gray-100 mt-2 focus:outline-none focus:shadow-outline" id="meeting-status" placeholder="Enter Client Department" name='meeting-status'>
                                    <option value="active">Active</option>
                                    <option value="Pending">Pending</option>
                                </select>
                            </div>
                        </div>
                        <div className="col-span-4 text-left"> 
                            <label className='' htmlFor="initiated-by">Initiated By</label>
                            <select className="shadow border rounded w-full py-2 px-3 bg-gray-100 mt-2 focus:outline-none focus:shadow-outline" id="initiated-by" placeholder="James Brown" name='initiated-by'>
                                {people.map((e)=>{return (<option key={e.id} value={e.name}>{e.name}</option>)})}
                            </select>
                        </div>
                        <div className="col-span-4 text-left">
                            <label className='' htmlFor="clent-name">Invited</label>
                            <Multiselect
                                isObject={false}
                                onKeyPressFn={function noRefCheck(){}}
                                onRemove={function noRefCheck(){}}
                                onSearch={function noRefCheck(){}}
                                onSelect={function noRefCheck(){}}
                                options={people_x}
                            />
                        </div>

                        <div className="col-span-1 text-left">
                            <label className='' htmlFor="mode">Mode</label><br></br>
                            <select className="shadow border rounded w-full py-2 px-3  bg-gray-100 mt-2 focus:outline-none focus:shadow-outline" id='mode' name='mode' onClick={handleShowModeOptions}>
                                <option value="online">Online</option>
                                <option value="physical">Physical</option>
                            </select>
                        </div>
                        <div className={`col-span-1 text-left ${showOnlineOptions}`}>
                            <label className='' htmlFor="platform">Platform</label><br></br>
                            <select type="text" className="shadow border rounded w-full py-2 px-3t bg-gray-100 mt-2 focus:outline-none focus:shadow-outline" id='platform' name='platform'>
                                <option value="google-meet">Google Meet</option>
                                <option value="zoom">Zoom</option>
                                <option value="skype">Skype</option>
                                <option value="microsoft-teams">Microsoft Teams</option>
                            </select>
                        </div>
                        <div className={`col-span-2 text-left relative ${showOnlineOptions}`}>
                            <label className='' htmlFor="meeting-link">Meeting Link</label><br></br>
                            <LinkIcon classx='fill-current absolute left-2 bottom-2'/>
                            <input type="text" className="shadow border rounded w-full py-2 px-3 pl-9 bg-gray-100 mt-2 focus:outline-none focus:shadow-outline" placeholder="https://zoom.us/j/2609218426" id='meeting-link' name='meeting-link'/>
                        </div>
                        <div className={`col-span-3 relative ${showPhysicalOptions}`}>
                            <label className='' htmlFor="location">Location</label><br></br>
                            <LocationIcon classx='stroke-current absolute left-2 bottom-2'/>
                            <input type="text" className="shadow border rounded w-full py-2 px-3 pl-9 bg-gray-100 mt-2 focus:outline-none focus:shadow-outline" placeholder="Conference/Presentation Room" id='location' name='location'/>
                        </div>
                        <input type="submit" className="md:col-start-4 col-start-3 md:col-span-1 col-span-2 shadow appearance-none border rounded w-full py-2 px-3 button-solidx mt-2 focus:outline-none focus:shadow-outline" value='Create Meeting'/>
                </form>
            </div>
        </div>
    </div>
        );
}
