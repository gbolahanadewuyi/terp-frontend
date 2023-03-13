import React from 'react';

export default function EditVendor(props) {

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
                    <h1 className=' p-2 pl-5 edit-modal-headr-x'>Edit Vendor</h1>
                </div>
                
                <form className="grid grid-cols-3 grid-row-7 gap-4 px-10 py-6">
                    <div className="col-span-3 text-left">
                        <label className='text-blue-900' htmlFor="vendor-name">Vendor Name</label><br></br>
                        <input type="text" className="shadow appearance-none border rounded w-full py-2 px-3 xtext-blue-700 bg-gray-100 mt-2 focus:outline-none focus:shadow-outline " placeholder="Enter Vendor Name" id='vendor-name' name='vendor-name'/>
                    </div>
                    <div className="col-span-3 text-left">
                        <label className='text-blue-900' htmlFor="vendor-address">Address</label><br></br>
                        <input type="text" className="shadow appearance-none border rounded w-full py-2 px-3 xtext-blue-700 bg-gray-100 mt-2 focus:outline-none focus:shadow-outline " placeholder="Enter Vendor's Address" id='vendor-address' name='vendor-address'/>
                    </div>
                    <div className="col-span-3 md:col-span-1 text-left">
                        <label className='text-blue-900' htmlFor="contact-number">Contact Number</label>
                        <input type="number"className="shadow appearance-none border rounded w-full py-2 px-3 xtext-blue-700 bg-gray-100 mt-2 focus:outline-none focus:shadow-outline" id="contact-number" placeholder="09065325428" name='contact-number'/>
                    </div>
                    <div className="col-span-3 md:col-span-1 text-left">
                        <label className='text-blue-900' htmlFor="email">Email Address</label>
                        <input type="text"className="shadow appearance-none border rounded w-full py-2 px-3 xtext-blue-700 bg-gray-100 mt-2 focus:outline-none focus:shadow-outline" id="email" placeholder="teremaxe@gmail.com" name='email'/>
                    </div>
                    <div className="col-span-3 md:col-span-1 text-left">
                        <label className='text-blue-900' htmlFor="type">Type</label>
                        <input type="text"className="shadow appearance-none border rounded w-full py-2 px-3 xtext-blue-700 bg-gray-100 mt-2 focus:outline-none focus:shadow-outline" id="type" placeholder="Construction Materials" name='type'/>
                    </div>
                    <input type="submit" className="md:col-start-3 col-start-2 md:col-span-1 col-span-2 shadow appearance-none border rounded w-full py-2 px-3 text-white button-solidx mt-2 focus:outline-none focus:shadow-outline" id='submit-button' value='Save Changes'/>
                </form>
            </div>
        </div>
    </div>
  )}