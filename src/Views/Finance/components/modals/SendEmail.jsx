import React from 'react';
import CustomFileUploadEmail from '../dash/CustomFileUploadEmail';
// import Multiselect from 'multiselect-react-dropdown';

export default function SendMail(props) {
  return( 
    <div className={props.show}>
        <div className="xback-board txt-dark-bluex">
            <div className="modal-inner-edit-x3">
                <div className='modal-mail-head bg-black'>
                    <div className="w-full cursor-pointer" onClick={props.handleShow}>
                        <svg className="xsvg-close float-right" fill="#fff" xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 30 30" width="20px" height="20px">    <path d="M 7 4 C 6.744125 4 6.4879687 4.0974687 6.2929688 4.2929688 L 4.2929688 6.2929688 C 3.9019687 6.6839688 3.9019687 7.3170313 4.2929688 7.7070312 L 11.585938 15 L 4.2929688 22.292969 C 3.9019687 22.683969 3.9019687 23.317031 4.2929688 23.707031 L 6.2929688 25.707031 C 6.6839688 26.098031 7.3170313 26.098031 7.7070312 25.707031 L 15 18.414062 L 22.292969 25.707031 C 22.682969 26.098031 23.317031 26.098031 23.707031 25.707031 L 25.707031 23.707031 C 26.098031 23.316031 26.098031 22.682969 25.707031 22.292969 L 18.414062 15 L 25.707031 7.7070312 C 26.098031 7.3170312 26.098031 6.6829688 25.707031 6.2929688 L 23.707031 4.2929688 C 23.316031 3.9019687 22.682969 3.9019687 22.292969 4.2929688 L 15 11.585938 L 7.7070312 4.2929688 C 7.5115312 4.0974687 7.255875 4 7 4 z"/></svg>
                    </div>
                    <div>
                        <h1 className=' p-2 pl-5 edit-modal-headr-x'>Send New Mail</h1>
                    </div>
                </div>
                
                <form className="px-5 py-6">
                    <div className='border-b-2 border-b-gray-200'>
                        <label className='text-gray-400' htmlFor="recipient">To:</label>
                        <input type="text"className="appearance-none py-1 px-3 xxtext-blue-700 mt-2 focus:outline-none w-4/5 bg-whitex" id="recipient" name='recipient'/>
                    </div>
                    <div className='border-b-2 border-b-gray-200'>
                        <label className='text-gray-400' htmlFor="cc/bcc">Cc/Bcc:</label>
                        <input type="text"className="appearance-none py-1 px-3 xxtext-blue-700 mt-2 focus:outline-none w-4/5 bg-whitex" id="cc/bcc" name='cc/bcc'/>
                    </div>
                    <div className='border-b-2 border-b-gray-200'>
                        <label className='text-gray-400' htmlFor="subject">Subject:</label>
                        <input type="text"className="appearance-none py-1 px-3 xxtext-blue-700 mt-2 focus:outline-none w-4/5 bg-whitex" id="subject" name='subject'/>
                    </div>
                    <div className='xborder-b-2 xborder-b-gray-200'>
                        <textarea type="text"className="appearance-none py-1 px-3 xxtext-blue-700 mt-2 focus:outline-none w-4/5 bg-whitex" id="message" name='message' rows='7'></textarea>
                    </div>
                    
                
                    <div className='absolute left-0 bottom-0 w-full border-t-2'>
                        <CustomFileUploadEmail/>
                        <input type="submit" className="absolute bottom-2 right-2 shadow appearance-none py-2 px-3 button-solidx mt-2 focus:outline-none focus:shadow-outline" id='submit-button' value='Send Mail'/> 
                    </div>
                </form>
            </div>
        </div>
    </div>

  )}