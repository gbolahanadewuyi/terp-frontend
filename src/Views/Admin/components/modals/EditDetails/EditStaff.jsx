import React, { useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-hot-toast";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner, faPlus } from "@fortawesome/free-solid-svg-icons";

async function updateStaff(credentials, id) {
  console.log(credentials);

  const userInfoObject = localStorage.getItem("user");
  const userInfo = JSON.parse(userInfoObject);
  console.log(userInfo);
  try {
    const data = await fetch(
      `https://us-central1-terp-338409.cloudfunctions.net/app/api/admin/updateStaff?id=${id}`,
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

export default function EditStaff(props) {
  //
  const [updateStaffHtmlValue, setUpdateStaffHtmlValue] =
    useState("Update Staff");
  const [updateStaffIcon, setUpdateStaffIcon] = useState(faPlus);
  const [updateStaffIconClassname, setUpdateStaffIconClassname] = useState();

  // redux variables
  const currentDataStaff = useSelector((state) => state.currentDataStaff);
  //
  const [role, setRole] = useState("");
  const [department, setDepartment] = useState("");
  const [salary, setSalary] = useState("");

  useEffect(async () => {
    setRole(currentDataStaff?.role);
    setDepartment(currentDataStaff?.department);
    setSalary(currentDataStaff?.salary);
  }, [currentDataStaff]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    document.getElementById("updateStaff-button").disabled = true;
    setUpdateStaffHtmlValue("Processing please wait....");
    setUpdateStaffIcon(faSpinner);
    setUpdateStaffIconClassname("spinner");
    const data = await updateStaff(
      {
        role,
        department,
        salary,
      },
      props.id
    );
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
      setUpdateStaffIconClassname("");
      setUpdateStaffIcon(faPlus);
      setUpdateStaffHtmlValue("Update Staff");
      document.getElementById("updateStaff-button").disabled = false;
    } else if (data.status == 200) {
      toast.success("Staff Info Updated!", {
        icon: "👏",
        duration: 5000,
        position: "top-right",
        style: {
          borderRadius: "10px",
          background: "#333",
          color: "#fff",
        },
      });
      document.getElementById("updateStaff-form").reset();
      setUpdateStaffIconClassname("");
      setUpdateStaffIcon(faPlus);
      setUpdateStaffHtmlValue("Update Staff");
      document.getElementById("updateStaff-button").disabled = false;
      props.handleShow();
      props.getStaffDetail(props.id);
    } else {
      toast.error(`Server error, please check your network connection`, {
        icon: "😞",
        duration: 5000,
        position: "top-right",
        style: {
          borderRadius: "10px",
          background: "#333",
          color: "#fff",
        },
      });
      setUpdateStaffIconClassname("");
      setUpdateStaffIcon(faPlus);
      setUpdateStaffHtmlValue("Update Staff");
      document.getElementById("updateStaff-button").disabled = false;
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
                width="30px"
                height="30px"
              >
                {" "}
                <path d="M 7 4 C 6.744125 4 6.4879687 4.0974687 6.2929688 4.2929688 L 4.2929688 6.2929688 C 3.9019687 6.6839688 3.9019687 7.3170313 4.2929688 7.7070312 L 11.585938 15 L 4.2929688 22.292969 C 3.9019687 22.683969 3.9019687 23.317031 4.2929688 23.707031 L 6.2929688 25.707031 C 6.6839688 26.098031 7.3170313 26.098031 7.7070312 25.707031 L 15 18.414062 L 22.292969 25.707031 C 22.682969 26.098031 23.317031 26.098031 23.707031 25.707031 L 25.707031 23.707031 C 26.098031 23.316031 26.098031 22.682969 25.707031 22.292969 L 18.414062 15 L 25.707031 7.7070312 C 26.098031 7.3170312 26.098031 6.6829688 25.707031 6.2929688 L 23.707031 4.2929688 C 23.316031 3.9019687 22.682969 3.9019687 22.292969 4.2929688 L 15 11.585938 L 7.7070312 4.2929688 C 7.5115312 4.0974687 7.255875 4 7 4 z" />
              </svg>
            </div>
            <h1 className=" p-2 pl-5 edit-modal-headr-x">Edit Staff</h1>
          </div>

          <form
            className="grid grid-cols-3 gap-4 px-10 py-6"
            onSubmit={handleSubmit}
            id="updateStaff-form"
          >
            <div className="col-span-3 text-left">
              <label className="text-blue-900" htmlFor="role">
                Role
              </label>
              <br></br>
              <input
                type="text"
                className="shadow appearance-none border rounded w-full py-2 px-3 xtext-blue-700 bg-gray-100 mt-2 focus:outline-none focus:shadow-outline "
                placeholder="Enter Staffs Role"
                id="role"
                name="role"
                value={role}
                onChange={(e) => setRole(e.target.value)}
              />
            </div>
            <div className="col-span-3 text-left">
              <label className="text-blue-900" htmlFor="department">
                Department
              </label>
              <br></br>
              <input
                type="text"
                className="shadow appearance-none border rounded w-full py-2 px-3 xtext-blue-700 bg-gray-100 mt-2 focus:outline-none focus:shadow-outline "
                placeholder="Enter Staff's Department"
                id="department"
                name="department"
                value={department}
                onChange={(e) => setDepartment(e.target.value)}
              />
            </div>
            <div className="col-span-3 text-left">
              <label className="text-blue-900" htmlFor="salary">
                Salary:
              </label>
              <input
                type="text"
                className="shadow appearance-none border rounded w-full py-2 px-3 xtext-blue-700 bg-gray-100 mt-2 focus:outline-none focus:shadow-outline"
                id="salary"
                placeholder="Enter Staff's Salary"
                name="salary"
                value={salary}
                onChange={(e) => setSalary(e.target.value)}
              />
            </div>

            <button
              type="submit"
              className="md:col-start-3 col-start-2 md:col-span-1 col-span-2 shadow appearance-none border rounded w-full py-2 px-3 text-white button-solidx mt-2 focus:outline-none focus:shadow-outline"
              id="updateStaff-button"
            >
              {" "}
              <FontAwesomeIcon
                icon={updateStaffIcon}
                className={updateStaffIconClassname}
              />{" "}
              {updateStaffHtmlValue}{" "}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
