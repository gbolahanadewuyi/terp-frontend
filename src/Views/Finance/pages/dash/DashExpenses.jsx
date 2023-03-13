import React, { useEffect, useState } from "react";

import SidePanel from "../../components/menu/SidePanel";
import { regularx, activex, closeNav } from "../../components/menu/SidePanel";
import DashHeader from "../../components/header/DashHeader";
import LoadingScreen from "./LoadingScreen";

import AddExpense from "../../components/modals/Add/AddExpense";
import ExpensesTable from "../../components/tables/ExpensesTable";
import EditExpense from "../../components/modals/EditDetails/EditExpense";
import { toast } from "react-hot-toast";

import expenses from "../../../../tempDb/expenses";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import SearchSvg from "../../../../assets/icons/dash-projects/SearchSvg";

async function getExpenses() {
  //gettoken
  const userInfoObject = localStorage.getItem("user");
  const userInfo = JSON.parse(userInfoObject);
  return fetch(
    "https://us-central1-terp-338409.cloudfunctions.net/app/api/getAllExpenses",
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    }
  ).then((data) => data.json());
}

export default function DashExpenses({updateUser}) {
  var active_selectr = {
    dash: regularx,
    projects: regularx,
    bids: regularx,
    companies: regularx,
    tasks: regularx,
    equipments: regularx,
    meetings: regularx,
    vendors: regularx,
    staff: regularx,
    expenses: activex,

    logout: regularx,
    settings: regularx,
  };

  // loading screen after fetch
  const [isLoading, setIsLoading] = useState(true);

  const [show, setShow] = useState("hidden");
  const [expenses, setExpenses] = useState([]);
  const [expensesCopy, setExpensesCopy] = useState();
  const [expenseId, setExpenseId] = useState()

  const handleShow = () => {
    if (show === "hidden") {
      setShow("");
    } else {
      setShow("hidden");
    }
  };
  const [showEdit, setShowEdit] = useState("hidden");
  const handleShowEdit = (id) => {
    if (showEdit === "hidden") {
      setExpenseId(id)
      setShowEdit("");
    } else {
      setShowEdit("hidden");
    }
  };

  useEffect(async () => {
    let mounted = true;
    const data = await getExpenses();
    console.log(data);
    if (data.status == 403) {
      updateUser({});
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
      setIsLoading(false);
    } else if (data.status == 200) {
      if (mounted) {
        setExpenses(data.data);
        setExpensesCopy(data.data);
        setIsLoading(false);
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
  }, []);

  

  const getAllExpenses = async () => {
    const data = await getExpenses();
    console.log(data);
    if (data.status == 403) {
      updateUser({});
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
      setExpenses(data.data);
      setExpensesCopy(data.data);
      setIsLoading(false);
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

  function SearchFilter(typed_name) {
    console.log(typed_name)
    setExpenses(
      expensesCopy.filter((e) => {
        return e.description.toLowerCase().includes(typed_name);
      })
    );
  }

  return (
    <>
      <AddExpense show={show} handleShow={handleShow}  getExpenses={getAllExpenses} updateUser={updateUser}/>
      <EditExpense show={showEdit} handleShow={handleShowEdit} id={expenseId}  getExpenses={getAllExpenses} updateUser={updateUser}/>
      <div className="dashboardx">
        <SidePanel active_selectr={active_selectr} updateUser={updateUser}/>
        <div className="main-body bg-colr">
          <DashHeader title="Expenses" />

          {isLoading ? (
            <LoadingScreen />
          ) : (
            <div className="contenty px-2 pr-5" onClick={closeNav}>
              <div className="my-auto text-lg pl-3 font-bold txt-headr md:hidden block">
                Expenses
              </div>
              <div className="search-buttonx xpx-2 my-6 relative grid grid-cols-12 gap-2">
                <span className="absolute bottom-5 z-10 top-3 left-4 text-lg txt-darkblue3">
                  <SearchSvg classx="stroke-current w-5 h-5" />
                </span>
                <input
                  type="text"
                  className="md:col-span-10 col-span-8 shadow appearance-none border rounded xw-9/12 py-2 pl-10 text-blue-700 bg-gray-100 focus:outline-none focus:shadow-outline "
                  placeholder="Search for Expense"
                  id="title-search"
                  name="title-search"
                  onChange={(e)=>SearchFilter(e.target.value)}
                />
                <button
                  onClick={handleShow}
                  className="md:col-span-2 col-span-4  button-solidx py-2 text-sm"
                >
                  <FontAwesomeIcon icon={["fas", "plus"]} />
                  <span className="ml-2">New Expense</span>
                </button>
              </div>

              <ExpensesTable
                data={expenses}
                rowsPerPage={10}
                handleShow={handleShowEdit}
              />
            </div>
          )}
        </div>
      </div>
    </>
  );
}
