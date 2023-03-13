import React, {useState} from 'react';
import DashHeaderDetails from './DashHeaderDetails';
import EditBids from '../modals/EditDetails/EditBids'
import generic_logo from '../../../../assets/images/generic-company-logo.png'
import EditIcon from '../../../../assets/icons/Details/EditIcon';
import EditCompany from '../modals/EditDetails/EditCompany';
import DocumentCopyIcon from '../../../../assets/icons/Details/DocumentCopyIcon';
// import DashHeader from '../dash/DashHeader';

export default function CompanyDetails(props) {


    const [showEdit, setShowEdit] = useState("hidden");
    const handleShowEdit = () => {
        if(showEdit === "hidden"){ setShowEdit("") }
        else{setShowEdit("hidden")}
    }

    return(
        <>
            <EditCompany  show={showEdit} handleShow={handleShowEdit}/>
            <div className={`details-main-body bg-whitex ${props.show}`}>
                <DashHeaderDetails title={props.name} handleShow={props.handleShow}/>
            
                <div className='my-3 text-lg pl-3 font-bold txt-headr flex lg:hidden relative'>
                    {props.name}<span className={`flt-id xwarn`}>Pending</span>
                </div>
                <div className='bg-whitex w-full pr-5'>
                    <div className='details-summary gap-12'>
                        <span className='details-summary-item'>
                            <div className='txt-greyed-out'>RC Number</div>
                            <div className='font-bold'>TRF/NIG/31/2021</div>
                        </span>
                        <span className='details-summary-item'>
                            <div className='txt-greyed-out'>Address</div>
                            <div className='font-bold'>592 Harvest Path, Abuja</div>
                        </span>
                        <span className='details-summary-item'>
                            <div className='txt-greyed-out'>Email</div>
                            <div className='font-bold'>teremaxe@gmail.com</div>
                        </span>
                        <span className='details-summary-item'>
                            <div className='txt-greyed-out'>Contact</div>
                            <div className='font-bold'>090653254286</div>
                        </span>
                        <div className='details-summary-edit-btn'>
                            <button className='border-2 border- px-2 py-1 rounded inline-block mt-2 whitespace-nowrap' onClick={handleShowEdit}>
                                <EditIcon classx='fill-current inline'/> Edit Details
                            </button>
                        </div>
                    </div>
                    <div className='m-4 bg-whitex shadowp-7'>
                        <div className='col-span-5x details-desc grid grid-cols-3 gap-3 '>
                            <div className='col-span-3 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3'>
                                <div className=" mt-5">
                                    <div className='font-bold'>
                                        BANK ACCOUNT NAME
                                    </div>
                                    <div>
                                        OLIVIA POPE AND ASSOCIATES
                                    </div>
                                </div>
                                <div className=" mt-5">
                                    <div className='font-bold'>
                                        BANK ACCOUNT NUMBER
                                    </div>
                                    <div>
                                        31132312021
                                    </div>
                                </div>
                                <div className="xdescription mt-5">
                                    <div className='font-bold'>
                                        TAX IDENTIFICATION NUMBERS
                                    </div>
                                    <div>
                                        FIRS/TIN/32312021
                                    </div>
                                </div>
                                <div className="description mt-5">
                                    <div className='font-bold'>
                                        BANK NAME
                                    </div>
                                    <div>
                                        ZENITH BANK PLC
                                    </div>
                                </div>
                                <div className="description mt-5">
                                    <div className='font-bold'>
                                        ACCOUNT SORT CODE
                                    </div>
                                    <div>
                                        32312021
                                    </div>
                                </div>

                            </div>
                            <div className="description mt-5 md:col-span-2 col-span-3">
                                <div className='font-bold'>
                                    COMPANY REMARKS
                                </div>
                                <div>
                                    Accumsan nisl, amet non in id justo ultricies pharetra. Nec velit ante praesent ullamcorper accumsan, scelerisque in semper sit. Vel neque duis at gravida diam. Tristique aliquet morbi massa morbi ac adipiscing. Nisi, cras in viverra sit blandit justo nunc, rhoncus ut. Est, consequat mauris fusce eleifend eget. Dui ut molestie nulla id blandit ac mi. Ac, faucibus ridiculus proin laoreet vel quam et. 
                                </div>
                            </div>
                            <div className="xdescription mt-2 row-span-2 col-span-3 md:col-span-1">
                                <div className='font-bold'>
                                    FILES
                                </div>
                                <ul>
                                    <li className='flex'><DocumentCopyIcon classx="fill-current txt-bluex mr-3"/>TCC.docx</li>
                                    <li className='flex'><DocumentCopyIcon classx="fill-current txt-bluex mr-3"/>ITF.jpeng</li>
                                    <li className='flex'><DocumentCopyIcon classx="fill-current txt-bluex mr-3"/>NSITF.pdf</li>
                                    <li className='flex'><DocumentCopyIcon classx="fill-current txt-bluex mr-3"/>BPP.pdf</li>
                                    <li className='flex'><DocumentCopyIcon classx="fill-current txt-bluex mr-3"/>PENCOM.pdf</li>
                                    <li className='flex'><DocumentCopyIcon classx="fill-current txt-bluex mr-3"/>Sworn Affidavit.pdf</li>
                                    <li className='flex'><DocumentCopyIcon classx="fill-current txt-bluex mr-3"/>Bank Reference Letter.pdf</li>
                                    <li className='flex'><DocumentCopyIcon classx="fill-current txt-bluex mr-3"/>Company Profile .pdf</li>
                                    <li className='flex'><DocumentCopyIcon classx="fill-current txt-bluex mr-3"/>Signature.pdf</li>
                                </ul>
                            </div>
                        </div>
                       
                    </div>
                </div>
                
            </div>
        </>);
        }
