import React, { useState } from "react";
import EyeIcon from "../../../../assets/icons/tables/EyeIcon";

import useTable from "../../../../hooks/useTable";
// import styles from "./Table.module.css";
import TableFooter from "./TableFooter";

// redux
import {useSelector, useDispatch} from 'react-redux'
import {setDataTask} from '../../../../redux/actions/setData'

const TasksTable = ({ data, rowsPerPage, handleShow }) => {
  const [page, setPage] = useState(1);
  const { slice, range } = useTable(data, page, rowsPerPage);

  //   redux variables
  const currentData = useSelector(state => state.currentDataCompanies);
  const dispatch = useDispatch();
    return (
        <>
            <div className='bg-whitex table-holdr sub-contenty'>
                <div className="flex flex-col">
                    <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                        <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                            <div className="shadow rounded-b-lg overflow-hidden xborder-b xborder-gray-200 xsm:rounded-lg">
                                <table className="min-w-full divide-y divide-gray-200 xtable-auto">

                                    <thead className="table-hd-bg text-sm font-medium">
                                        <tr>
                                            <th scope="col" className="px-6 py-3 text-left font-medium text-gray-500 xtracking-wider" >
                                                Tasks
                                            </th>
                                            <th scope="col" className="px-6 py-3 text-left font-medium text-gray-500 tracking-wider whitespace-nowrap">
                                                Initiated by
                                            </th>
                                            <th scope="col" className="px-3 py-3 text-center font-medium text-gray-500 tracking-wider">
                                                Assigned to
                                            </th>
                                            <th scope="col" className="px-6 py-3 xtext-center whitespace-nowrap font-medium text-gray-500 tracking-wider" >
                                                Start Date
                                            </th>
                                            <th scope="col" className="px-6 py-3 xtext-center whitespace-nowrap font-medium text-gray-500 tracking-wider" >
                                                Due Date
                                            </th>
                                            <th scope="col" className="text-center px-6 py-3 font-medium text-gray-500">
                                                Status
                                            </th>
                                            <th scope="col" className="text-center px-6 py-3 font-medium text-gray-500">
                                                Action
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-whitex divide-y divide-gray-200">
                                        {slice.map((e) => (
                                            <tr key={e.id}>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                <div>{e.name}</div>
                                                <div className='txt-greyed-out text-sm'>{e.scope}</div>
                                                </td>
                                                <td className="px-6 py-4 xwhitespace-nowrap">{e.initiatedBy}</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-center">{e.assignedTo}</td>
                                                <td className="px-3 py-4 whitespace-nowrap text-center">{e.startDate}</td>
                                                <td className="px-3 py-4 whitespace-nowrap text-center">{e.deadline}</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm"><div>{e.status}</div></td>
                                                <td className="px-3 py-4 whitespace-nowrap text-center">
                                                    <button onClick={()=>handleShow(e.id)} className="text-xs px-2 py-1 button-solidx flex">
                                                        <EyeIcon classx="fill-current"/> <span className="my-auto">view</span>
                                                    </button> 
                                                </td>
                                            </tr>
                                        ))}
                                        <tr>
                                            <td>
                                                <TableFooter range={range} slice={slice} setPage={setPage} page={page} />
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
            {/* <TableFooter range={range} slice={slice} setPage={setPage} page={page} /> */}
        </>
    );
};

export default TasksTable;
