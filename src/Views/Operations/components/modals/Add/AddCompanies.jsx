import React, { useState, useEffect, useRef } from "react";
import approvedBanks from "../../../../../tempDb/approvedBanks";
import CustomFileUpload from "../../dash/CustomFileUpload";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner, faPlus } from "@fortawesome/free-solid-svg-icons";
import { Toaster, toast } from "react-hot-toast";

async function company(credentials) {
  console.log(credentials);

  const userInfoObject = localStorage.getItem("user");
  const userInfo = JSON.parse(userInfoObject);
  console.log(userInfo);
  try {
    const data = await fetch(
      `https://us-central1-terp-338409.cloudfunctions.net/app/api/company`,
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

export default function AddCompanies(props) {
  const [createCompanyHtmlValue, setCreateCompanyHtmlValue] =
    useState("Create Company");
  const [createCompanyIcon, setCreateCompanyIcon] = useState(faPlus);
  const [createCompanyIconClassname, setCreateCompanyIconClassname] =
    useState();

  const [name, setName] = useState();
  const [rcNumber, setRcNumber] = useState();
  const [address, setAddress] = useState();
  const [email, setEmail] = useState();
  const [phone, setPhone] = useState();
  const [accountName, setAccountName] = useState();
  const [accountNumber, setAccountNumber] = useState();
  const [tin, setTin] = useState();
  const [bankName, setBankName] = useState();
  const [sortCode, setSortCode] = useState();
  const [description, setDescription] = useState();
  const [tcc, setTcc] = useState();
  const [itf, setItf] = useState();
  const [nsitf, setNsitf] = useState();
  const [bpp, setBpp] = useState();
  const [pencom, setPencom] = useState();
  const [swornAffidavit, setSwornAffidavit] = useState();
  const [bankReference, setBankReference] = useState();
  const [technicalDocument, setTechnicalDocument] = useState();
  const [nemsa, setNemsa] = useState();
  const [coren, setCoren] = useState();

  const handleSubmit = async (e) => {
    e.preventDefault();
    document.getElementById("addCompany-button").disabled = true;
    setCreateCompanyHtmlValue("Processing please wait....");
    setCreateCompanyIcon(faSpinner);
    setCreateCompanyIconClassname("spinner");
    const data = await company({
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
      swornAffidavit,
      bankReference,
    });
    console.log(data);
    if (data.status == 403) {
      toast.error(`${data.message}`, {
        icon: "😞",
        duration: 5000,
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
        duration: 5000,
        position: "top-right",
        style: {
          borderRadius: "10px",
          background: "#333",
          color: "#fff",
        },
      });
      setCreateCompanyIconClassname("");
      setCreateCompanyIcon(faPlus);
      setCreateCompanyHtmlValue("Create Company");
      document.getElementById("addCompany-button").disabled = false;
    } else if (data.status == 200) {
      toast.success("New Company Created!", {
        duration: 5000,
        icon: "👏",
        position: "top-right",
        style: {
          borderRadius: "10px",
          background: "#333",
          color: "#fff",
        },
      });
      setCreateCompanyIconClassname("");
      setCreateCompanyIcon(faPlus);
      setCreateCompanyHtmlValue("Create Company");
      document.getElementById("addCompany-form").reset();
      document.getElementById("addCompany-button").disabled = false;
      props.handleShow();
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
      setCreateCompanyIconClassname("");
      setCreateCompanyIcon(faPlus);
      setCreateCompanyHtmlValue("Create Company");
      document.getElementById("addCompany-button").disabled = false;
    }
  };

  return (
    <div className={props.show}>
      <div className="xback-board txt-dark-bluex">
        <div className="modal-inner-edit-x">
          <div className="modal-edit-head-v2 relative">
            <div className="w-full" onClick={props.handleShow}>
              <svg
                className="xsvg-close absolute top-2 right-2"
                fill="#fff"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 30 30"
                width="30px"
                height="30px"
              >
                {" "}
                <path d="M 7 4 C 6.744125 4 6.4879687 4.0974687 6.2929688 4.2929688 L 4.2929688 6.2929688 C 3.9019687 6.6839688 3.9019687 7.3170313 4.2929688 7.7070312 L 11.585938 15 L 4.2929688 22.292969 C 3.9019687 22.683969 3.9019687 23.317031 4.2929688 23.707031 L 6.2929688 25.707031 C 6.6839688 26.098031 7.3170313 26.098031 7.7070312 25.707031 L 15 18.414062 L 22.292969 25.707031 C 22.682969 26.098031 23.317031 26.098031 23.707031 25.707031 L 25.707031 23.707031 C 26.098031 23.316031 26.098031 22.682969 25.707031 22.292969 L 18.414062 15 L 25.707031 7.7070312 C 26.098031 7.3170312 26.098031 6.6829688 25.707031 6.2929688 L 23.707031 4.2929688 C 23.316031 3.9019687 22.682969 3.9019687 22.292969 4.2929688 L 15 11.585938 L 7.7070312 4.2929688 C 7.5115312 4.0974687 7.255875 4 7 4 z" />
              </svg>
            </div>
            <h1 className=" p-2 pl-5 edit-modal-headr-x">Add New Company</h1>
          </div>
          <form
            className="grid grid-cols-4 grid-row-7 gap-4 px-5 py-6"
            onSubmit={handleSubmit}
            id="addCompany-form"
          >
            <div className="col-span-2 text-left">
              <label className="text-blue-900" htmlFor="company-name">
                Company Name
              </label>
              <br></br>
              <input
                type="text"
                className="shadow appearance-none border rounded w-full py-2 px-3 xtext-blue-700 bg-gray-100 mt-2 focus:outline-none focus:shadow-outline "
                placeholder="Enter Company Name"
                id="company-name"
                name="company-name"
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            <div className="col-span-2 text-left">
              <label className="text-blue-900" htmlFor="company-address">
                Address
              </label>
              <br></br>
              <input
                type="text"
                className="shadow appearance-none border rounded w-full py-2 px-3 xtext-blue-700 bg-gray-100 mt-2 focus:outline-none focus:shadow-outline "
                placeholder="Enter Company's Address"
                id="company-address"
                name="company-address"
                onChange={(e) => setAddress(e.target.value)}
                
              />
            </div>
            <div className="col-span-2 md:col-span-1 text-left">
              <label className="text-blue-900" htmlFor="email">
                Email Address
              </label>
              <input
                type="text"
                className="shadow appearance-none border rounded w-full py-2 px-3 xtext-blue-700 bg-gray-100 mt-2 focus:outline-none focus:shadow-outline"
                id="email"
                placeholder="teremaxe@gmail.com"
                name="email"
                onChange={(e) => setEmail(e.target.value)}
                
              />
            </div>
            <div className="col-span-2 md:col-span-1 text-left">
              <label className="text-blue-900" htmlFor="contact-number">
                Contact Number
              </label>
              <input
                type="number"
                className="shadow appearance-none border rounded w-full py-2 px-3 xtext-blue-700 bg-gray-100 mt-2 focus:outline-none focus:shadow-outline"
                id="contact-number"
                placeholder="09065325428"
                name="contact-number"
                onChange={(e) => setPhone(e.target.value)}
                
              />
            </div>
            <div className="col-span-2 md:col-span-1 text-left">
              <label className="text-blue-900" htmlFor="rc-number">
                RC Number
              </label>
              <input
                type="text"
                className="shadow appearance-none border rounded w-full py-2 px-3 xtext-blue-700 bg-gray-100 mt-2 focus:outline-none focus:shadow-outline"
                id="rc-number"
                placeholder="TRF/NIG/31/2021"
                name="rc-number"
                onChange={(e) => setRcNumber(e.target.value)}
                
              />
            </div>
            <div className="col-span-2 md:col-span-1 text-left">
              <label className="text-blue-900" htmlFor="tax-id-number">
                Tax Identification No.
              </label>
              <input
                type="text"
                className="shadow appearance-none border rounded w-full py-2 px-3 xtext-blue-700 bg-gray-100 mt-2 focus:outline-none focus:shadow-outline"
                id="tax-id-number"
                placeholder="FIRS/TIN/32312021"
                name="tax-id-number"
                onChange={(e) => setTin(e.target.value)}
                
              />
            </div>
            <div className="col-span-4 grid grid-cols-8 gap-4">
              <div className="col-span-4 md:col-span-3 text-left">
                <label className="text-blue-900" htmlFor="account-name">
                  Account Name
                </label>
                <input
                  type="text"
                  className="shadow appearance-none border rounded w-full py-2 px-3 xtext-blue-700 bg-gray-100 mt-2 focus:outline-none focus:shadow-outline"
                  id="account-name"
                  placeholder="Olivia Pope and Associates"
                  name="account-name"
                  onChange={(e) => setAccountName(e.target.value)}
                />
              </div>
              <div className="col-span-4 md:col-span-2 text-left">
                <label className="text-blue-900" htmlFor="account-number">
                  Account Number
                </label>
                <input
                  type="text"
                  className="shadow appearance-none border rounded w-full py-2 px-3 xtext-blue-700 bg-gray-100 mt-2 focus:outline-none focus:shadow-outline"
                  id="account-number"
                  placeholder="0452334316"
                  name="account-number"
                  onChange={(e) => setAccountNumber(e.target.value)}
                />
              </div>

              <div className="col-span-4 md:col-span-2 text-left">
                <label className="text-blue-900" htmlFor="bank-name">
                  Bank Name
                </label>
                <select
                  type="text"
                  className="shadow xappearance-none border rounded w-full py-2 px-3 xtext-blue-700 bg-gray-100 mt-2 focus:outline-none focus:shadow-outline"
                  id="bank-name"
                  name="bank-name"
                  onChange={(e) => setBankName(e.target.value)}
                >
                  {approvedBanks.map((e) => {
                    return (
                      <option key={e.id} className="" value={e.name}>
                        {e.name}
                      </option>
                    );
                  })}
                </select>
              </div>
              <div className="col-span-4 md:col-span-1 text-left">
                <label className="text-blue-900" htmlFor="sort-code">
                  Sort Code
                </label>
                <input
                  type="text"
                  className="shadow appearance-none border rounded w-full py-2 px-3 xtext-blue-700 bg-gray-100 mt-2 focus:outline-none focus:shadow-outline"
                  id="sort-code"
                  placeholder="325428"
                  name="sort-code"
                  onChange={(e) => setSortCode(e.target.value)}
                />
              </div>
            </div>
            <div className="col-span-4 text-left">
              <label className="text-blue-900" htmlFor="bid-scope">
                Description
              </label>
              <br></br>
              <textarea
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
                  <CustomFileUpload input_id="tcc-file" setTccFile={setTcc} />
                </div>
                <div className="col-span-2 md:col-span-1">
                  <label>ITF:</label>
                  <CustomFileUpload input_id="itf-file" setItfFile={setItf} />
                </div>
                <div className="col-span-2 md:col-span-1">
                  <label>NSITF:</label>
                  <CustomFileUpload
                    input_id="nsitf-file"
                    setNsitfFile={setNsitf}
                  />
                </div>
                <div className="col-span-2 md:col-span-1">
                  <label>BPP:</label>
                  <CustomFileUpload input_id="bpp-file" setBppFile={setBpp} />
                </div>
                <div className="col-span-2 md:col-span-1">
                  <label>PENCOM:</label>
                  <CustomFileUpload
                    input_id="pencom-file"
                    setPencomFile={setPencom}
                  />
                </div>
                <div className="col-span-2 md:col-span-1">
                  <label>Sworn Affidavit:</label>
                  <CustomFileUpload
                    input_id="sworn-affidavit-file"
                    setSwornAffidavitFile={setSwornAffidavit}
                  />
                </div>
                <div className="col-span-2 md:col-span-1">
                  <label>Bank Reference Letter:</label>
                  <CustomFileUpload
                    input_id="bank-reference-letter-file"
                    setBankReferenceFile={setBankReference}
                  />
                </div>
                <div className="col-span-2 md:col-span-1">
                  <label>Company Profile:</label>
                  <CustomFileUpload
                    input_id="company-profile-file"
                    setCompanyProfileFile={setTechnicalDocument}
                  />
                </div>
                <div className="col-span-2 md:col-span-1">
                  <label>Nemsa:</label>
                  <CustomFileUpload
                    input_id="nemsa-file"
                    setNemsaFile={setNemsa}
                  />
                </div>
                <div className="col-span-2 md:col-span-1">
                  <label>Coren:</label>
                  <CustomFileUpload
                    input_id="coren-file"
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
              id="addCompany-button"

            >
              <FontAwesomeIcon
                icon={createCompanyIcon}
                className={createCompanyIconClassname}
              />{" "}
              {createCompanyHtmlValue}{" "}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
