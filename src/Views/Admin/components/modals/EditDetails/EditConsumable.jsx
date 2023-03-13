import React, { useState, useEffect, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner, faPlus } from "@fortawesome/free-solid-svg-icons";
import { toast } from "react-hot-toast";

async function getEquipment(id) {
  //gettoken
  const userInfoObject = localStorage.getItem("user");
  const userInfo = JSON.parse(userInfoObject);
  console.log(userInfo);
  return fetch(
    `https://us-central1-terp-338409.cloudfunctions.net/app/api/getequipment?id=${id}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    }
  ).then((data) => data.json());
}

async function updateEquipment(credentials, id) {
  console.log(credentials);

  const userInfoObject = localStorage.getItem("user");
  const userInfo = JSON.parse(userInfoObject);
  console.log(userInfo);
  try {
    const data = await fetch(
      `https://us-central1-terp-338409.cloudfunctions.net/app/api/updateEquipment?id=${id}`,
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


export default function EditConsumable(props) {
  const [updateEquipHtmlValue, setUpdateEquipHtmlValue] =
    useState("Update Consumable");
  const [updateEquipIcon, setUpdateEquipIcon] = useState(faPlus);
  const [updateEquipIconClassname, setUpdateEquipIconClassname] = useState();
  

  const [category, setCategory] = useState();
  const [item, setItem] = useState();
  const [stock, setStock] = useState();
  const [latestPrice, setLatestPrice] = useState();
  const [lastPurchaseDate, setLastPurchaseDate] = useState();
  const [vendor, setVendor] = useState();
  const [vendorLocation, setVendorLocation] = useState();
  const [vendorContact, setVendorContact] = useState();

  useEffect(async () => {
    if (!props.id) {
      console.log("no id");
      return null;
    }
    console.log(props.id);
    let mounted = true;
    const data = await getEquipment(props.id);
    console.log(data);
    if (data.status == 403) {
      props.updateUser({});
    } else if (data.status == 400) {
      console.log("error");
    } else if (data.status == 200) {
      if (mounted) {
        setCategory(data.category);
        setItem(data.data.item);
        setStock(data.data.stock);
        setLatestPrice(data.data.latestPrice);
        setLastPurchaseDate(data.data.lastPurchaseDate);
        setVendor(data.data.vendor);
        setVendorLocation(data.data.vendorLocation);
        setVendorContact(data.data.vendorContact);
        return () => (mounted = false);
      }
    } else {
      //do nothing
    }
  }, [props.id]);


  const handleSubmit = async (e) => {
    e.preventDefault();
    document.getElementById("update-button").disabled = true;
    setUpdateEquipHtmlValue("Processing please wait....");
    setUpdateEquipIcon(faSpinner);
    setUpdateEquipIconClassname("spinner");
    const data = await updateEquipment({
      category,
      item,
      stock,
      latestPrice,
      lastPurchaseDate,
      vendor,
      vendorLocation,
      vendorContact,
    }, props.id);
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
      setUpdateEquipIconClassname("");
      setUpdateEquipIcon(faPlus);
      setUpdateEquipHtmlValue("Update Consumable");
      document.getElementById("update-button").disabled = false;
    } else if (data.status == 200) {
      toast.success("Consumable Updated Successfully!", {
        duration: 5000,
        icon: "👏",
        position: "top-right",
        style: {
          borderRadius: "10px",
          background: "#333",
          color: "#fff",
        },
      });
      setUpdateEquipIconClassname("");
      setUpdateEquipIcon(faPlus);
      setUpdateEquipHtmlValue("Update Consumable");
      document.getElementById("UpdateEquip-form").reset();
      document.getElementById("update-button").disabled = false;
      props.handleShow();
      props.getEquipments();
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
      setUpdateEquipIconClassname("");
      setUpdateEquipIcon(faPlus);
      setUpdateEquipHtmlValue("Update Consumable");
      document.getElementById("update-button").disabled = false;
    }
  };

  // var naira_sign = '\u20a6'; z
  // var progress_style = {
  //     width: "90%"
  //   }
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
            <h1 className=" p-2 pl-5 edit-modal-headr-x">Edit Consumables</h1>
          </div>

          <form className="grid grid-cols-6 grid-row-7 gap-4 px-10 py-6" id="UpdateEquip-form" onSubmit={handleSubmit}>
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
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
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
                value={item}
                onChange={(e) => setItem(e.target.value)}
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
                value={stock}
                onChange={(e) => setStock(e.target.value)}
              />
            </div>
            <div className="col-span-3 text-left">
              <label className="text-blue-900" htmlFor="latest-price">
                Latest Price
              </label>
              <input
                type="text"
                className="shadow appearance-none border rounded w-full py-2 px-3 xtext-blue-700 bg-gray-100 mt-2 focus:outline-none focus:shadow-outline"
                id="latest-price"
                placeholder="₦ 784,320"
                name="latest-price"
                value={latestPrice}
                onChange={(e) => setLatestPrice(e.target.value)}
              />
            </div>
            <div className="col-span-3 text-left">
              <label
                className="text-blue-900"
                htmlFor="last-purchase-date whitespace-nowrap"
              >
                Last Purchase Date
              </label>
              <input
                type="date"
                className="shadow appearance-none border rounded w-full py-2 px-3 xtext-blue-700 bg-gray-100 mt-2 focus:outline-none focus:shadow-outline"
                id="last-purchase-date"
                placeholder="TRF/NIG/31/2021"
                name="last-purchase-date"
                value={lastPurchaseDate}
                onChange={(e) => setLastPurchaseDate(e.target.value)}
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
                  id=""
                  placeholder=""
                  name=""
                  value={vendor}
                  onChange={(e) => setVendor(e.target.value)}
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
                value={vendorLocation}
                onChange={(e) => setVendorLocation(e.target.value)}
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
                type="text"
                className="shadow appearance-none border rounded w-full py-2 px-3 xtext-blue-700 bg-gray-100 mt-2 focus:outline-none focus:shadow-outline"
                id="last-purchase-date"
                placeholder=""
                name="last-purchase-date"
                value={vendorContact}
                onChange={(e) => setVendorContact(e.target.value)}
              />
            </div>

            <button
              type="submit"
              className="md:col-start-5 col-end-7 md:col-span-2 col-span-3 shadow appearance-none border rounded w-full py-2 px-3 text-white button-solidx mt-2 focus:outline-none focus:shadow-outline"
              id="update-button"
            >
             <FontAwesomeIcon
                icon={updateEquipIcon}
                className={updateEquipIconClassname}
              />{" "}
              {updateEquipHtmlValue}{" "}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
