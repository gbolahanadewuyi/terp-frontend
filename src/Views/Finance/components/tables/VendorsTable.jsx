import React, { useState } from "react";

import useTable from "../../../../hooks/useTable";
// import styles from "./Table.module.css";
import TableFooter from "./TableFooter";
import EyeIcon from "../../../../assets/icons/tables/EyeIcon";
// import EditIcon from '../../../../assets/icons/Details/EditIcon';

// redux
import {useDispatch} from 'react-redux';
import {setDataVendor} from '../../../../redux/actions/setData';

const VendorsTable = ({ data, rowsPerPage, handleShow }) => {
  const [page, setPage] = useState(1);
  const { slice, range } = useTable(data, page, rowsPerPage);

//   redux variables
const dispatch = useDispatch();

    return (
        <>
            <div className='xbg-whitex bg-colr table-holdr sub-contenty'>
                <div className="flex flex-col">
                    <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                        <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                            <div className="shadow rounded-b-lg overflow-hidden xborder-b xborder-gray-200 xsm:rounded-lg">
                                <table className="min-w-full divide-y divide-gray-200 xtable-auto">

                                    <thead className="table-hd-bg text-sm font-medium">
                                        <tr>
                                            <th scope="col" className="px-6 py-3 text-left font-medium text-gray-500 xtracking-wider" >
                                                Vendor Name
                                            </th>
                                            <th scope="col" className="px-6 py-3 text-left font-medium text-gray-500 tracking-wider">
                                                Address
                                            </th>
                                            <th scope="col" className="px-3 py-3 text-center font-medium text-gray-500 tracking-wider">
                                                Contact
                                            </th>
                                            <th scope="col" className="px-6 py-3 text-center font-medium text-gray-500 tracking-wider" >
                                                Email
                                            </th>
                                            <th scope="col" className="text-center px-6 py-3 font-medium text-gray-500">
                                                Type
                                            </th>
                                            <th></th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-whitex divide-y divide-gray-200">
                                        {slice.map((e) => (
                                            <tr key={e.id}>
                                                <td className="px-6 py-4 whitespace-nowrap">{e.vendor_name}</td>
                                                <td className="px-6 py-4 xwhitespace-nowrap">{e.address}</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-center">{e.contact}</td>
                                                <td className="px-3 py-4 whitespace-nowrap">{e.email}</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm"><div>{e.type}</div></td>
                                                {/* <td><button onClick={handleShow} className="text-xs p-2 xpass">edit</button> </td> */}
                                                <td>
                                                    <button onClick={()=>{
                                                        dispatch(setDataVendor(e));
                                                        handleShow();
                                                    }} 
                                                    className="text-xs px-2 py-1 button-solidx flex">
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
        </>
    );
};

export default VendorsTable;
