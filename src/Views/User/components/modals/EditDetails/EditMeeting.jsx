import React, {useState} from 'react';
// import companieslist from '../../../../../tempDb/companieslist.json';
import Multiselect from 'multiselect-react-dropdown';
import LocationIcon from '../../../../../assets/icons/dash-meetings/LocationIcon';
import LinkIcon from '../../../../../assets/icons/dash-meetings/LinkIcon';
import people from '../../../../../tempDb/people'

export default function EditMeeting(props) {

    const [showOnlineOptions, setShowOnlineOptions] = useState("");
    const [showPhysicalOptions, setShowPhysicalOptions] = useState("hidden");

    const handleShowModeOptions = () => {
        if(document.getElementById('modex').value === "online"){setShowOnlineOptions(""); setShowPhysicalOptions("hidden")}
        else{setShowOnlineOptions("hidden"); setShowPhysicalOptions("")}
    }
    let people_x = [];
    people.map(e=> people_x.push(e.name))

  return( 
    <div className={props.show}>
        <div className="xback-board txt-dark-bluex">
            <div className="modal-inner-edit-x">
                <div className='modal-edit-head-v2 relative'>
                    <div className="w-full" onClick={props.handleShow}>
                        <svg className="xsvg-close absolute top-2 right-2" fill="#fff" xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 30 30" width="20px" height="20px">    <path d="M 7 4 C 6.744125 4 6.4879687 4.0974687 6.2929688 4.2929688 L 4.2929688 6.2929688 C 3.9019687 6.6839688 3.9019687 7.3170313 4.2929688 7.7070312 L 11.585938 15 L 4.2929688 22.292969 C 3.9019687 22.683969 3.9019687 23.317031 4.2929688 23.707031 L 6.2929688 25.707031 C 6.6839688 26.098031 7.3170313 26.098031 7.7070312 25.707031 L 15 18.414062 L 22.292969 25.707031 C 22.682969 26.098031 23.317031 26.098031 23.707031 25.707031 L 25.707031 23.707031 C 26.098031 23.316031 26.098031 22.682969 25.707031 22.292969 L 18.414062 15 L 25.707031 7.7070312 C 26.098031 7.3170312 26.098031 6.6829688 25.707031 6.2929688 L 23.707031 4.2929688 C 23.316031 3.9019687 22.682969 3.9019687 22.292969 4.2929688 L 15 11.585938 L 7.7070312 4.2929688 C 7.5115312 4.0974687 7.255875 4 7 4 z"/></svg>
                    </div>
                    <h1 className=' p-2 pl-5 edit-modal-headr-x'>Edit Meeting</h1>
                </div>
                
                <form className="grid grid-cols-6 gap-5 px-10 py-6">
                    <div className="col-span-6 text-left">
                        <label className='xtext-blue-900' htmlFor="meeting-title">Meeting Title</label>
                        <input type="text"className="shadow appearance-none border rounded w-full py-2 px-3 xxtext-blue-700 bg-gray-100 mt-2 focus:outline-none focus:shadow-outline" id="meeting-title" placeholder="Papaya Global check-in for the Project Onboarding Process" name='meeting-title'/>
                    </div>
                    <div className="col-span-6 text-left">
                        <label className='xtext-blue-900' htmlFor="meeting-scope">Meeting Scope</label>
                        <textarea className="shadow appearance-none border rounded w-full py-2 px-3 xxtext-blue-700 bg-gray-100 mt-2 focus:outline-none focus:shadow-outline" id="meeting-scope" placeholder="Accumsan nisl, amet non in id justo ultricies pharetra. Nec velit ante praesent ullamcorper accumsan, scelerisque in semper sit. Vel neque duis at gravida diam. Tristique aliquet morbi massa morbi ac adipiscing. Nisi, cras in viverra sit blandit justo nunc, rhoncus ut. Est, consequat mauris fusce eleifend eget. Dui ut molestie nulla id blandit ac mi." name='meeting-scope'></textarea>
                    </div>
                    <div className='col-span-6 grid grid-cols-7 gap-3'>
                        <div className="col-span-7 md:col-span-3 text-left"> 
                            <label className='text-blue-900' htmlFor="date">Date</label>
                            <input type="date" className="shadow appearance-none border rounded w-full py-2 px-3 bg-gray-100 mt-2 focus:outline-none focus:shadow-outline" id="date" placeholder="Enter Client Department" name='date'/>
                        </div>
                        <div className="col-span-7 md:col-span-2 grid grid-cols-2 gap-3">
                            <div className="col-span-1 text-left"> 
                                <label className='text-blue-900' htmlFor="start-time">Start Time</label>
                                <input type="time" className="shadow appearance-none border rounded w-full py-2 px-3 bg-gray-100 mt-2 focus:outline-none focus:shadow-outline" id="start-time" name='start-time'/>
                            </div>
                            <div className="col-span-1 text-left"> 
                                <label className='text-blue-900' htmlFor="end-time">End Time</label>
                                <input type="time" className="shadow appearance-none border rounded w-full py-2 px-3 bg-gray-100 mt-2 focus:outline-none focus:shadow-outline" id="end-time" placeholder="Enter Client Department" name='end-time'/>
                            </div>
                        </div>
                        <div className="col-span-7 md:col-span-2 text-left"> 
                            <label className='' htmlFor="meeting-status">Meeting Status</label>
                            <select type="text" className="shadow border rounded w-full py-2 px-3 bg-gray-100 mt-2 focus:outline-none focus:shadow-outline" id="meeting-status" placeholder="Enter Client Department" name='meeting-status'>
                                <option value="active">Active</option>
                                <option value="Pending">Pending</option>
                            </select>
                        </div>
                    </div>
                    <div className="col-span-6 text-left"> 
                        <label className='' htmlFor="initiated-by">Initiated By</label>
                        <select className="shadow border rounded w-full py-2 px-3 xtext-blue-700 bg-gray-100 mt-2 focus:outline-none focus:shadow-outline" id="initiated-by" placeholder="James Brown" name='initiated-by'>
                            {people.map((e)=>{return (<option key={e.id} value={e.name}>{e.name}</option>)})}
                        </select>
                    </div>
                    <div className="col-span-6 text-left">
                        <label className='xtext-blue-900' htmlFor="stock">Stock(Quantity)</label>
                        <Multiselect
                            isObject={false}
                            onKeyPressFn={function noRefCheck(){}}
                            onRemove={function noRefCheck(){}}
                            onSearch={function noRefCheck(){}}
                            onSelect={function noRefCheck(){}}
                            options={people_x}
                            className=''
                        />
                    </div>
                    <div className='col-span-6 grid grid-cols-4 gap-3'>
                        <div className="col-span-1 text-left">
                            <label className='' htmlFor="modex">Mode</label><br></br>
                            <select className="shadow border rounded w-full py-2 px-3  bg-gray-100 mt-2 focus:outline-none focus:shadow-outline" id='modex' name='modex' onClick={handleShowModeOptions}>
                                <option value="online">Online</option>
                                <option value="physicalx">Physical</option>
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
                    </div>
                    <input type="submit" className="md:col-start-5 col-start-3 md:col-span-2 col-span-4 shadow appearance-none py-2 px-3 button-solidx mt-2 focus:outline-none focus:shadow-outline" id='submit-button' value='Save Changes'/> 
                </form>
            </div>
        </div>
    </div>
  )}