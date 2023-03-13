import React, {useState} from 'react';
import DashHeaderDetails from './DashHeaderDetails';
import EditIcon from '../../../../assets/icons/Details/EditIcon';
import EditTask from '../modals/EditDetails/EditTask';
// import generic_logo from '../../../../assets/images/generic-company-logo.png'
// import DashHeader from '../dash/DashHeader';

export default function TaskDetails(props) {


    const [showEdit, setShowEdit] = useState("hidden");
    const handleShowEdit = () => {
        if(showEdit === "hidden"){ setShowEdit("") }
        else{setShowEdit("hidden")}
    }

    return(
        <>
            <EditTask  show={showEdit} handleShow={handleShowEdit}/>
            <div className={`details-main-body bg-whitex ${props.show}`}>
                <DashHeaderDetails title={props.name} handleShow={props.handleShow}/>
            
                <div className='my-3 text-lg pl-3 font-bold txt-headr flex lg:hidden relative'>
                    {props.name}<span className={`flt-id xwarn`}>Pending</span>
                </div>

                <div className='bg-whitex w-full pr-5'>
                    <div className='details-summary'>
                        <div className='details-summary-item'>
                            <div className='txt-greyed-out'>Initiated By</div>
                            <div className='font-bold'>James Brown</div>
                        </div>
                        <div className='details-summary-item'>
                            <div className='txt-greyed-out'>Assigned To </div>
                            <div className='font-bold'>Emmanuel Fayemi</div>
                        </div>
                        <div className='details-summary-item'>
                            <div className='txt-greyed-out'>Date Created</div>
                            <div className='font-bold'>22 March 2022</div>
                        </div>
                        <div className='details-summary-item'>
                            <div className='txt-greyed-out'>Due Date</div>
                            <div className='font-bold'>22 April 2022</div>
                        </div>
                        <div className='details-summary-edit-btn'>
                            <button className='border-2 border- px-2 py-1 rounded inline-block mt-2 whitespace-nowrap' onClick={handleShowEdit}>
                                <EditIcon classx='fill-current inline'/> Edit Details
                            </button>
                        </div>
                    </div>
                    <div className='m-4 bg-whitex shadow grid grid-cols-7 gap-12 p-7'>
                        <div className='col-span-7 md:col-span-5 details-desc'>
                            <div className="description mt-5">
                                <div className='font-bold'>
                                    TASK DESCRIPTION
                                </div>
                                <div>
                                    Accumsan nisl, amet non in id justo ultricies pharetra. Nec velit ante praesent ullamcorper accumsan, scelerisque in semper sit. Vel neque duis at gravida diam. Tristique aliquet morbi massa morbi ac adipiscing. Nisi, cras in viverra sit blandit justo nunc, rhoncus ut. Est, consequat mauris fusce eleifend eget. Dui ut molestie nulla id blandit ac mi. Ac, faucibus ridiculus proin laoreet vel quam et. Tristique ipsum blandit diam risus. Pellentesque posuere etiam tortor, lorem non, ultricies. Ullamcorper neque turpis ligula sit sed risus. Pellentesque in pellentesque sollicitudin phasellus ut. Semper nascetur egestas amet suspendisse sagittis nulla sed. 
                                </div>
                            </div>
                            <div className="description mt-5">
                                <div className='font-bold'>
                                    TASK SCOPE
                                </div>
                                <div>
                                    Accumsan nisl, amet non in id justo ultricies pharetra. Nec velit ante praesent ullamcorper accumsan, scelerisque in semper sit. Vel neque duis at gravida diam. Tristique aliquet morbi massa morbi ac adipiscing. Nisi, cras in viverra sit blandit justo nunc, rhoncus ut. Est, consequat mauris fusce eleifend eget. Dui ut molestie nulla id blandit ac mi. Ac, faucibus ridiculus proin laoreet vel quam et. 
                                </div>
                            </div>
                            <div className="description mt-5">
                                <div className='font-bold'>
                                    TASK REMARKS
                                </div>
                                <div>
                                    Accumsan nisl, amet non in id justo ultricies pharetra. Nec velit ante praesent ullamcorper accumsan, scelerisque in semper sit. Vel neque duis at gravida diam. Tristique aliquet morbi massa morbi ac adipiscing. Nisi, cras in viverra sit blandit justo nunc, rhoncus ut. Est, consequat mauris fusce eleifend eget. Dui ut molestie nulla id blandit ac mi. Ac, faucibus ridiculus proin laoreet vel quam et. 
                                </div>
                            </div>
                            <div className="description mt-5">
                                <div className='font-bold'>
                                    TAGS
                                </div>
                                <div>
                                    #construction #Abuja
                                </div>
                            </div>
                        </div>
                        <div className='side-content md:col-span-2 col-span-7'>
                            <div>
                                <div className='font-bold'>
                                    PEOPLE INVOLVED
                                </div>
                                <ul>
                                    <li className='flex'> Gbenga Durotimo</li>
                                    <li className='flex'> Osita Buhari</li>
                                    <li className='flex'> Khadijah Olawale</li>
                                </ul>
                            </div>

                        </div>
                    </div>
                </div>
                
            </div>
        </>);
        }
