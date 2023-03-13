import React, {useState} from 'react';
import DashHeaderDetails from './DashHeaderDetails';
import EditBids from '../modals/EditDetails/EditBids'
import generic_logo from '../../../../assets/images/generic-company-logo.png'
import EditIcon from '../../../../assets/icons/Details/EditIcon';
import DocumentCopyIcon from '../../../../assets/icons/Details/DocumentCopyIcon';
// import DashHeader from '../dash/DashHeader';

export default function BidDetails(props) {


    const [showEdit, setShowEdit] = useState("hidden");
    const handleShowEdit = () => {
        if(showEdit === "hidden"){ setShowEdit("") }
        else{setShowEdit("hidden")}
    }

    return(
        <>
            <EditBids  show={showEdit} handleShow={handleShowEdit}/>
            <div className={`details-main-body bg-whitex ${props.show}`}>
                <DashHeaderDetails title={props.data.name} handleShow={props.handleShow}/>
                <div className='my-3 text-lg pl-3 font-bold txt-headr flex lg:hidden relative'>
                    {props.data.name}<span className={`flt-id xwarn`}>Pending</span>
                </div>
            
                <div className='bg-whitex w-full pr-5'>
                    <div className='details-summary gap-2x'>
                        <div className='details-summary-item'>
                            <div className='txt-greyed-out'>Tender No</div>
                            <div className='font-bold'>2359853</div>
                        </div>
                        <div className='details-summary-item'>
                            <div className='txt-greyed-out'>Client</div>
                            <div className='font-bold'>Stark Industries</div>
                        </div>
                        <div className='details-summary-item'>
                            <div className='txt-greyed-out'>Client Department</div>
                            <div className='font-bold'>Procurement Department</div>
                        </div>
                        <div className='details-summary-item'>
                            <div className='txt-greyed-out'>Contract Sum</div>
                            <div className='font-bold'>₦6,751,214.65</div>
                        </div>
                        <div className='details-summary-item'>
                            <div className='txt-greyed-out'>Winning Company</div>
                            <div className='font-bold'>Biffco Enterprises Ltd.</div>
                        </div>
                        <div className='details-summary-item'>
                            <div className='txt-greyed-out'>Date Submitted</div>
                            <div className='font-bold'>22 March 2022</div>
                        </div>
                        <div className='details-summary-edit-btn'>
                            <button className='border-2 border- px-2 py-1 rounded inline-block mt-2 whitespace-nowrap' onClick={handleShowEdit}>
                                <EditIcon classx='fill-current inline'/> Edit Details
                            </button>
                        </div>
                    </div>
                    <div className='m-4 bg-whitex shadow grid grid-cols-7 gap-12 p-7'>
                        <div className='col-span-7 lg:col-span-5 details-desc'>
                            <div className="description mt-5">
                                <div className='font-bold'>
                                    BID DESCRIPTION
                                </div>
                                <div>
                                    Accumsan nisl, amet non in id justo ultricies pharetra. Nec velit ante praesent ullamcorper accumsan, scelerisque in semper sit. Vel neque duis at gravida diam. Tristique aliquet morbi massa morbi ac adipiscing. Nisi, cras in viverra sit blandit justo nunc, rhoncus ut. Est, consequat mauris fusce eleifend eget. Dui ut molestie nulla id blandit ac mi. Ac, faucibus ridiculus proin laoreet vel quam et. Tristique ipsum blandit diam risus. Pellentesque posuere etiam tortor, lorem non, ultricies. Ullamcorper neque turpis ligula sit sed risus. Pellentesque in pellentesque sollicitudin phasellus ut. Semper nascetur egestas amet suspendisse sagittis nulla sed. 
                                </div>
                            </div>
                            <div className="description mt-5">
                                <div className='font-bold'>
                                    BID SCOPE
                                </div>
                                <div>
                                    Accumsan nisl, amet non in id justo ultricies pharetra. Nec velit ante praesent ullamcorper accumsan, scelerisque in semper sit. Vel neque duis at gravida diam. Tristique aliquet morbi massa morbi ac adipiscing. Nisi, cras in viverra sit blandit justo nunc, rhoncus ut. Est, consequat mauris fusce eleifend eget. Dui ut molestie nulla id blandit ac mi. Ac, faucibus ridiculus proin laoreet vel quam et. 
                                </div>
                            </div>
                            <div className="description mt-5">
                                <div className='font-bold'>
                                    BID REMARKS
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
                        <div className='side-content col-span-7 md:col-span-4 lg:col-span-2'>
                            <div>
                                BIDDING COMPANIES
                                <ul>
                                    {props.data.bidding_companies.map(e =>{
                                        return(
                                            <li className='relative mb-2' key={e}><img src={generic_logo} alt="company img" width={30} className="overflow-hidden object-cover rounded-full border-2 mr-3 absolute "/><div className='ml-9'>{e}</div></li>
                                        )
                                    })

                                    }
                                </ul>
                            </div>
                            <div className='mt-8'>
                                FILES
                                <ul>
                                    {props.data.uploaded_files.map(e=>{
                                        return(
                                            <li className='flex mb-1' key={e}><DocumentCopyIcon classx="fill-current txt-bluex mr-3"/>{e}</li>
                                        )
                                    })}
                                </ul>
                            </div>

                        </div>
                    </div>
                </div>
                
            </div>
        </>);
        }
