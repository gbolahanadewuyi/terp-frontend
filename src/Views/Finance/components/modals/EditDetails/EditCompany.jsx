import React, { useState, useEffect, useRef } from "react";
import approvedBanks from "../../../../../tempDb/approvedBanks";
import EditCustomFileUpload from "../../dash/EditCustomFileUpload";
import { toast } from "react-hot-toast";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner, faPlus } from "@fortawesome/free-solid-svg-icons";

async function updateCompany(credentials, id) {
  console.log(credentials);

  const userInfoObject = localStorage.getItem("user");
  const userInfo = JSON.parse(userInfoObject);
  console.log(userInfo);
  try {
    const data = await fetch(
      `https://us-central1-terp-338409.cloudfunctions.net/app/api/updateCompany?id=${id}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userInfo.token}`,
        },
        body: JSON.stringify(credentials),
      }
    );
    return data.json();
  } catch (e) {
    console.log(e);
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
}

export default function EditCompany(props) {
  const [updateCompanyHtmlValue, setUpdateCompanyHtmlValue] =
    useState("Update Company");
  const prevUpdateCompanyHtmlValue = usePrevious(updateCompanyHtmlValue);

  const [updateCompanyIcon, setUpdateCompanyIcon] = useState(faPlus);
  const prevUpdateCompanyIcon = usePrevious(updateCompanyIcon);

  const [updateCompanyIconClassname, setUpdateCompanyIconClassname] =
    useState();
  const prevUpdateCompanyIconClassname = usePrevious(
    updateCompanyIconClassname
  );

  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [rcNumber, setRcNumber] = useState("");
  const [address, setAddress] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [accountName, setAccountName] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [tin, setTin] = useState("");
  const [bankName, setBankName] = useState("");
  const [sortCode, setSortCode] = useState("");
  const [description, setDescription] = useState("");
  const [banks, setBanks] = useState([]);
  const [tcc, setTcc] = useState("");
  const [itf, setItf] = useState("");
  const [nsitf, setNsitf] = useState("");
  const [bpp, setBpp] = useState("");
  const [pencom, setPencom] = useState("");
  const [swornAffidavit, setSwornAffidavit] = useState("");
  const [bankReference, setBankReference] = useState("");
  const [technicalDocument, setTechnicalDocument] = useState("");
  const [nemsa, setNemsa] = useState("");
  const [coren, setCoren] = useState("");

  useEffect(async () => {
    setName(props.details?.name);
    setRcNumber(props.details?.rcNumber);
    setAddress(props.details?.address);
    setEmail(props.details?.email);
    setPhone(props.details?.phone);
    setAccountName(props.details?.accountName);
    setAccountNumber(props.details?.accountNumber);
    setTin(props.details?.tin);
    setId(props.id);
    setBankName(props.details?.bankName);
    setSortCode(props.details?.sortCode);
    setDescription(props.details?.description);

    setTcc(props.details?.tcc);
    setItf(props.details?.itf);
    setNsitf(props.details?.nsitf);
    setBpp(props.details?.amountpaid);
    setPencom(props.details?.pencom);
    setTechnicalDocument(props.details?.technicalDocument);
    setSwornAffidavit(props.details?.swornAffidavit);
    setBankReference(props.details?.bankReference);
    setNemsa(props.details?.nemsa);
    setCoren(props.details?.coren);
  }, [props.details, props.id]);

  useEffect(async () => {
    setBanks(
      approvedBanks.filter((e) => {
        return e.name !== bankName;
      })
    );
  }, [bankName]);

  // Hook
  function usePrevious(value) {
    // The ref object is a generic container whose current property is mutable ...
    // ... and can hold any value, similar to an instance property on a class
    const ref = useRef();
    // Store current value in ref
    useEffect(() => {
      ref.current = value;
    }, [value]); // Only re-run if value changes
    // Return previous value (happens before update in useEffect above)
    return ref.current;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    document.getElementById("editCompany-button").disabled = true;
    setUpdateCompanyHtmlValue("Processing please wait....");
    setUpdateCompanyIcon(faSpinner);
    setUpdateCompanyIconClassname("spinner");
    const data = await updateCompany(
      {
        name,
        rcNumber,
        address,
        email,
        phone,
        accountName,
        accountNumber,
        tin,
        bankName,
        sortCode,
        description,
        tcc,
        itf,
        nsitf,
        bpp,
        pencom,
        technicalDocument,
        nemsa,
        coren,
      },
      id
    );
    console.log(data);
    if (data.status == 403) {
      toast.error(`${data.message}`, {
        duration: 5000,
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
        duration: 5000,
        icon: "😞",
        position: "top-right",
        style: {
          borderRadius: "10px",
          background: "#333",
          color: "#fff",
        },
      });
      setUpdateCompanyIconClassname("");
      setUpdateCompanyIcon(faPlus);
      setUpdateCompanyHtmlValue("Update Company");
      document.getElementById("editCompany-button").disabled = false;
    } else if (data.status == 200) {
      toast.success("Company updated successfully!", {
        duration: 5000,
        icon: "👏",
        position: "top-right",
        style: {
          borderRadius: "10px",
          background: "#333",
          color: "#fff",
        },
      });
      setUpdateCompanyIconClassname("");
      setUpdateCompanyIcon(faPlus);
      setUpdateCompanyHtmlValue("Update Company");
      document.getElementById("editCompany-form").reset();
      document.getElementById("editCompany-button").disabled = false;
      props.handleShow();
      props.getCompany(id);
    } else {
      toast.error(`Server error, please check your network connection`, {
        duration: 5000,
        icon: "😞",
        position: "top-right",
        style: {
          borderRadius: "10px",
          background: "#333",
          color: "#fff",
        },
      });
      setUpdateCompanyIconClassname("");
      setUpdateCompanyIcon(faPlus);
      setUpdateCompanyHtmlValue("Update Company");
      document.getElementById("editCompany-button").disabled = false;
    }
  };

  return (
    <div className={props.show}>
      <div className="xback-board txt-dark-bluex">
        <div className="modal-inner-edit-x2">
          <div className="modal-edit-head-v2 relative">
            <div className="w-full" onClick={props.handleShow}>
              <svg
                className="xsvg-close absolute top-2 right-2"
                fill="#fff"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 30 30"
                width="20px"
                height="20px"
              >
                {" "}
                <path d="M 7 4 C 6.744125 4 6.4879687 4.0974687 6.2929688 4.2929688 L 4.2929688 6.2929688 C 3.9019687 6.6839688 3.9019687 7.3170313 4.2929688 7.7070312 L 11.585938 15 L 4.2929688 22.292969 C 3.9019687 22.683969 3.9019687 23.317031 4.2929688 23.707031 L 6.2929688 25.707031 C 6.6839688 26.098031 7.3170313 26.098031 7.7070312 25.707031 L 15 18.414062 L 22.292969 25.707031 C 22.682969 26.098031 23.317031 26.098031 23.707031 25.707031 L 25.707031 23.707031 C 26.098031 23.316031 26.098031 22.682969 25.707031 22.292969 L 18.414062 15 L 25.707031 7.7070312 C 26.098031 7.3170312 26.098031 6.6829688 25.707031 6.2929688 L 23.707031 4.2929688 C 23.316031 3.9019687 22.682969 3.9019687 22.292969 4.2929688 L 15 11.585938 L 7.7070312 4.2929688 C 7.5115312 4.0974687 7.255875 4 7 4 z" />
              </svg>
            </div>
            <h1 className=" p-2 pl-5 edit-modal-headr-x">Edit Company</h1>
          </div>

          <form
            className="grid grid-cols-4 grid-row-7 gap-1.5 px-10 py-5" id="editCompany-form"
            onSubmit={handleSubmit}
          >
            <div className="col-span-2 text-left">
              <label className="text-blue-900" htmlFor="company-name">
                Company Name
              </label>
              <br></br>
              <input
                value={name}
                type="text"
                onChange={(e) => setName(e.target.value)}
                className="shadow appearance-none border rounded w-full py-2 px-3 xtext-blue-700 bg-gray-100 mt-2 focus:outline-none focus:shadow-outline "
                placeholder="Enter Company Name"
                id="company-name"
                name="company-name"
              />
            </div>
            <div className="col-span-2 text-left">
              <label className="text-blue-900" htmlFor="company-address">
                Address
              </label>
              <br></br>
              <input
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="shadow appearance-none border rounded w-full py-2 px-3 xtext-blue-700 bg-gray-100 mt-2 focus:outline-none focus:shadow-outline "
                placeholder="Enter Company's Address"
                id="company-address"
                name="company-address"
              />
            </div>
            <div className="col-span-2 md:col-span-1 text-left">
              <label className="text-blue-900" htmlFor="email">
                Email Address
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="shadow appearance-none border rounded w-full py-2 px-3 xtext-blue-700 bg-gray-100 mt-2 focus:outline-none focus:shadow-outline"
                id="email"
                placeholder="teremaxe@gmail.com"
                name="email"
              />
            </div>
            <div className="col-span-2 md:col-span-1 text-left">
              <label className="text-blue-900" htmlFor="contact-number">
                Contact Number
              </label>
              <input
                type="number"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="shadow appearance-none border rounded w-full py-2 px-3 xtext-blue-700 bg-gray-100 mt-2 focus:outline-none focus:shadow-outline"
                id="contact-number"
                placeholder="09065325428"
                name="contact-number"
              />
            </div>
            <div className="col-span-2 md:col-span-1 text-left">
              <label className="text-blue-900" htmlFor="rc-number">
                RC Number
              </label>
              <input
                type="text"
                value={rcNumber}
                onChange={(e) => setRcNumber(e.target.value)}
                className="shadow appearance-none border rounded w-full py-2 px-3 xtext-blue-700 bg-gray-100 mt-2 focus:outline-none focus:shadow-outline"
                id="rc-number"
                placeholder="TRF/NIG/31/2021"
                name="rc-number"
              />
            </div>
            <div className="col-span-2 md:col-span-1 text-left">
              <label className="text-blue-900" htmlFor="tax-id-number">
                Tax Identification Number
              </label>
              <input
                type="text"
                value={tin}
                onChange={(e) => setTin(e.target.value)}
                className="shadow appearance-none border rounded w-full py-2 px-3 xtext-blue-700 bg-gray-100 mt-2 focus:outline-none focus:shadow-outline"
                id="tax-id-number"
                placeholder="FIRS/TIN/32312021"
                name="tax-id-number"
              />
            </div>
            <div className="col-span-4 grid grid-cols-8 gap-4">
              <div className="col-span-4 md:col-span-3 text-left">
                <label className="text-blue-900" htmlFor="account-name">
                  Account Name
                </label>
                <input
                  type="text"
                  value={accountName}
                  onChange={(e) => setAccountName(e.target.value)}
                  className="shadow appearance-none border rounded w-full py-2 px-3 xtext-blue-700 bg-gray-100 mt-2 focus:outline-none focus:shadow-outline"
                  placeholder="Olivia Pope and Associates"
                />
              </div>
              <div className="col-span-4 md:col-span-2 text-left">
                <label className="text-blue-900" htmlFor="account-number">
                  Account Number
                </label>
                <input
                  type="text"
                  className="shadow appearance-none border rounded w-full py-2 px-3 xtext-blue-700 bg-gray-100 mt-2 focus:outline-none focus:shadow-outline"
                  placeholder="0452334316"
                  value={accountNumber}
                  onChange={(e) => setAccountNumber(e.target.value)}
                />
              </div>

              <div className="col-span-5 md:col-span-2 text-left">
                <label className="text-blue-900" htmlFor="bank-name">
                  Bank Name
                </label>
                <select
                  type="text"
                  className="shadow xappearance-none border rounded w-full py-2 px-3 xtext-blue-700 bg-gray-100 mt-2 focus:outline-none focus:shadow-outline"
                  onChange={(e) => setBankName(e.target.value)}
                >
                  <option className="" value={bankName} selected>
                    {bankName}
                  </option>
                  {banks?.map((e) => (
                    <option key={e?.id} value={e?.name}>
                      {e?.name}
                    </option>
                  ))}
                  {/* {approvedBanks.map((e) => {
                    return (
                      <option key={e.id} className="" value={e.name}>
                        {e.name}
                      </option>
                    );
                  })} */}
                </select>
              </div>
              <div className="col-span-3 md:col-span-1 text-left">
                <label className="text-blue-900" htmlFor="sort-code">
                  Sort Code
                </label>
                <input
                  type="text"
                  value={sortCode}
                  onChange={(e) => setSortCode(e.target.value)}
                  className="shadow appearance-none border rounded w-full py-2 px-3 xtext-blue-700 bg-gray-100 mt-2 focus:outline-none focus:shadow-outline"
                  placeholder="325428"
                />
              </div>
            </div>

            <div className="col-span-4 text-left">
              <label className="text-blue-900" htmlFor="bid-scope">
                Description
              </label>
              <br></br>
              <textarea
                value={description}
                className="shadow xappearance-none border rounded w-full py-2 px-3 xtext-blue-700 bg-gray-100 mt-2 focus:outline-none focus:shadow-outline"
                id="bid-scope"
                name="bid-scope"
                onChange={(e) => setDescription(e.target.value)}
              ></textarea>
            </div>
            <div className="col-span-4 text-left">
              <div>Attachement File (PF, .docx, jpg formats)</div>
              <div className="grid grid-cols-4 gap-4">
                <div className="col-span-2 md:col-span-1">
                  <label>TCC:</label>
                  <EditCustomFileUpload
                    input_id="edittcc-file"
                    setTccFile={setTcc}
                  />
                </div>
                <div className="col-span-2 md:col-span-1">
                  <label>ITF:</label>
                  <EditCustomFileUpload
                    input_id="edititf-file"
                    setItfFile={setItf}
                  />
                </div>
                <div className="col-span-2 md:col-span-1">
                  <label>NSITF:</label>
                  <EditCustomFileUpload
                    input_id="editnsitf-file"
                    setNsitfFile={setNsitf}
                  />
                </div>
                <div className="col-span-2 md:col-span-1">
                  <label>BPP:</label>
                  <EditCustomFileUpload
                    input_id="bpp-file"
                    setBppFile={setBpp}
                  />
                </div>
                <div className="col-span-2 md:col-span-1">
                  <label>PENCOM:</label>
                  <EditCustomFileUpload
                    input_id="editpencom-file"
                    setPencomFile={setPencom}
                  />
                </div>
                <div className="col-span-2 md:col-span-1">
                  <label>Sworn Affidavit:</label>
                  <EditCustomFileUpload
                    input_id="editsworn-affidavit-file"
                    setSwornAffidavitFile={setSwornAffidavit}
                  />
                </div>
                <div className="col-span-2 md:col-span-1">
                  <label>Bank Reference Letter:</label>
                  <EditCustomFileUpload
                    input_id="editbank-reference-letter-file"
                    setBankReferenceFile={setBankReference}
                  />
                </div>
                <div className="col-span-2 md:col-span-1">
                  <label>Company Profile:</label>
                  <EditCustomFileUpload
                    input_id="editcompany-profile-file"
                    setCompanyProfileFile={setTechnicalDocument}
                  />
                </div>
                <div className="col-span-2 md:col-span-1">
                  <label>Nemsa:</label>
                  <EditCustomFileUpload
                    input_id="editnemsa-file"
                    setNemsaFile={setNemsa}
                  />
                </div>
                <div className="col-span-2 md:col-span-1">
                  <label>Coren:</label>
                  <EditCustomFileUpload
                    input_id="editcoren-file"
                    setCorenFile={setCoren}
                  />
                </div>
                {/* <div className="col-span-2 md:col-span-1">
                  <label>Signature:</label>
                  <CustomFileUpload input_id="signature-file" />
                </div> */}
              </div>
            </div>
            <button
              type="submit"
              className="md:col-start-4 col-start-3 md:col-span-1 col-span-2 shadow appearance-none border rounded w-full py-2 px-3 text-white button-solidx mt-2 focus:outline-none focus:shadow-outline"
              id="editCompany-button"
              // value="Create Project"
            >
              <FontAwesomeIcon
                icon={updateCompanyIcon}
                className={updateCompanyIconClassname}
              />{" "}
              {updateCompanyHtmlValue}{" "}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
