import React, { useState } from "react";

import useTable from "../../../../hooks/useTable";
// import styles from "./Table.module.css";
import TableFooter from "./TableFooter";
import company_img from "../../../../assets/images/generic-company-logo.png";
import EyeIcon from "../../../../assets/icons/tables/EyeIcon";

// redux
import { useDispatch } from "react-redux";
import { setDataStaff } from "../../../../redux/actions/setData";
import StaffActivationToggle from "./staff-toggler/StaffActivationToggle";

const StaffTable = ({ data, rowsPerPage, handleShow, sortingHat }) => {
  const [page, setPage] = useState(1);
  const { slice, range } = useTable(data, page, rowsPerPage);

  //   redux variables
  const dispatch = useDispatch();

  return (
    <>
      <div className="bg-whitex table-holdr sub-contenty">
        <div className="flex flex-col">
          <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
              <div className="shadow rounded-b-lg overflow-hidden xborder-b xborder-gray-200 xsm:rounded-lg">
                <table className="min-w-full divide-y divide-gray-200 xtable-auto">
                  <thead className="table-hd-bg text-sm font-medium">
                    <tr>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left font-medium text-gray-500 xtracking-wider"
                        onClick={(e) => {
                          sortingHat("address");
                        }}
                      >
                        Name
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left font-medium text-gray-500 tracking-wider"
                      >
                        Role
                      </th>
                      <th
                        scope="col"
                        className="px-3 py-3 text-center font-medium text-gray-500 tracking-wider"
                      >
                        Contact
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-center font-medium text-gray-500 tracking-wider"
                      >
                        Salary
                      </th>
                      <th
                        scope="col"
                        className="text-center px-6 py-3 font-medium text-gray-500"
                      >
                        Account Status
                      </th>
                      <th
                        scope="col"
                        className="text-center px-6 py-3 font-medium text-gray-500"
                      ></th>
                    </tr>
                  </thead>
                  <tbody className="bg-whitex divide-y divide-gray-200">
                    {slice.map((e) => {
                      let status_container = "xpass";
                      let status_content = "bg-[#4BDE97]";
                      if (e.accountStatus == "Inactive") {
                        status_container = "xfail flex-row-reverse";
                        status_content = "bg-[#F55B5D]";
                      }
                      return (
                        <tr key={e.id}>
                          <td className="px-6 py-3 whitespace-nowrap xflex relative">
                            <img
                              src={e.photo_url}
                              alt="company img"
                              width={40}
                              className="overflow-hidden object-cover rounded-full border-2 mr-3 w-8 h-8 absolute top-3"
                            />
                            <span className="my-auto ml-8">{e.name}</span>
                          </td>
                          <td className="px-6 py-3  whitespace-nowrap">
                            {e.role}
                          </td>
                          <td className="px-6 py-3 text-centerwhitespace-nowrap text-sm text-gray-500 text-center">
                            {e.phone}
                          </td>
                          <td className="px-6 py-3 text-center whitespace-nowrap">
                            {e.salary === "" ? "Under Review" : e?.salary}
                          </td>
                          {/* <td className="px-6 py-4 whitespace-nowrap text-sm">
                                                    <div className={`${status_container} flex `}><div className={`${status_content} w-3 rounded`}></div><div className="py-2 px-1">{e.account_status}</div></div>
                                                </td> */}
                          <td className="px-6 py-3 text-center whitespace-nowrap">
                            <StaffActivationToggle data={e} />
                          </td>
                          <td className="px-6 py-3 whitespace-nowrap">

                            <button
                              onClick={() => {
                                dispatch(setDataStaff(e));
                                handleShow();
                              }}
                              className="text-xs px-2 py-1 button-solidx flex"
                            >
                              <EyeIcon classx="fill-current" />{" "}
                              <span className="my-auto">view</span>
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                    <tr>
                      <td>
                        <TableFooter
                          range={range}
                          slice={slice}
                          setPage={setPage}
                          page={page}
                        />
                      </td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default StaffTable;
