import React, { useState, useEffect, useRef } from "react";
// import approvedBanks from '../../../../tempDb/approvedBanks';
import people from "../../../../../tempDb/people";
import Multiselect from "multiselect-react-dropdown";
import { toast } from "react-hot-toast";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner, faPlus } from "@fortawesome/free-solid-svg-icons";

async function createTask(credentials) {
  console.log(credentials);

  const userInfoObject = localStorage.getItem("user");
  const userInfo = JSON.parse(userInfoObject);
  console.log(userInfo);
  try {
    const data = await fetch(
      `https://us-central1-terp-338409.cloudfunctions.net/app/api/tasks`,
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

async function getStaffs() {
  //gettoken
  const userInfoObject = localStorage.getItem("user");
  const userInfo = JSON.parse(userInfoObject);
  return fetch(
    "https://us-central1-terp-338409.cloudfunctions.net/app/api/getstaffs",
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    }
  ).then((data) => data.json());
}

export default function AddTask(props) {
  const [createTaskHtmlValue, setCreateTaskHtmlValue] = useState("Create Task");
  const prevCreateTaskHtmlValue = usePrevious(createTaskHtmlValue);

  const [createTaskIcon, setCreateTaskIcon] = useState(faPlus);
  const prevCreateTaskIcon = usePrevious(createTaskIcon);

  const [createTaskIconClassname, setCreateTaskIconClassname] = useState();
  const prevCreateTaskIconClassname = usePrevious(createTaskIconClassname);
  //define the state variables
  const [name, setName] = useState();
  const [scope, setScope] = useState();
  const [assignedTo, setAssignedTo] = useState();
  const [initiatedBy, setInitiatedBy] = useState();
  const [startDate, setStartDate] = useState();
  const [deadline, setDeadline] = useState();
  const [comment, setComment] = useState();
  const [prioritylevel, setPriorityLevel] = useState();
  const [peopleInvolved, setPeopleInvolved] = useState();

  const [stafflist, setStaffList] = useState(); //stores companies list

  useEffect(async () => {
    const userInfoObject = localStorage.getItem("user");
    const userInfo = JSON.parse(userInfoObject);
    console.log(userInfo.name)
    setInitiatedBy(userInfo.name);
  },[]);

  useEffect(async () => {
    let mounted = true;
    const data = await getStaffs();
    console.log(data);
    if (data.status == 403) {
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
      if (mounted) {
        setStaffList(
          data.data.filter((e) => {
            return e.name !== initiatedBy;
          })
        );
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
  }, [initiatedBy]);

  const addPeopleInvolved = (event) => {
    console.log(event);
    console.log(event.map((data) => data.name));
    setPeopleInvolved(event.map((data) => data.name)); //it is an async function
  };

  const removePeopleInvolved = (event) => {
    console.log(event);
    // let filteredArray = biddingCompanies.filter(item => item !== event)
    setPeopleInvolved(event.map((data) => data.name));
    console.log(peopleInvolved);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    document.getElementById("createTask-button").disabled = true;
    setCreateTaskHtmlValue("Processing please wait....");
    setCreateTaskIcon(faSpinner);
    setCreateTaskIconClassname("spinner");
    const data = await createTask({
      name,
      scope,
      assignedTo,
      initiatedBy,
      startDate,
      deadline,
      comment,
      prioritylevel,
      peopleInvolved,
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
      setCreateTaskIconClassname("");
      setCreateTaskIcon(faPlus);
      setCreateTaskHtmlValue("Create Task");
      document.getElementById("createTask-button").disabled = false;
      
    } else if (data.status == 200) {
      toast.success("New Task Created!", {
        duration: 5000,
        icon: "👏",
        position: "top-right",
        style: {
          borderRadius: "10px",
          background: "#333",
          color: "#fff",
        },
      });
      document.getElementById("createTask-form").reset();
      setCreateTaskIconClassname("");
      setCreateTaskIcon(faPlus);
      setCreateTaskHtmlValue("Create Task");
      document.getElementById("createTask-button").disabled = false;
      props.handleShow();
      props.getTasks();
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
      setCreateTaskIconClassname("");
      setCreateTaskIcon(faPlus);
      setCreateTaskHtmlValue("Create Task");
      document.getElementById("createTask-button").disabled = false;
    }
  };

  // var naira_sign = '\u20a6'; z
  // var progress_style = {
  //     width: "90%"
  //   }
  let people_x = [];
  people.map((e) => people_x.push(e.name));
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
            <h1 className=" p-2 pl-5 edit-modal-headr-x">Create New Task</h1>
          </div>
          <form
            className="grid grid-cols-4 grid-row-7 gap-4 px-5 py-6" id="createTask-form"
            onSubmit={handleSubmit}
          >
            <div className="col-span-6 text-left">
              <label className="text-blue-900" htmlFor="task-name">
                Task Name
              </label>
              <br></br>
              <input
                type="text"
                onChange={(e) => setName(e.target.value)}
                className="shadow appearance-none border rounded w-full py-2 px-3 bg-whitex mt-2 focus:outline-none focus:shadow-outline "
                placeholder="Enter Task name"
                id="task-name"
                name="task-name"
                required
              />
            </div>
            <div className="col-span-6 text-left">
              <label className="text-blue-900" htmlFor="scope">
                Scope
              </label>
              <br></br>
              <textarea
                onChange={(e) => setScope(e.target.value)}
                className="shadow xappearance-none border rounded w-full py-2 px-3 xtext-blue-700 bg-gray-100 mt-2 focus:outline-none focus:shadow-outline"
                id="bid-scope"
                name="bid-scope"
                placeholder="Enter Task Scope"
                required
              ></textarea>
            </div>
            {/* <div className="md:col-span-3 col-span-6 text-left">
              <label className="text-blue-900" htmlFor="initiated-by">
                Initiated By
              </label>
              <select
                type="text"
                className="shadow border txt-dark-bluex rounded w-full py-2 px-3 txt- bg-gray-200 mt-2 focus:outline-none focus:shadow-outline"
                id="initiated-by"
                name="initiated-by"
                onChange={(e) => setInitiatedBy(e.target.value)}
              >
                <option value="none"> -- Select Staff -- </option>

                {stafflist?.map((e) => (
                  <option key={e?.id} value={e?.name}>
                    {e?.name}
                  </option>
                ))}
              </select>
            </div> */}
            <div className="col-span-6 text-left">
              <label className="text-blue-900" htmlFor="assigned-to">
                Assigned To
              </label>
              <select
                type="text"
                className="shadow border txt-dark-bluex rounded w-full py-2 px-3 txt- bg-gray-200 mt-2 focus:outline-none focus:shadow-outline"
                id="assigned-to"
                name="assigned-to"
                onChange={(e) => setAssignedTo(e.target.value)}
                required
              >
                <option value="none"> -- Select Staff -- </option>

                {stafflist?.map((e) => (
                  <option key={e?.id} value={e?.name}>
                    {e?.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="col-span-6 text-left">
              <label className="" htmlFor="people-involveed">
                People Involved
              </label>
              <Multiselect
                isObject={true}
                onRemove={(e) => removePeopleInvolved(e)}
                // onKeyPressFn={function noRefCheck() {}}
                // onSearch={function noRefCheck() {}}
                onSelect={(e) => addPeopleInvolved(e)}
                options={stafflist}
                displayValue="name"
              />
            </div>

            <div className="col-span-6 text-left">
              <label htmlFor="task-status">Priority Level</label>
              <select
                type="text"
                className="shadow xappearance-none border rounded w-full py-2 px-3 xtext-blue-700 bg-gray-200 mt-2 focus:outline-none focus:shadow-outline"
                id="username"
                name="username"
                onChange={(e) => setPriorityLevel(e.target.value)}
              >
                <option className="xpass" value="1">
                  1
                </option>
                <option className="xwarn" value="2">
                  2
                </option>
                <option className="xfail" value="3">
                  3
                </option>
              </select>
            </div>

            {/* <div className="col-span-3 text-left">
              <label htmlFor="task-status">Task Status</label>
              <select
                type="text"
                className="shadow xappearance-none border rounded w-full py-2 px-3 xtext-blue-700 bg-gray-200 mt-2 focus:outline-none focus:shadow-outline"
                id="username"
                name="username"
              >
                <option className="xpass" value="active">
                  Active
                </option>
                <option className="xwarn" value="pending">
                  Pending
                </option>
                <option className="xfail" value="completed">
                  Completed
                </option>
              </select>
            </div> */}
            <div className="col-span-3 text-left">
              {/* issue ---should include time also */}
              <label htmlFor="date-created">Start Date</label>
              <input
                type="date"
                className="shadow appearance-none border rounded w-full py-2 px-3 xtext-blue-700 bg-gray-200 mt-2 focus:outline-none focus:shadow-outline"
                id="date-created"
                name="date-created"
                onChange={(e) => setStartDate(e.target.value)}
                required
              />
            </div>
            <div className="col-span-3 text-left">
              {/* issue ---should include time also */}
              <label htmlFor="due-date">Due Date</label>
              <input
                type="date"
                className="shadow appearance-none border rounded w-full py-2 px-3 xtext-blue-700 bg-gray-200 mt-2 focus:outline-none focus:shadow-outline"
                id="due-date"
                name="due-date"
                required
                onChange={(e) => setDeadline(e.target.value)}
              />
            </div>

            <div className="col-span-6 text-left">
              <label htmlFor="remarks">Comment</label>
              <textarea
                className="shadow appearance-none border rounded w-full py-2 px-3 xtext-blue-700 bg-gray-200 mt-2 focus:outline-none focus:shadow-outline"
                id="remarks"
                name="remarks"
                placeholder="Enter Task Remarks"
                onChange={(e) => setComment(e.target.value)}
              ></textarea>
            </div>

            <button
              type="submit"
              className="md:col-start-5 col-end-7 md:col-span-2 col-span-3 shadow appearance-none border rounded w-full py-2 px-3 text-white button-solidx mt-2 focus:outline-none focus:shadow-outline"
              id="createTask-button"
            >
              {" "}
              <FontAwesomeIcon
                icon={createTaskIcon}
                className={createTaskIconClassname}
              />{" "}
              {createTaskHtmlValue}{" "}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
