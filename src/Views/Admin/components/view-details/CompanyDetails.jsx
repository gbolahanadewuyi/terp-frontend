import React, {useState} from 'react';
import DashHeaderDetails from './DashHeaderDetails';
import generic_logo from '../../../../assets/images/generic-company-logo.png'
import EditIcon from '../../../../assets/icons/Details/EditIcon';
import EditCompany from '../modals/EditDetails/EditCompany';
import DocumentCopyIcon from '../../../../assets/icons/Details/DocumentCopyIcon';
import { useEffect } from 'react';
import { Toaster, toast } from "react-hot-toast";
// import DashHeader from '../dash/DashHeader';

async function getCompanyDetail(id) {
    //gettoken
    const userInfoObject = localStorage.getItem("user");
    const userInfo = JSON.parse(userInfoObject);
    console.log(userInfo);
    return fetch(
      `https://us-central1-terp-338409.cloudfunctions.net/app/api/getcompany?id=${id}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userInfo.token}`,
        },
      }
    ).then((data) => data.json());
  }


export default function CompanyDetails(props) {
    const [details, setDetails] = useState([]);
    const [showEdit, setShowEdit] = useState("hidden");


    const handleShowEdit = () => {
        if(showEdit === "hidden"){ setShowEdit("") }
        else{setShowEdit("hidden")}
    }



     useEffect(async () => {
        if(!props.id){
            console.log("no id")
            return null
        }
      let mounted = true;
      const data = await getCompanyDetail(props.id);
      console.log(data);
      if (data.status == 403) {
        props.updateUser({});
      } else if (data.status == 400) {
        setDetails("");
      } else if (data.status == 200) {
        if (mounted) {
            setDetails(data.data.details);
        }
      } else {
        toast.error(`Server error, please check your network connection`, {
          icon: "😞",
          position: "top-right",
          style: {
            borderRadius: "10px",
            background: "#333",
            color: "#fff",
          },
        });
      }
      return () => (mounted = false);
      // setBids(data)
    }, [props.id]);

    const getCompanyDetails = async (id) => {
        const data = await getCompanyDetail(id);
        console.log(data);
        if (data.status == 403) {
          toast.error(`${data.message}`, {
            icon: "😞",
            position: "top-right",
            style: {
              borderRadius: "10px",
              background: "#333",
              color: "#fff",
            },
          });
          props.updateUser({});
        } else if (data.status == 400) {
          toast.error(`${data.message}`, {
            icon: "😞",
            position: "top-right",
            style: {
              borderRadius: "10px",
              background: "#333",
              color: "#fff",
            },
          });
        } else if (data.status == 200) {
          setDetails(data.data.details);
          props.getCompanies();
        } else {
          toast.error(`Server error, please check your network connection`, {
            icon: "😞",
            position: "top-right",
            style: {
              borderRadius: "10px",
              background: "#333",
              color: "#fff",
            },
          });
        }
      };

    

    return(
        <>
            <EditCompany  show={showEdit} handleShow={handleShowEdit}  details={details} id={props.id}  updateUser={props.updateUser}  getCompany={getCompanyDetails}/>
            <div className={`details-main-body bg-white ${props.show}`}>
                <DashHeaderDetails title={details.name} handleShow={props.handleShow}/>
            
                <div className='bg-white w-full pr-5'>
                    <div className='bg-white shadow flex'>
                        <span className='my-2 flex-auto mx-4'>
                            <div className='txt-greyed-out'>RC Number</div>
                            <div className='font-bold'>{details?.rcNumber}</div>
                        </span>
                        <span className='my-2 flex-auto'>
                            <div className='txt-greyed-out'>Address</div>
                            <div className='font-bold'>{details?.address}</div>
                        </span>
                        <span className='my-2 flex-auto'>
                            <div className='txt-greyed-out'>Email</div>
                            <div className='font-bold'>{details?.email}</div>
                        </span>
                        <span className='my-2 flex-auto'>
                            <div className='txt-greyed-out'>Phone</div>
                            <div className='font-bold'>{details?.phone}</div>
                        </span>
                        <div className=''>
                            <button className='border-2 border- px-2 py-1 rounded inline-block mt-2' onClick={handleShowEdit}>
                                <EditIcon classx='fill-current inline'/> Edit Details
                            </button>
                        </div>
                    </div>
                    <div className='m-4 bg-white shadowp-7'>
                        <div className='col-span-5 details-desc grid grid-cols-3 gap-12 '>
                            <div className=" mt-5">
                                <div className='font-bold'>
                                    BANK ACCOUNT NAME
                                </div>
                                <div>
                                    {details?.accountName}
                                </div>
                            </div>
                            <div className=" mt-5">
                                <div className='font-bold'>
                                    BANK ACCOUNT NUMBER
                                </div>
                                <div>
                                   {details?.accountNumber}
                                </div>
                            </div>
                            <div className="description mt-5">
                                <div className='font-bold'>
                                    TAX IDENTIFICATION NUMBER
                                </div>
                                <div>
                                    {details?.tin}
                                </div>
                            </div>
                            <div className="description mt-5">
                                <div className='font-bold'>
                                    BANK NAME
                                </div>
                                <div>
                                   {details?.bankName}
                                </div>
                            </div>
                            <div className="description mt-5">
                                <div className='font-bold'>
                                    ACCOUNT SORT CODE
                                </div>
                                <div>
                                   {details?.sortCode}
                                </div>
                            </div>
                            <div className="description mt-5 row-span-2">
                                <div className='font-bold'>
                                    FILES
                                </div>
                                <ul>
                                    <li className='flex'><DocumentCopyIcon classx="fill-current txt-bluex mr-3"/><a href={details?.tcc} target="_blank">TCC</a></li>
                                    <li className='flex'><DocumentCopyIcon classx="fill-current txt-bluex mr-3"/><a href={details?.itf} target="_blank">ITF</a></li>
                                    <li className='flex'><DocumentCopyIcon classx="fill-current txt-bluex mr-3"/><a href={details?.bpp} target="_blank">NSITF</a></li>
                                    <li className='flex'><DocumentCopyIcon classx="fill-current txt-bluex mr-3"/><a href={details?.itf} target="_blank">BPP</a></li>
                                    <li className='flex'><DocumentCopyIcon classx="fill-current txt-bluex mr-3"/><a href={details?.pencom} target="_blank">PENCOM</a></li>
                                    <li className='flex'><DocumentCopyIcon classx="fill-current txt-bluex mr-3"/><a href={details?.nemsa} target="_blank">Nemsa</a></li>
                                    <li className='flex'><DocumentCopyIcon classx="fill-current txt-bluex mr-3"/><a href={details?.coren} target="_blank">Coren</a></li>
                                    {/* <li className='flex'><DocumentCopyIcon classx="fill-current txt-bluex mr-3"/>Sworn Affidavit.pdf</li>
                                    <li className='flex'><DocumentCopyIcon classx="fill-current txt-bluex mr-3"/>Bank Reference Letter.pdf</li> */}
                                    {/* <li className='flex'><DocumentCopyIcon classx="fill-current txt-bluex mr-3"/>Company Profile .pdf</li>
                                    <li className='flex'><DocumentCopyIcon classx="fill-current txt-bluex mr-3"/>Signature.pdf</li> */}
                                </ul>
                            </div>
                            <div className="description mt-5 col-span-2">
                                <div className='font-bold'>
                                    COMPANY Description
                                </div>
                                <div>
                                    {details?.description}
                                </div>
                            </div>
                        </div>
                       
                    </div>
                </div>
                
            </div>
        </>);
        }
