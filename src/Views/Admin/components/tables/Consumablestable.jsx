import React, { useState } from "react";

import useTable from "../../../../hooks/useTable";
// import styles from "./Table.module.css";
import TableFooter from "./TableFooter";
import EyeIcon from "../../../../assets/icons/tables/EyeIcon";

// redux
import {useDispatch} from 'react-redux';
import {setDataEquipment} from '../../../../redux/actions/setData';

const EquipmentsTable = ({ data, rowsPerPage, handleShow }) => {
  const [page, setPage] = useState(1);
  const { slice, range } = useTable(data, page, rowsPerPage);
  return (
    <>
      <div className="xbg-whitex bg-colr table-holdr sub-contenty">
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
                      >
                        Item Description
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-center font-medium text-gray-500 tracking-wider"
                      >
                        Stock (Quantity)
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-center font-medium text-gray-500 tracking-wider"
                      >
                         LatestPrice
                      </th>
                      <th
                        scope="col"
                        className="px-3 py-3 text-center font-medium text-gray-500 tracking-wider"
                      >
                        Last Purchase Date
                      </th>

                      <th
                        scope="col"
                        className="text-center px-6 py-3 font-medium text-gray-500"
                      >
                        Vendor
                      </th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody className="bg-whitex divide-y divide-gray-200">
                    {slice.map((e) => (
                      <tr key={e.id}>
                        <td className="px-6 py-4 text-left whitespace-nowrap">
                          <div>{e.item}</div>
                          <div className="txt-greyed-out">
                            Category: {e.category}
                          </div>
                        </td>
                        <td className="px-3 py-4n text-center whitespace-nowrap text-center">
                          {e.stock}
                        </td>
                        <td className="px-6 py-4 text-center whitespace-nowrap text-sm text-gray-500 text-center">
                          {e.latestPrice}
                        </td>
                        <td className="px-6 py-4 text-center whitespace-nowrap text-sm">
                          <div>{e.latestPrice}</div>
                        </td>
                        <td className="px-3 py-4 text-center whitespace-nowrap text-center">
                          {e.vendor}
                        </td>
                        {/* <td><button onClick={handleShow} className="text-xs p-2 xpass">edit</button> </td> */}
                        <td>
                          <button
                            onClick={() => handleShow(e.id)}
                            className="text-xs px-2 py-1 button-solidx flex"
                          >
                            <EyeIcon classx="fill-current" />
                            <span className="my-auto">view</span>
                          </button>
                        </td>
                      </tr>
                    ))}
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

export default EquipmentsTable;
