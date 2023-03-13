import React, { useState } from "react";

import useTable from "../../../../hooks/useTable";
// import styles from "./Table.module.css";
import CardFooter from "./CardFooter";
const ProjectCards = ({ data, rowsPerPage, handleShowDetails }) => {
  const [page, setPage] = useState(1);
  const { slice, range } = useTable(data, page, rowsPerPage);
  var naira_sign = '\u20a6';    

    return (
        <>
        <div className="cards-container">
            <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-cus-1 gap-y-cus-1">
            {slice.map((e)=>{
              var progress_style = {
                width: e.progress
              }
              var status_cn;
              if(e.statusx === 'completed'){status_cn = 'ml-auto capitalize bg-green-100 text-green-500 rounded-lg text-xs p-1 px-2'}
              else if(e.statusx === 'not started'){status_cn = 'ml-auto capitalize bg-red-100 text-red-500 rounded-lg text-xs p-1 px-2'}
              else{status_cn = 'ml-auto capitalize bg-amber-100 text-amber-500 rounded-lg text-xs p-1 px-2'}
              return(
                <div className=' bg-whitex rounded txt-darkblue2 shadow-lg' key={e.id}>
                  <div className='p-3 pb-1'>
                    <div className='flex text-sm'><span>#{e.tag}</span><span className={status_cn}>{e.statusx}</span></div>
                    <div className='xtext-center text-lg py-2'>{e.name}</div>
                    <div className='flex txt-greyed-out text-xs'><span>client:</span><span className='ml-auto'>Contract Sum</span></div>
                    <div className='flex'><span>{e.client}</span><span className='ml-auto'>{naira_sign}{e.payment_balance}</span></div>
                    <div className='flex my-2'>
                      <div className='h-1 w-full bg-gray-300 mt-3'>
                        <div className='h-1 bg-bluex' style={progress_style}></div>
                      </div>
                        <span className='w-2/12 pl-2 ml-auto flex-end'>{progress_style.width}</span>
                    </div>

                  </div>
                  <div className='w-full bborder border-t-2 flex px-2'>
                    {/* <div className='py-2 text-2xl'><FontAwesomeIcon icon={['fas', 'wallet']}/><span className='pl-2 text-lg align-middle'>{naira_sign}{userx.total_amountx}</span></div> */}
                    <button className='bg-bluex text-white p-1 rounded my-2 ml-auto' onClick={handleShowDetails}>View Details</button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
            <CardFooter range={range} slice={slice} setPage={setPage} page={page} />
        </>
    );
};

export default ProjectCards;
