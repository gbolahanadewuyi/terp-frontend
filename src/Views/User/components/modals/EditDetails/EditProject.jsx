import React from 'react';
import CustomFileUpload from '../../dash/CustomFileUpload';

export default function EditProject(props) {

    // var naira_sign = '\u20a6'; z
    // var progress_style = {
    //     width: "90%"
    //   }
  return( 
    <div className={props.show}>
        <div className="xback-board txt-dark-bluex">
            <div className="modal-inner-edit-x2">
                <div className='modal-edit-head-v2 relative'>
                    <div className="w-full" onClick={props.handleShow}>
                        <svg className="xsvg-close absolute top-2 right-2" fill="#fff" xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 30 30" width="20px" height="20px">    <path d="M 7 4 C 6.744125 4 6.4879687 4.0974687 6.2929688 4.2929688 L 4.2929688 6.2929688 C 3.9019687 6.6839688 3.9019687 7.3170313 4.2929688 7.7070312 L 11.585938 15 L 4.2929688 22.292969 C 3.9019687 22.683969 3.9019687 23.317031 4.2929688 23.707031 L 6.2929688 25.707031 C 6.6839688 26.098031 7.3170313 26.098031 7.7070312 25.707031 L 15 18.414062 L 22.292969 25.707031 C 22.682969 26.098031 23.317031 26.098031 23.707031 25.707031 L 25.707031 23.707031 C 26.098031 23.316031 26.098031 22.682969 25.707031 22.292969 L 18.414062 15 L 25.707031 7.7070312 C 26.098031 7.3170312 26.098031 6.6829688 25.707031 6.2929688 L 23.707031 4.2929688 C 23.316031 3.9019687 22.682969 3.9019687 22.292969 4.2929688 L 15 11.585938 L 7.7070312 4.2929688 C 7.5115312 4.0974687 7.255875 4 7 4 z"/></svg>
                    </div>
                    <h1 className=' p-2 pl-5 edit-modal-headr-x'>Edit Project</h1>
                </div>
                
                <form className="grid grid-cols-4 grid-row-7 gap-4 px-10 py-6">
                    <div className="col-span-2 text-left">
                        <label className='xtext-blue-900' htmlFor="project-title">Project Title</label><br></br>
                        <input type="text" className="shadow appearance-none border rounded w-full py-2 px-3 xxtext-blue-700 bg-gray-100 mt-2 focus:outline-none focus:shadow-outline " placeholder="Enter Project Title" id='project-title' name='project-title'/>
                    </div>
                    <div className="col-span-2 text-left">
                        <label className='xtext-blue-900' htmlFor="client-name">Client</label>
                        <input type="text"className="shadow appearance-none border rounded w-full py-2 px-3 xxtext-blue-700 bg-gray-100 mt-2 focus:outline-none focus:shadow-outline" id="client-name" placeholder="Enter Client Name" name='client-name'/>
                    </div>
                    <div className="col-span-2 text-left">
                        <label className='xtext-blue-900' htmlFor="company">Company</label><br></br>
                        <input type="text" className="shadow appearance-none border rounded w-full py-2 px-3 xxtext-blue-700 bg-gray-100 mt-2 focus:outline-none focus:shadow-outline " placeholder="Enter Company Name" id='company' name='company'/>
                    </div>
                    <div className="col-span-2 text-left">
                        <label className='xtext-blue-900' htmlFor="project-location">Location</label>
                        <input type="text"className="shadow appearance-none border rounded w-full py-2 px-3 xtext-blue-700 bg-gray-100 mt-2 focus:outline-none focus:shadow-outline" id="project-location" placeholder="Enter Project Location" name='project-location'/>
                    </div>
                    <div className="col-span-2 text-left">
                        <label className='xtext-blue-900' htmlFor="contract-sum">Contract Sum</label>
                        <input type="text" className="shadow appearance-none border rounded w-full py-2 px-3 xxtext-blue-700 bg-gray-100 mt-2 focus:outline-none focus:shadow-outline" id="contract-sum" placeholder="Enter Contract Sum" name='contract-sum'/>
                    </div>
                    <div className="col-span-2 text-left">
                        <label className='xtext-blue-900' htmlFor="cost-of-execution">Cost of Execution</label>
                        <input type="text" className="shadow appearance-none border rounded w-full py-2 px-3 xxtext-blue-700 bg-gray-100 mt-2 focus:outline-none focus:shadow-outline" id="cost-of-execution" placeholder="Enter Cost of Execution" name='cost-of-execution'/>
                    </div>
                    <div className="md:col-span-1 col-span-4 text-left">
                        <label className='xtext-blue-900' htmlFor="bid-id">Bid ID</label><br></br>
                        <input type="text" className="shadow appearance-none border rounded w-full py-2 px-3 xxtext-blue-700 bg-gray-100 mt-2 focus:outline-none focus:shadow-outline" placeholder="TRF/NIG/31/2021" id='bid-id' name='bid-id'/>
                    </div>
                    <div className="col-span-4 md:col-span-1 text-left">
                        <label className='xtext-blue-900' htmlFor="payment-status">Payment Status</label>
                        <select type="text" className="shadow xappearance-none border rounded w-full py-2 px-3 xxtext-blue-700 bg-gray-100 mt-2 focus:outline-none focus:shadow-outline" id="payment-status" name="payment-status">
                            <option className='xpass' value="full-payment">Half Payment</option>
                            <option className='xwarn' value="half-payment">Full Payment</option>
                            <option className='xfail' value="not paid">No Payment</option>
                        </select>
                    </div>
                    <div className="md:col-span-1 col-span-4 text-left">
                        <label className='xtext-blue-900' htmlFor="amount-paid">Amount Paid</label><br></br>
                        <input type="text" className="shadow appearance-none border rounded w-full py-2 px-3 xxtext-blue-700 bg-gray-100 mt-2 focus:outline-none focus:shadow-outline" placeholder="₦ 784,324.34" id='amount-paid' name='amount-paid'/>
                    </div>
                    <div className="md:col-span-1 col-span-4 text-left">
                        <label className='xtext-blue-900' htmlFor="balance-owed">Balance Owed</label><br></br>
                        <input type="text" className="shadow appearance-none border rounded w-full py-2 px-3 xxtext-blue-700 bg-gray-100 mt-2 focus:outline-none focus:shadow-outline" placeholder="₦ 784,324.34" id='balance-owed' name='balance-owed'/>
                    </div>
                    <div className="md:col-span-1 col-span-4 text-left">
                        <label className='xtext-blue-900' htmlFor="take-off-date">Take-Off Date</label><br></br>
                        <input type="date" className="shadow appearance-none border rounded w-full py-2 px-3 xxtext-blue-700 bg-gray-100 mt-2 focus:outline-none focus:shadow-outline" id='take-off-date' name='take-off-date'/>
                    </div>
                    <div className="col-span-4 md:col-span-1 text-left">
                        <label className='xtext-blue-900' htmlFor="project-status">Project Status</label>
                        <select type="text" className="shadow xappearance-none border rounded w-full py-2 px-3 xxtext-blue-700 bg-gray-100 mt-2 focus:outline-none focus:shadow-outline" id="project-status" name="project-status">
                            <option className='xpass' value="full-payment">Active</option>
                            <option className='xwarn' value="half-payment">Pending</option>
                            <option className='xfail' value="not paid">Decommissioned</option>
                        </select>
                    </div>
                    <div className="col-span-2 md:col-span-1 text-left">
                        <label className='xtext-blue-900' htmlFor="payment-duration">Project Duration</label>
                        <select type="text" className="shadow xappearance-none border rounded w-full py-2 px-3 xxtext-blue-700 bg-gray-100 mt-2 focus:outline-none focus:shadow-outline" id="payment-duration" name="payment-duration">
                            <option className='' value="1 month">1 Month</option>
                            <option className='' value="2 Months">2 Months</option>
                            <option className='' value="3 Months">3 Months</option>
                            <option className='' value="6 Months">6 Months</option>
                            <option className='' value="1 Year">1 Year</option>
                        </select>
                    </div>
                    <div className="col-span-2 md:col-span-1 text-left">
                        <label className='xtext-blue-900' htmlFor="milestone">Milestone</label>
                        <select type="text" className="shadow xappearance-none border rounded w-full py-2 px-3 xxtext-blue-700 bg-gray-100 mt-2 focus:outline-none focus:shadow-outline" id="milestone" name="milestone">
                            <option className='' value="1 month">25%</option>
                            <option className='' value="50%">50%</option>
                            <option className='' value="75%">75%</option>
                            <option className='' value="80%">6 Months</option>
                            <option className='' value="90%">90%</option>
                        </select>
                    </div>
                    <div className="col-span-4 text-left">
                        <div>Attachement File (PF, .docx, jpg formats)</div>
                        <div className='grid grid-cols-3 gap-4'>
                            <div className='col-span-3 md:col-span-1'>
                                <label>Letter Of Award:</label>
                                <CustomFileUpload input_id="letter-of-award"/>
                            </div>
                            <div className='col-span-3 md:col-span-1'>
                                <label>Purchase Order:</label>
                                <CustomFileUpload input_id="purchase-order"/>
                            </div>
                            <div className='col-span-3 md:col-span-1'>
                                <label>Work Order:</label>
                                <CustomFileUpload input_id="work-order"/>
                            </div>
                            <div className='col-span-3 md:col-span-1'>
                                <label>Invoice:</label>
                                <CustomFileUpload input_id="invoice"/>
                            </div>
                            <div className='col-span-3 md:col-span-1'>
                                <label>Delivery Note:</label>
                                <CustomFileUpload input_id="delivery-note"/>
                            </div>
                            <div className='col-span-3 md:col-span-1'>
                                <label>Certificate of Completion:</label>
                                <CustomFileUpload input_id="certificate-of-completion"/>
                            </div>
                        </div>
                    </div>
                    <input type="submit" className="md:col-start-4 col-start-3 md:col-span-1 col-span-2 shadow appearance-none border rounded w-full py-2 px-3 text-white button-solidx mt-2 focus:outline-none focus:shadow-outline" id='submit-button' value='Save Changes'/>
                </form>
            </div>
        </div>
    </div>
  )}