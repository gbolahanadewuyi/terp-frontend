import React, { useEffect } from "react";
import ArrowleftIcon from "../../../../../assets/icons/tables/ArrowLeftIcon";
import ArrowRightIcon from "../../../../../assets/icons/tables/ArrowRightIcon";

import styles from "./TableFooter.module.css";

const TableFooter = ({ range, setPage, page, slice }) => {
  // let current_page = 7;
  // let flipPage = (e) =>{
  //   current_page += e;
  //   if(current_page > range.length){
  //     console.log(`xxxxmainer${current_page}`)
  //   // setPage(range[0])
  //   }
  //   // else{
  //   //   setPage(range[current_page]);
  //   //   console.log('elsa');
  //   // }
  //   console.log(`current-page ${current_page}`)
    
  // }
  let flipNext = ()=>{
    (page > (range.length - 1)) ? (setPage(range[0])) : setPage(page + 1)
  }
  let flipPrev = ()=>{
    (page <= 1) ? (setPage(range[range.length - 1])) : setPage(page - 1)
  }
  useEffect(() => {
    if (slice.length < 1 && page !== 1) {
      // setPage(page - 1);
    }
  }, [slice, page, setPage]);
  return (
    <div className={styles.tableFooter_cus}>
      {/* {range.map((el, index) => (
        <button
          key={index}
          className={`${styles.button} ${
            page === el ? styles.activeButton : styles.inactiveButton
          }`}
          onClick={() => setPage(el)}
        >
          {el}
        </button>
      ))} */}
      <div className={styles.nav_container}>
        <div className={styles.button_cus}><button onClick={() => flipPrev()}><ArrowleftIcon classx='stroke-current w-full h-full'/></button>Prev</div>
        <div className={styles.button}>{page} of {range.length}</div>
        {/* <div className={styles.temp_spacer}></div> */}
        <div className={styles.button_cus}>Next<button onClick={() => flipNext()}><ArrowRightIcon classx='stroke-current w-full h-full'/></button></div>

      </div>
    </div>
  );
};

export default TableFooter;
