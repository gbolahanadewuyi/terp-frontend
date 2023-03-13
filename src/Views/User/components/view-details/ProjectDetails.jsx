import React, {useState} from 'react';
import DashHeaderDetails from './DashHeaderDetails';
import EditIcon from '../../../../assets/icons/Details/EditIcon';
import EditProject from '../modals/EditDetails/EditProject';
import DocumentCopyIcon from '../../../../assets/icons/Details/DocumentCopyIcon';

export default function ProjectDetails(props) {


    const [showEdit, setShowEdit] = useState("hidden");
    const handleShowEdit = () => {
        if(showEdit === "hidden"){ setShowEdit("") }
        else{setShowEdit("hidden")}
    }
    var naira_sign = '\u20a6';    
    var temp_table = [
        {id:1, expense: 'Repair of Grinding and Shredding Equipment', amount: "972,231.00", date: '28 Feb 2021', category: "Cleaning & Maintenance"},
        {id:2, expense: 'Repair of Grinding and Shredding Equipment', amount: "972,231.00", date: '28 Feb 2021', category: "Cleaning & Maintenance"},
        {id:3, expense: 'Repair of Grinding and Shredding Equipment', amount: "972,231.00", date: '28 Feb 2021', category: "Cleaning & Maintenance"},
        {id:4, expense: 'Repair of Grinding and Shredding Equipment', amount: "972,231.00", date: '28 Feb 2021', category: "Cleaning & Maintenance"},
    ]    

    return(
        <>
            <EditProject  show={showEdit} handleShow={handleShowEdit}/>
            <div className={`details-main-body bg-whitex ${props.show}`}>
                <DashHeaderDetails title={props.name} handleShow={props.handleShow}/>
                <div className='my-3 text-lg pl-3 font-bold txt-headr flex lg:hidden relative'>
                    {props.name}<span className={`flt-id xwarn`}>Pending</span>
                </div>
            
                <div className='bg-whitex w-full pr-5'>
                    <div className='details-summary gap-1'>
                        <div className='details-summary-item'>
                            <div className='txt-greyed-out'>Bid ID</div>
                            <div className='font-bold'>2359853</div>
                        </div>
                        <div className='xmy-2 xflex-auto details-summary-item'>
                            <div className='txt-greyed-out'>Location</div>
                            <div className='font-bold text-wrap'>Number 21, Joseph Ali street, Ikoyi, Lagos State.</div>
                        </div>
                        <div className='details-summary-item'>
                            <div className='txt-greyed-out'>Client Department</div>
                            <div className='font-bold'>Procurement Department</div>
                        </div>
                        <div className='details-summary-item'>
                            <div className='txt-greyed-out'>Client</div>
                            <div className='font-bold'>Stark Industries</div>
                        </div>
                        <div className='details-summary-item'>
                            <div className='txt-greyed-out'>Company</div>
                            <div className='font-bold'>Cyberdyne Systems Corp.</div>
                        </div>
                        <div className='details-summary-item'>
                            <div className='txt-greyed-out'>Take-Off Date</div>
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
                                    PROJECT DESCRIPTION
                                </div>
                                <div>
                                    Accumsan nisl, amet non in id justo ultricies pharetra. Nec velit ante praesent ullamcorper accumsan, scelerisque in semper sit. Vel neque duis at gravida diam. Tristique aliquet morbi massa morbi ac adipiscing. Nisi, cras in viverra sit blandit justo nunc, rhoncus ut. Est, consequat mauris fusce eleifend eget. Dui ut molestie nulla id blandit ac mi. Ac, faucibus ridiculus proin laoreet vel quam et. Tristique ipsum blandit diam risus. Pellentesque posuere etiam tortor, lorem non, ultricies. Ullamcorper neque turpis ligula sit sed risus. Pellentesque in pellentesque sollicitudin phasellus ut. Semper nascetur egestas amet suspendisse sagittis nulla sed. 
                                </div>
                            </div>
                            <div className="description mt-5">
                                <div className='font-bold'>
                                    PROJECT REMARKS
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
                            <div className='w-full'>
                                <span className='font-bold'>FINANCIAL DETAILS</span>
                                <ul>
                                    <li className='relative'><span className='txt-greyed-out'>Contract Sum</span><span className='absolute right-1 font-bold'>₦6,751,214.65</span></li>
                                    <li className='relative'><span className='txt-greyed-out'>Cost of Execution</span><span className='absolute right-1 font-bold'>₦6,751,214.65</span></li>
                                    <li className='relative'><span className='txt-greyed-out'>Payment Status</span><span className='absolute right-1 xwarn px rounded-2'>Half Payment</span></li>
                                    <li className='relative'><span className='txt-greyed-out'>Amount Paid</span><span className='absolute right-1 txt-pass'>₦6,751,214.65</span></li>
                                    <li className='relative'><span className='txt-greyed-out'>Balance Owed</span><span className='absolute right-1 txt-fail'>₦6,751,214.65</span></li>
                                    <li className='flex'></li>
                                </ul>
                            </div>
                            <div className='mt-8'>
                                <span className='font-bold'>FILES</span>
                                <ul>
                                    <li className='flex mt-2'><DocumentCopyIcon classx="fill-current txt-bluex mr-3"/>Letter Of Award.docx</li>
                                    <li className='flex mt-2'><DocumentCopyIcon classx="fill-current txt-bluex mr-3"/>Purchase Order.jpeng</li>
                                    <li className='flex mt-2'><DocumentCopyIcon classx="fill-current txt-bluex mr-3"/>Acceptance Letter.pdf</li>
                                </ul>
                            </div>

                        </div>
                    </div>
                    <div className='mx-4'>
                        PROJECT EXPENSES
                        <div className="flex flex-col">
                            <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                                <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                                    <div className="shadow overflow-hidden border-b border-gray-200 xsm:rounded-lg">
                                        <table className="min-w-full divide-y divide-gray-200 xtable-auto">
                                            <thead className="bg-gray-100 text-sm font-medium">
                                                <tr>
                                                    <th
                                                        scope="col"
                                                        className="px-6 py-3 text-left font-medium text-gray-500 xtracking-wider"
                                                    >
                                                        Expense
                                                    </th>
                                                    <th
                                                        scope="col"
                                                        className="px-6 py-3 text-left font-medium text-gray-500 tracking-wider"
                                                    >
                                                        Amoount
                                                    </th>
                                                    <th
                                                        scope="col"
                                                        className="px-3 py-3 text-center font-medium text-gray-500 tracking-wider"
                                                    >
                                                        Date
                                                    </th>
                                                    <th
                                                        scope="col"
                                                        className="px-6 py-3 text-left font-medium text-gray-500 tracking-wider"
                                                    >
                                                       Category
                                                    </th>
                                                </tr>
                                            </thead>
                                            <tbody className="bg-whitex divide-y divide-gray-200">
                                                {temp_table.map((e) => {
                                                return (
                                                <tr key={e.id}>
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        <div className="flex items-center">
                                                            {e.expense}
                                                        </div>
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-center">{naira_sign}{e.amount}</td>
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        <div className="text-sm text-gray-500">{e.date}</div>
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        {e.category}
                                                    </td>
                                                </tr>
                                                )})}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                    
                    </div>
                </div>
                
            </div>
        </>);
        }
