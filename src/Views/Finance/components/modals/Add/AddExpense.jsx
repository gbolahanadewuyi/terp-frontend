import React, { useState, useEffect, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner, faPlus } from "@fortawesome/free-solid-svg-icons";
import { toast } from "react-hot-toast";

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

async function getProjects() {
  //gettoken
  const userInfoObject = localStorage.getItem("user");
  const userInfo = JSON.parse(userInfoObject);
  return fetch(
    "https://us-central1-terp-338409.cloudfunctions.net/app/api/getprojects",
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    }
  ).then((data) => data.json());
}

async function addExpenses(credentials) {
  console.log(credentials);

  const userInfoObject = localStorage.getItem("user");
  const userInfo = JSON.parse(userInfoObject);
  console.log(userInfo);
  try {
    const data = await fetch(
      `https://us-central1-terp-338409.cloudfunctions.net/app/api/expenses`,
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

export default function AddExpense(props) {
  const [isProject, setIsProject] = useState(false);



  const [addExpensesHtmlValue, setAddExpensesHtmlValue] =
    useState("Save Expenses")
  const [addExpensesIcon, setAddExpensesIcon] = useState(faPlus);
  const [addExpensesIconClassname, setAddExpensesIconClassname] = useState();
  

  const [description, setDescription] = useState();
  const [category, setCategory] = useState();
  const [date, setDate] = useState();
  const [amount, setAmount] = useState();
  const [projectId, setProjectId] = useState();
  const [authorisedByTemp, setAuthorisedByTemp] = useState([]);
  const [authorisedBy, setAuthorisedBy] = useState();

  const [projects, setProjects] = useState([]);
  const [staffs, setStaffList] = useState([])

  const handleCategoryChange = (category) => {
    setCategory(category);
   if (category === "Project") {
     setIsProject(true);
   } else {
     setIsProject(false);
   }
 };

 const handleAuthorisedPersonChange = (value) => {
  setAuthorisedByTemp(
          staffs.filter((e) => {
            return e.id == value;
          })
        );
 }

 useEffect(async()=>{
   console.log(category)
 },[category])

 useEffect(async()=>{
  console.log(authorisedByTemp)
  setAuthorisedBy(authorisedByTemp[0]?.name)
},[authorisedByTemp])

// useEffect(async()=>{
//   console.log(authorisedBy)
// },[authorisedBy])

  useEffect(async () => {
    let mounted = true;
    const data = await getProjects();
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
        setProjects(data.data);
        // setProjects(
        //   data.data.filter((e) => {
        //     return e.id !== projectId;
        //   })
        // );
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
  }, []);

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
        setStaffList(data.data)
        // setStaffList(
        //   data.data.filter((e) => {
        //     return e.name !== initiatedBy;
        //   })
        // );
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
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    document.getElementById("createExpense-button").disabled = false;
    setAddExpensesHtmlValue("Processing please wait....");
    setAddExpensesIcon(faSpinner);
    setAddExpensesIconClassname("spinner");
    const data = await addExpenses({
      description,
      category,
      date,
      amount,
      projectId,
      authorisedBy
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
      setAddExpensesIconClassname("");
      setAddExpensesIcon(faPlus);
      setAddExpensesHtmlValue("Save Expenses");
      document.getElementById("createExpense-button").disabled = false;
    } else if (data.status == 200) {
      toast.success(data.message, {
        duration: 5000,
        icon: "👏",
        position: "top-right",
        style: {
          borderRadius: "10px",
          background: "#333",
          color: "#fff",
        },
      });
      document.getElementById("AddExpenses-form").reset();
      setAddExpensesIconClassname("");
      setAddExpensesIcon(faPlus);
      setAddExpensesHtmlValue("Save Expenses");
      document.getElementById("createExpense-button").disabled = false;
      props.handleShow();
      props.getExpenses();
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
      setAddExpensesIconClassname("");
      setAddExpensesIcon(faPlus);
      setAddExpensesHtmlValue("Save Expenses");
      document.getElementById("createExpense-button").disabled = false;
    }
  };

  return (
    <div className={props.show}>
      <div className="xback-board txt-dark-bluex relative">
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
            <h1 className=" p-2 pl-5 edit-modal-headr-x">Add New Expense</h1>
          </div>
          <form
            className="grid grid-cols-4 gap-4 px-6 py-6"
            id="AddExpenses-form"
            onSubmit={handleSubmit}
          >
            <div className="col-span-4 text-left">
              <label className="" htmlFor="category">
                Category
              </label>
              <select
                className="shadow border rounded w-full py-2 px-3 bg-gray-100 mt-2 focus:outline-none focus:shadow-outline"
                id="category"
                placeholder="Select Category"
                name="category"
                // defaultValue={category}
                onChange={(e) => handleCategoryChange(e.target.value)}
                required
              >
                <option value="N/A">Select Category</option>
                <option value="Transportation">Transportation</option>
                <option value="Flight">Flight</option>
                <option value="Project">Project</option>
                <option value="Electricity">Electricity</option>
                <option value="Welfare">Welfare</option>
                <option value="Stationary">Stationary</option>
                <option value="Internet">Internet</option>
                {/* {expense_category.map((e) => {
                  return (
                    <option key={e.id} value={e}>
                      {e}
                    </option>
                  );
                })} */}
              </select>
            </div>
            <div className="col-span-4 text-left">
              <label className="text-blue-900" htmlFor="expense_description">
                Description
              </label>
              <br></br>
              <input
                type="text"
                className="shadow appearance-none border rounded w-full py-2 px-3 xtext-blue-700 bg-gray-100 mt-2 focus:outline-none focus:shadow-outline "
                placeholder="Enter Expense Description"
                id="expense_description"
                name="expense_description"
                onChange={(e) => setDescription(e.target.value)}
                required
              />
            </div>
            <div className="col-span-2 text-left">
              <label className="text-blue-900" htmlFor="amount">
                Amount
              </label>
              <br></br>
              <input
                type="text"
                className="shadow appearance-none border rounded w-full py-2 px-3 xtext-blue-700 bg-gray-100 mt-2 focus:outline-none focus:shadow-outline "
                placeholder="Enter Amount"
                id="amount"
                name="amount"
                onChange={(e) => setAmount(e.target.value)}
                required
              />
            </div>
            <div className="col-span-2 text-left">
              <label className="text-blue-900" htmlFor="date">
                Date
              </label>
              <br></br>
              <input
                type="date"
                className="shadow appearance-none border rounded w-full py-2 px-3 xtext-blue-700 bg-gray-100 mt-2 focus:outline-none focus:shadow-outline"
                id="date"
                name="date"
                onChange={(e) => setDate(e.target.value)}
                required
              />
            </div>

            {isProject ? (
              <div className="col-span-4 text-left">
                <label className="" htmlFor="project_id">
                  Project
                </label>
                <select
                  className="shadow border rounded w-full py-2 px-3 bg-gray-100 mt-2 focus:outline-none focus:shadow-outline"
                  id="projectId"
                  name="projectId"
                  defaultValue={projectId}
                  onChange={(e) => setProjectId(e.target.value)}
                  required
                >
                  <option className="" value="N/A">
                  Select Project
                </option>
                  {projects.map((e) => {
                    return (
                      <option key={e.id} value={e.id}>
                        {e.name}
                      </option>
                    );
                  })}
                </select>
              </div>
            ) : (
              <></>
            )}
            <div className="col-span-4 text-left">
              <label className="" htmlFor="authorized_by">
                Authorized By
              </label>
              <select
                className="shadow border rounded w-full py-2 px-3 bg-gray-100 mt-2 focus:outline-none focus:shadow-outline"
                id="authorized_by"
                name="authorized_by"
                onChange={(e)=>handleAuthorisedPersonChange(e.target.value)}
              >
                <option value="N/A">Select</option>
                {staffs.map((e) => {
                  return (
                    <option key={e.id} value={e.id}>
                      {e.name}
                    </option>
                  );
                })}
              </select>
            </div>
            <button
              type="submit"
              className="md:col-start-4 col-start-3 md:col-span-2 col-span-3 shadow appearance-none border rounded w-full py-2 px-3 text-white button-solidx mt-2 focus:outline-none focus:shadow-outline"
              id="createExpense-button"
            >
              <FontAwesomeIcon
                icon={addExpensesIcon}
                className={addExpensesIconClassname}
              />{" "}
              {addExpensesHtmlValue}{" "}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
