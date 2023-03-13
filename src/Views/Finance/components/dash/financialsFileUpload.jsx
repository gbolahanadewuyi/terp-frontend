import React, { useState } from "react";
import AddFileIcon from "../../../../assets/icons/custom-input/AddFileIcon";
import AddFileSuccessIcon from "../../../../assets/icons/custom-input/AddFileSuccessIcon";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";

export default function CustomFileUpload(props) {
  const [showNotUploaded, setShowNotUploaded] = useState("grid");
  const [showUploading, setShowUploading] = useState("hidden");
  const [showUploaded, setShowUploaded] = useState("hidden");

  const [uploadProgressstyle, setUploadProgressStyle] = useState({
    width: "0%",
    display: "none",
  });

  const [uploadProgressValue, setUploadProgressValue] = useState("0%");

  function handleChange(event) {
    const storage = getStorage();

    setShowNotUploaded("hidden");
    setShowUploading("grid");
    const selectedFiles = event.target.files;
    for (let i = 0; i < selectedFiles.length; i++) {
      const metadata = {
        contentType: selectedFiles[i].type,
      };
      const storageRef = ref(storage, "financials/" + selectedFiles[i].name);
      const uploadTask = uploadBytesResumable(
        storageRef,
        selectedFiles[i],
        metadata
      );

      //listen for state changes, errors and completiton of the upload
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          //get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setUploadProgressStyle({
            width: `${progress}%`,
            display: `block`,
          });
          setUploadProgressValue(`${progress}%`);
          console.log("Upload is " + progress + "% done");

          // switch (snapshot.state) {
          //     case 'paused':
          //         console.log('Upload is paused');
          //         break;
          //     case 'running':
          //         console.log('Upload is running');
          //         break;
          // }
        },
        (error) => {
          // A full list of error codes is available at
          // https://firebase.google.com/docs/storage/web/handle-errors
          switch (error.code) {
            case "storage/unauthorized":
              console.log("storage/unauthorized");
              // User doesn't have permission to access the object
              break;
            case "storage/canceled":
              console.log("storage/canceled");
              // User canceled the upload
              break;

            // ...

            case "storage/unknown":
              console.log("storage/unknown");
              // Unknown error occurred, inspect error.serverResponse
              break;
          }
        },
        () => {
          //Upload completed successfully, now we can get the download URL
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            console.log("File available at", downloadURL);
            props.setFinancials((oldArray) => [...oldArray, downloadURL]);
          });
          setShowUploading("hidden");
          setShowUploaded("grid");
        }
      );
    }
    // if (document.getElementById(props.input_id).value !== "") {
    //   setShowUploaded("grid");
    //   setShowNotUploaded("hidden");
    // } else {
    //   setShowUploaded("hidden");
    //   setShowNotUploaded("grid");
    // }
  }

  return (
    <>
      <label htmlFor={props.input_id}>
        <div className={`${showNotUploaded} custom-file-upload not-uploaded`}>
          <AddFileIcon classx="fill-current" />
          <div>Click to Upload File</div>
        </div>
        <div className={`${showUploading} custom-file-upload uploaded`}>
          <AddFileIcon classx="stroke-current" />
          <div className="w-full bg-gray-200 rounded-full dark:bg-gray-700">
            <div
              className="bg-blue-600 text-xs font-medium text-blue-100 text-center p-0.5 leading-none rounded-full"
              style={uploadProgressstyle}
            >
              {" "}
              {uploadProgressValue}
            </div>
          </div>
        </div>

        <div className={`${showUploaded} custom-file-upload uploaded`}>
          <AddFileSuccessIcon classx="stroke-current" />
          <div>File Uploaded!</div>
        </div>
      </label>
      <input
        className="hidden file-holder"
        type="file"
        name={props.input_id}
        id={props.input_id}
        onChange={handleChange}
        multiple
      />
    </>
  );
}
