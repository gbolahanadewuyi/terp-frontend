import React from 'react';
import approvedBanks from '../../../../../tempDb/approvedBanks';
import CustomFileUpload from '../../dash/CustomFileUpload';

export default function EditCompany(props) {

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
                    <h1 className=' p-2 pl-5 edit-modal-headr-x'>Edit Company</h1>
                </div>
                
                <form className="grid grid-cols-4 grid-row-7 gap-4 px-10 py-6">
                    <div className="col-span-2 text-left">
                        <label className='text-blue-900' htmlFor="company-name">Company Name</label><br></br>
                        <input type="text" className="shadow appearance-none border rounded w-full py-2 px-3 xtext-blue-700 bg-gray-100 mt-2 focus:outline-none focus:shadow-outline " placeholder="Enter Company Name" id='company-name' name='company-name'/>
                    </div>
                    <div className="col-span-2 text-left">
                        <label className='text-blue-900' htmlFor="company-address">Address</label><br></br>
                        <input type="text" className="shadow appearance-none border rounded w-full py-2 px-3 xtext-blue-700 bg-gray-100 mt-2 focus:outline-none focus:shadow-outline " placeholder="Enter Company's Address" id='company-address' name='company-address'/>
                    </div>
                    <div className="col-span-2 md:col-span-1 text-left">
                        <label className='text-blue-900' htmlFor="email">Email Address</label>
                        <input type="text"className="shadow appearance-none border rounded w-full py-2 px-3 xtext-blue-700 bg-gray-100 mt-2 focus:outline-none focus:shadow-outline" id="email" placeholder="teremaxe@gmail.com" name='email'/>
                    </div>
                    <div className="col-span-2 md:col-span-1 text-left">
                        <label className='text-blue-900' htmlFor="contact-number">Contact Number</label>
                        <input type="number"className="shadow appearance-none border rounded w-full py-2 px-3 xtext-blue-700 bg-gray-100 mt-2 focus:outline-none focus:shadow-outline" id="contact-number" placeholder="09065325428" name='contact-number'/>
                    </div>
                    <div className="col-span-2 md:col-span-1 text-left">
                        <label className='text-blue-900' htmlFor="rc-number">RC Number</label>
                        <input type="text"className="shadow appearance-none border rounded w-full py-2 px-3 xtext-blue-700 bg-gray-100 mt-2 focus:outline-none focus:shadow-outline" id="rc-number" placeholder="TRF/NIG/31/2021" name='rc-number'/>
                    </div>
                    <div className="col-span-2 md:col-span-1 text-left">
                        <label className='text-blue-900' htmlFor="tax-id-number">Tax Identification Number</label>
                        <input type="text"className="shadow appearance-none border rounded w-full py-2 px-3 xtext-blue-700 bg-gray-100 mt-2 focus:outline-none focus:shadow-outline" id="tax-id-number" placeholder="FIRS/TIN/32312021" name='tax-id-number'/>
                    </div>
                    <div className="col-span-4 grid grid-cols-8 gap-4">
                        <div className="col-span-4 md:col-span-3 text-left">
                            <label className='text-blue-900' htmlFor="account-name">Account Name</label>
                            <input type="text"className="shadow appearance-none border rounded w-full py-2 px-3 xtext-blue-700 bg-gray-100 mt-2 focus:outline-none focus:shadow-outline" id="account-name" placeholder="Olivia Pope and Associates" name='account-name'/>
                        </div>
                        <div className="col-span-4 md:col-span-2 text-left">
                            <label className='text-blue-900' htmlFor="account-number">Account Number</label>
                            <input type="text" className="shadow appearance-none border rounded w-full py-2 px-3 xtext-blue-700 bg-gray-100 mt-2 focus:outline-none focus:shadow-outline" id="account-number" placeholder="0452334316" name='account-number'/>
                        </div>
                        
                        <div className="col-span-5 md:col-span-2 text-left">
                            <label className='text-blue-900' htmlFor="bank-name">Bank Name</label>
                            <select type="text"className="shadow xappearance-none border rounded w-full py-2 px-3 xtext-blue-700 bg-gray-100 mt-2 focus:outline-none focus:shadow-outline" id="bank-name" name='bank-name'>
                                {approvedBanks.map(e=>{return <option key={e.id} className='' value={e.name}>{e.name}</option>})}
                            </select>
                        </div>
                        <div className="col-span-3 md:col-span-1 text-left">
                            <label className='text-blue-900' htmlFor="sort-code">Sort Code</label>
                            <input type="number"className="shadow appearance-none border rounded w-full py-2 px-3 xtext-blue-700 bg-gray-100 mt-2 focus:outline-none focus:shadow-outline" id="sort-code" placeholder="325428" name='sort-code'/>
                        </div>
                    </div>
                    <div className="col-span-4 text-left">
                        <div>Attachement File (PF, .docx, jpg formats)</div>
                        <div className='grid grid-cols-4 gap-4'>
                            <div className='col-span-2 md:col-span-1'>
                                <label>TCC:</label>
                                <CustomFileUpload input_id="tcc-file"/>
                                {/* <input type="file" className="shadow appearance-none border rounded w-full py-2 px-3 xtext-blue-700 bg-gray-100 mt-2 focus:outline-none focus:shadow-outline" id='tcc-file' name='tcc-file'/> */}
                            </div>
                            <div className='col-span-2 md:col-span-1'>
                                <label>ITF:</label>
                                <CustomFileUpload input_id="itf-file"/>
                                {/* <input type="file" className="shadow appearance-none border rounded w-full py-2 px-3 xtext-blue-700 bg-gray-100 mt-2 focus:outline-none focus:shadow-outline" id='itf-file' name='itf-file'/> */}
                            </div>
                            <div className='col-span-2 md:col-span-1'>
                                <label>NSITF:</label>
                                <CustomFileUpload input_id="msitf-file"/>
                                {/* <input type="file" className="shadow appearance-none border rounded w-full py-2 px-3 xtext-blue-700 bg-gray-100 mt-2 focus:outline-none focus:shadow-outline" id='msitf-file' name='msitf-file'/> */}
                            </div>
                            <div className='col-span-2 md:col-span-1'>
                                <label>BPP:</label>
                                <CustomFileUpload input_id="bpp-file"/>
                                {/* <input type="file" className="shadow appearance-none border rounded w-full py-2 px-3 xtext-blue-700 bg-gray-100 mt-2 focus:outline-none focus:shadow-outline" id='bpp-file' name='bpp-file'/> */}
                            </div>
                            <div className='col-span-2 md:col-span-1'>
                                <label>PENCOM:</label>
                                <CustomFileUpload input_id="pencom-file"/>
                                {/* <input type="file" className="shadow appearance-none border rounded w-full py-2 px-3 xtext-blue-700 bg-gray-100 mt-2 focus:outline-none focus:shadow-outline" id='pencom-file' name='pencom-file'/> */}
                            </div>
                            <div className='col-span-2 md:col-span-1'>
                                <label>Sworn Affidavit:</label>
                                <CustomFileUpload input_id="sworn-affidavit-file"/>
                                {/* <input type="file" className="shadow appearance-none border rounded w-full py-2 px-3 xtext-blue-700 bg-gray-100 mt-2 focus:outline-none focus:shadow-outline" id='sworn-affidavit-file' name='sworn-affidavit-file'/> */}
                            </div>
                            <div className='col-span-2 md:col-span-1'>
                                <label>Bank Reference Letter:</label>
                                <CustomFileUpload input_id="bank-reference-letter-file"/>
                                {/* <input type="file" className="shadow appearance-none border rounded w-full py-2 px-3 xtext-blue-700 bg-gray-100 mt-2 focus:outline-none focus:shadow-outline" id='bank-reference-letter-file' name='bank-reference-letter-file'/> */}
                            </div>
                            <div className='col-span-2 md:col-span-1'>
                                <label>Company Profile:</label>
                                <CustomFileUpload input_id="company-profile-file"/>
                                {/* <input type="file" className="shadow appearance-none border rounded w-full py-2 px-3 xtext-blue-700 bg-gray-100 mt-2 focus:outline-none focus:shadow-outline" id='company-profile-file' name='company-profile-file'/> */}
                            </div>
                            <div className='col-span-2 md:col-span-1'>
                                <label>Signature:</label>
                                <CustomFileUpload input_id="signature-file"/>
                                {/* <input type="file" className="shadow appearance-none border rounded w-full py-2 px-3 xtext-blue-700 bg-gray-100 mt-2 focus:outline-none focus:shadow-outline" id='signature-file' name='signature-file'/> */}
                            </div>
                            
                            
                        </div>
                    </div>
                    <input type="submit" className="md:col-start-4 col-start-3 md:col-span-1 col-span-2 shadow appearance-none border rounded w-full py-2 px-3 text-white button-solidx mt-2 focus:outline-none focus:shadow-outline" id='submit-button' value='Create Project'/>
                </form>
            </div>
        </div>
    </div>
  )}