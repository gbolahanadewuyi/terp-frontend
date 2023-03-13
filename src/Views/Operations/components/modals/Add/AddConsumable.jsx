import React, { useState, useEffect, useRef } from "react";
import { toast } from "react-hot-toast";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner, faPlus } from "@fortawesome/free-solid-svg-icons";

async function createEquipment(credentials) {
  console.log(credentials);

  const userInfoObject = localStorage.getItem("user");
  const userInfo = JSON.parse(userInfoObject);
  console.log(userInfo);
  try {
    const data = await fetch(
      `https://us-central1-terp-338409.cloudfunctions.net/app/api/createEquipments`,
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




export default function AddConsumable(props) {
  const [createEquipHtmlValue, setCreateEquipHtmlValue] = useState("Create Equipment");
  const [createEquipIcon, setCreateEquipIcon] = useState(faPlus);
  const [createEquipIconClassname, setCreateEquipIconClassname] = useState();


  const [category, setCategory] = useState();
  const [item, setItem] = useState();
  const [stock, setStock] = useState();
  const [latestPrice, setLatestPrice] = useState();
  const [lastPurchaseDate, setLastPurchaseDate] = useState();
  const [vendor, setVendor] = useState();
  const [vendorLocation, setVendorLocation] = useState();
  const [vendorContact, setVendorContact] = useState();

  const handleSubmit = async (e) => {
    e.preventDefault();
    document.getElementById("createEquipment-button").disabled = true
    setCreateEquipHtmlValue("Processing please wait....");
    setCreateEquipIcon(faSpinner);
    setCreateEquipIconClassname("spinner");
    const data = await createEquipment({
      category,
      item,
      stock,
      latestPrice,
      lastPurchaseDate,
      vendor,
      vendorLocation,
      vendorContact,
    });
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
      setCreateEquipIconClassname("");
      setCreateEquipIcon(faPlus);
      setCreateEquipHtmlValue("Create Company");
      document.getElementById("createEquipment-button").disabled = false
    } else if (data.status == 200) {
      toast.success("New Consumable Created!", {
        duration: 5000,
        icon: "👏",
        position: "top-right",
        style: {
          borderRadius: "10px",
          background: "#333",
          color: "#fff",
        },
      });
      document.getElementById("addEquip-form").reset();
      setCreateEquipIconClassname("");
      setCreateEquipIcon(faPlus);
      setCreateEquipHtmlValue("Create Company");
      document.getElementById("createEquipment-button").disabled = false
      props.handleShow();
      props.getEquipments();
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
      setCreateEquipIconClassname("");
      setCreateEquipIcon(faPlus);
      setCreateEquipHtmlValue("Create Company");
      document.getElementById("createEquipment-button").disabled = false
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
            <h1 className=" p-2 pl-5 edit-modal-headr-x">Add New Consumable</h1>
          </div>
          <form
            className="grid grid-cols-4 grid-row-7 gap-4 px-5 py-6"
            onSubmit={handleSubmit}
            id="addEquip-form"
          >
            <div className="col-span-3 text-left">
              <label className="text-blue-900" htmlFor="equipment-name">
                Category
              </label>
              <br></br>
              <select
                type="text"
                className="shadow xappearance-none border rounded w-full py-2 px-3 xtext-blue-700 bg-gray-200 mt-2 focus:outline-none focus:shadow-outline"
                id="equipment-name"
                name="equipment-name"
                onChange={(e) => setCategory(e.target.value)}
              >
                <option className="xpass" value="N/A" selected>
                  Select Category
                </option>
                <option className="xpass" value="Stationary">
                  Stationary
                </option>
                <option className="xwarn" value="Mechanical">
                  Mechanical
                </option>
                <option className="xfail" value="Interior">
                  Interior
                </option>
              </select>
            </div>
            <div className="col-span-3 text-left">
              <label className="text-blue-900" htmlFor="equipment-name">
                Item Description
              </label>
              <br></br>
              <input
                type="text"
                className="shadow appearance-none border rounded w-full py-2 px-3 xtext-blue-700 bg-gray-100 mt-2 focus:outline-none focus:shadow-outline "
                placeholder="Enter Equipment Name"
                id="equipment-name"
                name="equipment-name"
                onChange={(e) => setItem(e.target.value)}
                required
              />
            </div>

            <div className="col-span-3 text-left">
              <label className="text-blue-900" htmlFor="stock">
                Stock(Quantity)
              </label>
              <input
                type="text"
                className="shadow appearance-none border rounded w-full py-2 px-3 xtext-blue-700 bg-gray-100 mt-2 focus:outline-none focus:shadow-outline"
                id="stock"
                placeholder="13 Cartons"
                name="stock"
                onChange={(e) => setStock(e.target.value)}
                required
              />
            </div>
            <div className="col-span-3 text-left">
              <label className="text-blue-900" htmlFor="latest-price">
                Latest Price
              </label>
              <input
                type="number"
                className="shadow appearance-none border rounded w-full py-2 px-3 xtext-blue-700 bg-gray-100 mt-2 focus:outline-none focus:shadow-outline"
                id="latest-price"
                placeholder="₦ 784,320"
                name="latest-price"
                onChange={(e) => setLatestPrice(e.target.value)}
              />
            </div>
            <div className="col-span-3 text-left">
              <label
                className="text-blue-900"
                htmlFor="last-purchase-date whitespace-nowrap"
              >
                Latest Purchase Date
              </label>
              <input
                type="date"
                className="shadow appearance-none border rounded w-full py-2 px-3 xtext-blue-700 bg-gray-100 mt-2 focus:outline-none focus:shadow-outline"
                id="last-purchase-date"
                placeholder="1"
                name="last-purchase-date"
                onChange={(e) => setLastPurchaseDate(e.target.value)}
                required
              />
            </div>

            <div className="col-span-3 text-left">
              <label
                className="text-blue-900"
                htmlFor="last-purchase-date whitespace-nowrap"
              >
                Vendor
              </label>
              <input
                type="text"
                className="shadow appearance-none border rounded w-full py-2 px-3 xtext-blue-700 bg-gray-100 mt-2 focus:outline-none focus:shadow-outline"
                id="Vendor"
                placeholder=""
                name="Vendor"
                onChange={(e) => setVendor(e.target.name)}
                required
              />
            </div>

            <div className="col-span-3 text-left">
              <label
                className="text-blue-900"
                htmlFor="last-purchase-date whitespace-nowrap"
              >
                Vendor Location
              </label>
              <input
                type="text"
                className="shadow appearance-none border rounded w-full py-2 px-3 xtext-blue-700 bg-gray-100 mt-2 focus:outline-none focus:shadow-outline"
                id="last-purchase-date"
                placeholder=""
                name=""
                onChange={(e) => setVendorLocation(e.target.value)}
                required
              />
            </div>

            <div className="col-span-3 text-left">
              <label
                className="text-blue-900"
                htmlFor="last-purchase-date whitespace-nowrap"
              >
                Vendor Contact
              </label>
              <input
                type="number"
                className="shadow appearance-none border rounded w-full py-2 px-3 xtext-blue-700 bg-gray-100 mt-2 focus:outline-none focus:shadow-outline"
                id="last-purchase-date"
                placeholder=""
                name="last-purchase-date"
                onChange={(e) => setVendorContact(e.target.value)}
                required
              />
            </div>

            <button
              type="submit"
              className="md:col-start-5 col-span-7 md:col-span-2 col-span-3 shadow appearance-none border rounded w-full py-2 px-3 text-white button-solidx mt-2 focus:outline-none focus:shadow-outline"
              id="createEquipment-button"
              value="Create Project"
            >
              <FontAwesomeIcon
                icon={createEquipIcon}
                className={createEquipIconClassname}
              />{" "}
              {createEquipHtmlValue}{" "}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
