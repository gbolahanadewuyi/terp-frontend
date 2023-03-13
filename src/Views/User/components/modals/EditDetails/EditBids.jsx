import React from 'react';
import companieslist from '../../../../../tempDb/companieslist.json';
import Multiselect from 'multiselect-react-dropdown';
import CustomFileUpload from '../../dash/CustomFileUpload';

export default function EditBids(props) {

    // var naira_sign = '\u20a6'; z
    // var progress_style = {
    //     width: "90%"
    //   }
  return( 
    <div className={props.show}>
        <div className="xback-board txt-dark-bluex">
            <div className="modal-inner-edit-x">
                <div className='modal-edit-head-v2 relative'>
                    <div className="w-full" onClick={props.handleShow}>
                        <svg className="xsvg-close absolute top-2 right-2" fill="#fff" xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 30 30" width="20px" height="20px">    <path d="M 7 4 C 6.744125 4 6.4879687 4.0974687 6.2929688 4.2929688 L 4.2929688 6.2929688 C 3.9019687 6.6839688 3.9019687 7.3170313 4.2929688 7.7070312 L 11.585938 15 L 4.2929688 22.292969 C 3.9019687 22.683969 3.9019687 23.317031 4.2929688 23.707031 L 6.2929688 25.707031 C 6.6839688 26.098031 7.3170313 26.098031 7.7070312 25.707031 L 15 18.414062 L 22.292969 25.707031 C 22.682969 26.098031 23.317031 26.098031 23.707031 25.707031 L 25.707031 23.707031 C 26.098031 23.316031 26.098031 22.682969 25.707031 22.292969 L 18.414062 15 L 25.707031 7.7070312 C 26.098031 7.3170312 26.098031 6.6829688 25.707031 6.2929688 L 23.707031 4.2929688 C 23.316031 3.9019687 22.682969 3.9019687 22.292969 4.2929688 L 15 11.585938 L 7.7070312 4.2929688 C 7.5115312 4.0974687 7.255875 4 7 4 z"/></svg>
                    </div>
                    <h1 className=' p-2 pl-5 edit-modal-headr-x'>Edit Bid</h1>
                </div>
                
                <form className="grid grid-cols-4 xgrid-row-7 gap-4 px-10 py-6">
                        <div className="col-span-4 text-left">
                            <label className='xtext-blue-900' htmlFor="project-title">Tender Title</label><br></br>
                            <input type="text" className="shadow appearance-none border rounded w-full py-2 px-3 xxtext-blue-700 bg-gray-100 mt-2 focus:outline-none focus:shadow-outline " placeholder="Enter Tender Title" id='tender-title' name='tender-title'/>
                        </div>

                        <div className="col-span-2 text-left">
                            <label className='text-blue-900' htmlFor="client-name">Client</label>
                            <input type="text"className="shadow appearance-none border rounded w-full py-2 px-3 xtext-blue-700 bg-gray-100 mt-2 focus:outline-none focus:shadow-outline" id="client-name" placeholder="Enter Client Name" name='client-name'/>
                        </div>
                        <div className="col-span-2 text-left"> 
                            <label className='text-blue-900' htmlFor="client-department">Client Department</label>
                            <input type="text"className="shadow appearance-none border rounded w-full py-2 px-3 xtext-blue-700 bg-gray-100 mt-2 focus:outline-none focus:shadow-outline" id="client-department" placeholder="Enter Client Department" name='client-department'/>
                        </div>
                        <div className="col-span-2 text-left"> 
                            <label className='text-blue-900' htmlFor="contract-sum">Contract Sum</label>
                            <input type="text"className="shadow appearance-none border rounded w-full py-2 px-3 xtext-blue-700 bg-gray-100 mt-2 focus:outline-none focus:shadow-outline" id="contract-sum" placeholder="Ten Million, Two Hundred and Seven Thousand Naira " name='contract-sum'/>
                        </div>
                        <div className="col-span-2 text-left"> 
                            <label className='text-blue-900' htmlFor="tender-number">Tender Number</label>
                            <input type="text"className="shadow appearance-none border rounded w-full py-2 px-3 xtext-blue-700 bg-gray-100 mt-2 focus:outline-none focus:shadow-outline" id="tender-number" placeholder="TRF/NIG/31/2021" name='tender-number'/>
                        </div>
                        <div className="col-span-4 text-left">
                            <label className='text-blue-900' htmlFor="clent-name">Bidding Companies</label>
                            <Multiselect
                                isObject={false}
                                onKeyPressFn={function noRefCheck(){}}
                                onRemove={function noRefCheck(){}}
                                onSearch={function noRefCheck(){}}
                                onSelect={function noRefCheck(){}}
                                options={companieslist}
                            />
                        </div>

                        <div className="md:col-span-2 col-span-4 text-left">
                            <label className='text-blue-900' htmlFor="winning-company">Winning Company</label><br></br>
                            <select className="shadow xappearance-none border rounded w-full py-2 px-3 xtext-blue-700 bg-gray-100 mt-2 focus:outline-none focus:shadow-outline" id='winning-company' name='winning-company'>
                                <option value="">Acme</option>
                                <option value="">Jmnc</option>
                            </select>
                        </div>
                        
                        <div className="col-span-2 md:col-span-1 text-left"> 
                            <label className='text-blue-900' htmlFor="date-submittd">Date Submitted</label>
                            <input type="date"className="shadow appearance-none border rounded w-full py-2 px-3 xtext-blue-700 bg-gray-100 mt-2 focus:outline-none focus:shadow-outline" id="date-submittd" placeholder="2/3/2021" name='date-submittd'/>
                        </div>
                        <div className="col-span-2 md:col-span-1 text-left"> 
                            <label className='text-blue-900' htmlFor="deadline">Deadline</label>
                            <input type="date"className="shadow appearance-none border rounded w-full py-2 px-3 xtext-blue-700 bg-gray-100 mt-2 focus:outline-none focus:shadow-outline" id="deadline" placeholder="2/3/2021" name='deadline'/>
                        </div>
                        <div className="col-span-4 text-left">
                            <label className='text-blue-900' htmlFor="bid-scope">Bid Scope</label><br></br>
                            <textarea className="shadow xappearance-none border rounded w-full py-2 px-3 xtext-blue-700 bg-gray-100 mt-2 focus:outline-none focus:shadow-outline" id='bid-scope' name='bid-scope'>
                            </textarea>
                        </div>
                       

                        <div className="md:col-span-4 col-span-4 text-left">
                            <label className=' w-full'>Attachment Files (PDF, .docx, jpg formats)</label><br></br>
                            <div className='grid grid-cols-3 gap-3'>
                                <div className='col-span-3 md:col-span-1'>
                                    <label className='' htmlFor="rfq-file">RFQ:</label><br></br>
                                    <CustomFileUpload input_id="rfq-file"/>
                                </div>
                                <div className='col-span-3 md:col-span-1'>
                                    <label className='' htmlFor="fin-credentials-file">Financial Credentials:</label>
                                    <CustomFileUpload input_id="fin-credentials-file"/>
                                </div>
                                <div className='col-span-3 md:col-span-1'>
                                    <label className='' htmlFor="acceptance-letter">Acceptance Letter:</label>
                                    <CustomFileUpload input_id="acceptance-letter"/>
                                </div>
                            </div>
                    </div>
                        <input type="submit" className="md:col-start-4 col-start-3 md:col-span-1 col-span-2 shadow appearance-none border rounded w-full py-2 px-3 button-solidx mt-2 focus:outline-none focus:shadow-outline" id='save-changes' value='Save Changes'/>
                </form>
            </div>
        </div>
    </div>
  )}