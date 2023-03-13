import React, { useState } from "react";
import AddFileIcon from "../../../../assets/icons/custom-input/AddFileIcon";
import AddFileSuccessIcon from "../../../../assets/icons/custom-input/AddFileSuccessIcon";

export default function CustomFileUpload(props) {
    const [showNotUploaded, setShowNotUploaded] = useState("grid");
    const [showUploaded, setShowUploaded] = useState("hidden");
        function handleChange(){
            if(document.getElementById(props.input_id).value !== ""){setShowUploaded("grid"); setShowNotUploaded("hidden"); }
            else{setShowUploaded("hidden"); setShowNotUploaded("grid");}  
        }
  return (
    <>
        <label htmlFor={props.input_id}>
            <div className={`${showNotUploaded} custom-file-upload not-uploaded`}>
                <AddFileIcon classx='fill-current'/>
                <div>Click to Upload File</div>
            </div>
            <div className={`${showUploaded} custom-file-upload uploaded`}>
                <AddFileSuccessIcon classx='stroke-current'/>
                <div>File Uploaded!</div>
            </div>
        </label>
        <input className="hidden file-holder" type="file" name={props.input_id} id={props.input_id} onChange={handleChange} />
    </>
  )
}
