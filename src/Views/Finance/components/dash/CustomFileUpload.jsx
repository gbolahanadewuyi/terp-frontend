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
    switch (props.input_id) {
      case "rfq-file":
        setShowNotUploaded("hidden");
        setShowUploading("grid");
        const rfqFile = event.target.files[0];

        //create the file metadata
        const rfqmetadata = {
          contentType: rfqFile.type,
        };

        //uploade file and metadata
        const rfqstorageRef = ref(storage, "docs/" + rfqFile.name);
        const rfquploadTask = uploadBytesResumable(
          rfqstorageRef,
          rfqFile,
          rfqmetadata
        );

        //listen for state changes, errors and completiton of the upload
        rfquploadTask.on(
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
            getDownloadURL(rfquploadTask.snapshot.ref).then((downloadURL) => {
              console.log("File available at", downloadURL);
              props.setRfq(downloadURL);
            });
            setShowUploading("hidden");
            setShowUploaded("grid");
          }
        );

        break;

      case "purchase-order":
        setShowNotUploaded("hidden");
        setShowUploading("grid");
        const purchaseOrderFile = event.target.files[0];

        //create the file metadata
        const purchaseOrderMetadata = {
          contentType: purchaseOrderFile.type,
        };

        //uploade file and metadata
        const purchaseOrderStorageRef = ref(
          storage,
          "docs/" + purchaseOrderFile.name
        );
        const purchaseOrderUploadTask = uploadBytesResumable(
          purchaseOrderStorageRef,
          purchaseOrderFile,
          purchaseOrderMetadata
        );

        //listen for state changes, errors and completiton of the upload
        purchaseOrderUploadTask.on(
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
            getDownloadURL(purchaseOrderUploadTask.snapshot.ref).then(
              (downloadURL) => {
                console.log("File available at", downloadURL);
                props.setPurchaseOrder(downloadURL);
              }
            );
            setShowUploading("hidden");
            setShowUploaded("grid");
          }
        );
        break;

      case "letterOfAward":
        setShowNotUploaded("hidden");
        setShowUploading("grid");
        const letterOfAwardFile = event.target.files[0];

        //create the file metadata
        const letterOfAwardMetadata = {
          contentType: letterOfAwardFile.type,
        };

        //uploade file and metadata
        const letterOfAwardStorageRef = ref(
          storage,
          "docs/" + letterOfAwardFile.name
        );
        const letterOfAwardUploadTask = uploadBytesResumable(
          letterOfAwardStorageRef,
          letterOfAwardFile,
          letterOfAwardMetadata
        );

        //listen for state changes, errors and completiton of the upload
        letterOfAwardUploadTask.on(
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
            getDownloadURL(letterOfAwardUploadTask.snapshot.ref).then(
              (downloadURL) => {
                console.log("File available at", downloadURL);
                props.setLetterOfAward(downloadURL);
              }
            );
            setShowUploading("hidden");
            setShowUploaded("grid");
          }
        );
        break;

      case "acceptanceLetter":
        setShowNotUploaded("hidden");
        setShowUploading("grid");
        const acceptanceLetterFile = event.target.files[0];

        //create the file metadata
        const acceptanceLettermetadata = {
          contentType: acceptanceLetterFile.type,
        };

        //uploade file and metadata
        const acceptanceLetterstorageRef = ref(
          storage,
          "docs/" + acceptanceLetterFile.name
        );
        const acceptanceLetteruploadTask = uploadBytesResumable(
          acceptanceLetterstorageRef,
          acceptanceLetterFile,
          acceptanceLettermetadata
        );

        //listen for state changes, errors and completiton of the upload
        acceptanceLetteruploadTask.on(
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
            getDownloadURL(acceptanceLetteruploadTask.snapshot.ref).then(
              (downloadURL) => {
                console.log("File available at", downloadURL);
                props.setAcceptanceLetter(downloadURL);
              }
            );
            setShowUploading("hidden");
            setShowUploaded("grid");
          }
        );
        break;
      case "work-order":
        setShowNotUploaded("hidden");
        setShowUploading("grid");
        const workOrderFile = event.target.files[0];

        //create the file metadata
        const workOrdermetadata = {
          contentType: workOrderFile.type,
        };

        //uploade file and metadata
        const workOrderstorageRef = ref(storage, "docs/" + workOrderFile.name);
        const workOrderuploadTask = uploadBytesResumable(
          workOrderstorageRef,
          workOrderFile,
          workOrdermetadata
        );

        //listen for state changes, errors and completiton of the upload
        workOrderuploadTask.on(
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
            getDownloadURL(workOrderuploadTask.snapshot.ref).then(
              (downloadURL) => {
                console.log("File available at", downloadURL);
                props.setWorkOrder(downloadURL);
              }
            );
            setShowUploading("hidden");
            setShowUploaded("grid");
          }
        );
        break;

      case "invoice":
        setShowNotUploaded("hidden");
        setShowUploading("grid");
        const invoiceFile = event.target.files[0];

        //create the file metadata
        const invoiceMetadata = {
          contentType: invoiceFile.type,
        };

        //uploade file and metadata
        const invoiceStorageRef = ref(storage, "docs/" + invoiceFile.name);
        const invoiceUploadTask = uploadBytesResumable(
          invoiceStorageRef,
          invoiceFile,
          invoiceMetadata
        );

        //listen for state changes, errors and completiton of the upload
        invoiceUploadTask.on(
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
            getDownloadURL(invoiceUploadTask.snapshot.ref).then(
              (downloadURL) => {
                console.log("File available at", downloadURL);
                props.setInvoiceDeliveryNote(downloadURL);
              }
            );
            setShowUploading("hidden");
            setShowUploaded("grid");
          }
        );
        break;
      case "certificate-of-completion":
        setShowNotUploaded("hidden");
        setShowUploading("grid");
        const certificateOfCompletionFile = event.target.files[0];

        //create the file metadata
        const certificateOfCompletionMetadata = {
          contentType: certificateOfCompletionFile.type,
        };

        //uploade file and metadata
        const certificateOfCompletionStorageRef = ref(
          storage,
          "docs/" + certificateOfCompletionFile.name
        );
        const certificateOfCompletionUploadTask = uploadBytesResumable(
          certificateOfCompletionStorageRef,
          certificateOfCompletionFile,
          certificateOfCompletionMetadata
        );

        //listen for state changes, errors and completiton of the upload
        certificateOfCompletionUploadTask.on(
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
            getDownloadURL(certificateOfCompletionUploadTask.snapshot.ref).then(
              (downloadURL) => {
                console.log("File available at", downloadURL);
                props.setCertificateOfCompletion(downloadURL);
              }
            );
            setShowUploading("hidden");
            setShowUploaded("grid");
          }
        );
        break;

        case "profile_picture":
        setShowNotUploaded("hidden");
        setShowUploading("grid");
        const profilePictureFile = event.target.files[0];

        //create the file metadata
        const profilePictureMetadata = {
          contentType: profilePictureFile.type,
        };

        //uploade file and metadata
        const profilePictureStorageRef = ref(
          storage,
          "docs/" + profilePictureFile.name
        );
        const profilePictureUploadTask = uploadBytesResumable(
          profilePictureStorageRef,
          profilePictureFile,
          profilePictureMetadata
        );

        //listen for state changes, errors and completiton of the upload
        profilePictureUploadTask.on(
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
            getDownloadURL(profilePictureUploadTask.snapshot.ref).then(
              (downloadURL) => {
                console.log("File available at", downloadURL);
                props.setPhotoURL(downloadURL);
              }
            );
            setShowUploading("hidden");
            setShowUploaded("grid");
          }
        );
        break;

        case "means_of_id":
          setShowNotUploaded("hidden");
          setShowUploading("grid");
          const idFile = event.target.files[0];
  
          //create the file metadata
          const idMetadata = {
            contentType: idFile.type,
          };
  
          //uploade file and metadata
          const idStorageRef = ref(
            storage,
            "docs/" + idFile.name
          );
          const idUploadTask = uploadBytesResumable(
            idStorageRef,
            idFile,
            idMetadata
          );
  
          //listen for state changes, errors and completiton of the upload
          idUploadTask.on(
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
              getDownloadURL(idUploadTask.snapshot.ref).then(
                (downloadURL) => {
                  console.log("File available at", downloadURL);
                  props.setIdFile(downloadURL);
                }
              );
              setShowUploading("hidden");
              setShowUploaded("grid");
            }
          );
          break;

          case "tcc-file":
          setShowNotUploaded("hidden");
          setShowUploading("grid");
          const tccFile = event.target.files[0];
  
          //create the file metadata
          const tccMetadata = {
            contentType: tccFile.type,
          };
  
          //uploade file and metadata
          const tccStorageRef = ref(
            storage,
            "docs/" + tccFile.name
          );
          const tccUploadTask = uploadBytesResumable(
            tccStorageRef,
            tccFile,
            tccMetadata
          );
  
          //listen for state changes, errors and completiton of the upload
          tccUploadTask.on(
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
              getDownloadURL(tccUploadTask.snapshot.ref).then(
                (downloadURL) => {
                  console.log("File available at", downloadURL);
                  props.setTccFile(downloadURL);
                }
              );
              setShowUploading("hidden");
              setShowUploaded("grid");
            }
          );
          break;

          case "itf-file":
            setShowNotUploaded("hidden");
            setShowUploading("grid");
            const itfFile = event.target.files[0];
    
            //create the file metadata
            const itfMetadata = {
              contentType: itfFile.type,
            };
    
            //uploade file and metadata
            const itfStorageRef = ref(
              storage,
              "docs/" + itfFile.name
            );
            const itfUploadTask = uploadBytesResumable(
              itfStorageRef,
              itfFile,
              itfMetadata
            );
    
            //listen for state changes, errors and completiton of the upload
            itfUploadTask.on(
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
                getDownloadURL(itfUploadTask.snapshot.ref).then(
                  (downloadURL) => {
                    console.log("File available at", downloadURL);
                    props.setItfFile(downloadURL);
                  }
                );
                setShowUploading("hidden");
                setShowUploaded("grid");
              }
            );
            break;

            case "nsitf-file":
              setShowNotUploaded("hidden");
              setShowUploading("grid");
              const nsitfFile = event.target.files[0];
      
              //create the file metadata
              const nsitfMetadata = {
                contentType: nsitfFile.type,
              };
      
              //uploade file and metadata
              const nsitfStorageRef = ref(
                storage,
                "docs/" + nsitfFile.name
              );
              const nsitfUploadTask = uploadBytesResumable(
                nsitfStorageRef,
                nsitfFile,
                nsitfMetadata
              );
      
              //listen for state changes, errors and completiton of the upload
              nsitfUploadTask.on(
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
                  getDownloadURL(nsitfUploadTask.snapshot.ref).then(
                    (downloadURL) => {
                      console.log("File available at", downloadURL);
                      props.setNsitfFile(downloadURL);
                    }
                  );
                  setShowUploading("hidden");
                  setShowUploaded("grid");
                }
              );
              break;

              case "bpp-file":
              setShowNotUploaded("hidden");
              setShowUploading("grid");
              const bppFile = event.target.files[0];
      
              //create the file metadata
              const bppMetadata = {
                contentType: bppFile.type,
              };
      
              //uploade file and metadata
              const bppStorageRef = ref(
                storage,
                "docs/" + bppFile.name
              );
              const bppUploadTask = uploadBytesResumable(
                bppStorageRef,
                bppFile,
                bppMetadata
              );
      
              //listen for state changes, errors and completiton of the upload
              bppUploadTask.on(
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
                  getDownloadURL(bppUploadTask.snapshot.ref).then(
                    (downloadURL) => {
                      console.log("File available at", downloadURL);
                      props.setBppFile(downloadURL);
                    }
                  );
                  setShowUploading("hidden");
                  setShowUploaded("grid");
                }
              );
              break;

              case "pencom-file":
                setShowNotUploaded("hidden");
                setShowUploading("grid");
                const pencomFile = event.target.files[0];
        
                //create the file metadata
                const pencomMetadata = {
                  contentType: pencomFile.type,
                };
        
                //uploade file and metadata
                const pencomStorageRef = ref(
                  storage,
                  "docs/" + pencomFile.name
                );
                const pencomUploadTask = uploadBytesResumable(
                  pencomStorageRef,
                  pencomFile,
                  pencomMetadata
                );
        
                //listen for state changes, errors and completiton of the upload
                pencomUploadTask.on(
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
                    getDownloadURL(pencomUploadTask.snapshot.ref).then(
                      (downloadURL) => {
                        console.log("File available at", downloadURL);
                        props.setPencomFile(downloadURL);
                      }
                    );
                    setShowUploading("hidden");
                    setShowUploaded("grid");
                  }
                );
                break;
   
                case "sworn-affidavit-file":
                  setShowNotUploaded("hidden");
                  setShowUploading("grid");
                  const swornAffidavitFile = event.target.files[0];
          
                  //create the file metadata
                  const swornAffidavitMetadata = {
                    contentType: swornAffidavitFile.type,
                  };
          
                  //uploade file and metadata
                  const swornAffidavitStorageRef = ref(
                    storage,
                    "docs/" + swornAffidavitFile.name
                  );
                  const swornAffidavitUploadTask = uploadBytesResumable(
                    swornAffidavitStorageRef,
                    swornAffidavitFile,
                    swornAffidavitMetadata
                  );
          
                  //listen for state changes, errors and completiton of the upload
                  swornAffidavitUploadTask.on(
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
                      getDownloadURL(swornAffidavitUploadTask.snapshot.ref).then(
                        (downloadURL) => {
                          console.log("File available at", downloadURL);
                          props.setSwornAffidavitFile(downloadURL);
                        }
                      );
                      setShowUploading("hidden");
                      setShowUploaded("grid");
                    }
                  );
                  break;

                  case "bank-reference-letter-file":
                    setShowNotUploaded("hidden");
                    setShowUploading("grid");
                    const bankReferenceFile = event.target.files[0];
            
                    //create the file metadata
                    const bankReferenceMetadata = {
                      contentType: bankReferenceFile.type,
                    };
            
                    //uploade file and metadata
                    const bankReferenceStorageRef = ref(
                      storage,
                      "docs/" + bankReferenceFile.name
                    );
                    const bankReferenceUploadTask = uploadBytesResumable(
                      bankReferenceStorageRef,
                      bankReferenceFile,
                      bankReferenceMetadata
                    );
            
                    //listen for state changes, errors and completiton of the upload
                    bankReferenceUploadTask.on(
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
                        getDownloadURL(bankReferenceUploadTask.snapshot.ref).then(
                          (downloadURL) => {
                            console.log("File available at", downloadURL);
                            props.setBankReferenceFile(downloadURL);
                          }
                        );
                        setShowUploading("hidden");
                        setShowUploaded("grid");
                      }
                    );
                    break;

                    case "company-profile-file":
                    setShowNotUploaded("hidden");
                    setShowUploading("grid");
                    const companyProfileFile = event.target.files[0];
            
                    //create the file metadata
                    const companyProfileMetadata = {
                      contentType: companyProfileFile.type,
                    };
            
                    //uploade file and metadata
                    const companyProfileStorageRef = ref(
                      storage,
                      "docs/" + companyProfileFile.name
                    );
                    const companyProfileUploadTask = uploadBytesResumable(
                      companyProfileStorageRef,
                      companyProfileFile,
                      companyProfileMetadata
                    );
            
                    //listen for state changes, errors and completiton of the upload
                    companyProfileUploadTask.on(
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
                        getDownloadURL(companyProfileUploadTask.snapshot.ref).then(
                          (downloadURL) => {
                            console.log("File available at", downloadURL);
                            props.setCompanyProfileFile(downloadURL);
                          }
                        );
                        setShowUploading("hidden");
                        setShowUploaded("grid");
                      }
                    );
                    break;

                    case "nemsa-file":
                    setShowNotUploaded("hidden");
                    setShowUploading("grid");
                    const nemsaFile = event.target.files[0];
            
                    //create the file metadata
                    const nemsaMetadata = {
                      contentType: nemsaFile.type
                    };
            
                    //uploade file and metadata
                    const nemsaStorageRef = ref(
                      storage,
                      "docs/" + nemsaFile.name
                    );
                    const nemsaUploadTask = uploadBytesResumable(
                      nemsaStorageRef,
                      nemsaFile,
                      nemsaMetadata
                    );
            
                    //listen for state changes, errors and completiton of the upload
                    nemsaUploadTask.on(
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
                        getDownloadURL(nemsaUploadTask.snapshot.ref).then(
                          (downloadURL) => {
                            console.log("File available at", downloadURL);
                            props.setNemsaFile(downloadURL);
                          }
                        );
                        setShowUploading("hidden");
                        setShowUploaded("grid");
                      }
                    );
                    break;
     
                    case "coren-file":
                    setShowNotUploaded("hidden");
                    setShowUploading("grid");
                    const corenFile = event.target.files[0];
            
                    //create the file metadata
                    const corenMetadata = {
                      contentType: corenFile.type
                    };
            
                    //uploade file and metadata
                    const corenStorageRef = ref(
                      storage,
                      "docs/" + corenFile.name
                    );
                    const corenUploadTask = uploadBytesResumable(
                      corenStorageRef,
                      corenFile,
                      corenMetadata
                    );
            
                    //listen for state changes, errors and completiton of the upload
                    corenUploadTask.on(
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
                        getDownloadURL(corenUploadTask.snapshot.ref).then(
                          (downloadURL) => {
                            console.log("File available at", downloadURL);
                            props.setCorenFile(downloadURL);
                          }
                        );
                        setShowUploading("hidden");
                        setShowUploaded("grid");
                      }
                    );
                    break;

                    case "financials-file":
                    setShowNotUploaded("hidden");
                    setShowUploading("grid");
                    const financialsFile = event.target.files[0];
            
                    //create the file metadata
                    const financialsMetadata = {
                      contentType: financialsFile.type
                    };
            
                    //uploade file and metadata
                    const financialsStorageRef = ref(
                      storage,
                      "docs/" + financialsFile.name
                    );
                    const financialsUploadTask = uploadBytesResumable(
                      financialsStorageRef,
                      financialsFile,
                      financialsMetadata
                    );
            
                    //listen for state changes, errors and completiton of the upload
                    financialsUploadTask.on(
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
                        getDownloadURL(financialsUploadTask.snapshot.ref).then(
                          (downloadURL) => {
                            console.log("File available at", downloadURL);
                            props.setFinancials(downloadURL);
                          }
                        );
                        setShowUploading("hidden");
                        setShowUploaded("grid");
                      }
                    );
                    break;
        
    }
  }

  return (
    <>
      <label htmlFor={props.input_id}>
        <div className={`${showNotUploaded} custom-file-upload not-uploaded`}>
          <AddFileIcon classx="fill-current" />
          <div>Click to Upload File</div>
        </div>

        <div className={`${showUploading} custom-file-upload uploaded`}>
          <AddFileSuccessIcon classx="stroke-current" />
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
        onClick={(e) => (e.target.value = null)}
      />
    </>
  );
}
