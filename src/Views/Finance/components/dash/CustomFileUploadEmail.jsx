import React, { useState } from "react";
import AttachmentIcon from '../../../../assets/icons/email/AttachmentIcon';


export default function CustomFileUploadEmail() {
    
    const [showUploaded, setShowUploaded] = useState("Add Attachment");
    const[upload_status, setUploadStatus]  = useState("text-gray-400 bg-gray-200");
    const[showClear, setShowClear]  = useState("hidden");

    function handleChange(){
        var file_upload = document.getElementById("attachment").value;
        console.log(file_upload)
        if(file_upload !== ""){
            var file_name = file_upload.split(/(\\|\/)/g).pop();
            setShowUploaded(file_name); 
            setUploadStatus("xpass"); 
            setShowClear("");
            // console.log(file_name)

        }
        else{setShowUploaded("Add Attachment");}  
    }
    function clear_input(){
        console.log("ran")
        var file_upload = document.getElementById("attachment").value;
        // console.log(file_upload);
        file_upload = "";
        setUploadStatus("text-gray-400 bg-gray-200"); 
        setShowUploaded("Add Attachment");
        setShowClear("hidden");

    }
        
  return (
    <div className='text-gray-400 absoluteleft-2bottom-2 pl-2 py-2 inline-flex'>
        <label className={` p-2 rounded-lg  ${upload_status}`} htmlFor='attachment'>
            <AttachmentIcon classx={`stroke-current`}/>
            
        </label>
        <span className='ml-2 my-auto'>{showUploaded}<span onClick={clear_input} className={`my-2 ml-1 px-1 rounded bg-gray-200 cursor-pointer ${showClear}`}>x</span></span>
        <input className='hidden' type='file' name='attachment' id='attachment' onChange={handleChange} multiple/>
        
        

    </div>
  )
}
