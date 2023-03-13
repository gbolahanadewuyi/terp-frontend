import React, { useState } from "react";

import useTable from "../../../../hooks/useTable";
// import styles from "./Table.module.css";
import TableFooter from "./TableFooter";
import company_img from '../../../../assets/images/generic-company-logo.png';
import EyeIcon from '../../../../assets/icons/tables/EyeIcon';

const CompaniesTable = ({ data, rowsPerPage, handleShowDetails, sortingHat}) => {
  const [page, setPage] = useState(1);
  const { slice, range } = useTable(data, page, rowsPerPage);

//   redux variables
//   const dispatch = useDispatch();


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
                                            <th
                                                scope="col"
                                                className="px-6 py-3 text-left font-medium text-gray-500 xtracking-wider"
                                                onClick={e =>{sortingHat('address')}}
                                            >
                                                Companies
                                            </th>
                                            <th
                                                scope="col"
                                                className="px-6 py-3 text-left font-medium text-gray-500 tracking-wider"
                                            >
                                                RC Number
                                            </th>
                                            <th
                                                scope="col"
                                                className="px-3 py-3 text-center font-medium text-gray-500 tracking-wider"
                                            >
                                                Address
                                            </th>
                                            <th
                                                scope="col"
                                                className="px-6 py-3 text-center font-medium text-gray-500 tracking-wider"
                                            >
                                                Email
                                            </th>
                                            <th scope="col" className="text-center px-6 py-3 font-medium text-gray-500">
                                                Contact
                                            </th>
                                            <th scope="col" className="text-center px-6 py-3 font-medium text-gray-500">
                                                Action
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-whitex divide-y divide-gray-200">
                                        {slice.map((e) => (
                                            <tr key={e.id}>
                                                <td className="px-6 py-4 whitespace-nowrap flex">
                                                    <img src={company_img} alt="company img" width={40} className="overflow-hidden object-cover rounded-full border-2 mr-3"/>
                                                    <span className="my-auto">{e?.name}</span>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    RC{e?.rcNumber}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-center">{e.address}</td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    {e.email}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm"><div>{e.phone}</div></td>
                                                <td>
                                                    <button onClick={()=>handleShowDetails(e?.id)} className="text-xs px-2 py-1 button-solidx flex">
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

export default CompaniesTable;
