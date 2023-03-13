import React, { useState } from "react";

import useTable from "../../../../hooks/useTable";
import styles from "./Table.module.css";
import TableFooter from "./TableFooter";

const Table = ({ data, rowsPerPage }) => {
  const [page, setPage] = useState(1);
  const { slice, range } = useTable(data, page, rowsPerPage);
  return (
    <>
      <table className={styles.table}>
        <thead className={styles.tableRowHeader}>
          <tr>
            <th className={styles.tableHeader}>Country</th>
            <th className={styles.tableHeader}>Capital</th>
            <th className={styles.tableHeader}>Language</th>
            <th className={styles.tableHeader}>Language</th>
            <th className={styles.tableHeader}>Language</th>
          </tr>
        </thead>
        <tbody>
          {slice.map((e) => (
            // <tr className={styles.tableRowItems} key={el.id}>
            //   <td className={styles.tableCell}>{el.name}</td>
            //   <td className={styles.tableCell}>{el.capital}</td>
            //   <td className={styles.tableCell}>{el.language}</td>
            //   <td className={styles.tableCell}>{el.language}</td>
            //   <td className={styles.tableCell}>{el.language}</td>
            // </tr>
            <tr key={e.rc}>
              <td className="px-6 py-4 whitespace-nowrap">
                {e.company_name}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                  RC{e.rc}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-center">{e.address}</td>
              <td className="px-6 py-4 whitespace-nowrap">
                  {e.email}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm"><div>{e.contact}</div></td>
        </tr>
          ))}
        </tbody>
      </table>
      <TableFooter range={range} slice={slice} setPage={setPage} page={page} />
    </>
  );
};

export default Table;
