import React, { useState } from "react";

import useTable from "../../../../hooks/useTable";
// import styles from "./Table.module.css";
import CardFooter from "./CardFooter";
const MeetingCards = ({ data, rowsPerPage, handleShowDetails }) => {
  const [page, setPage] = useState(1);
  const { slice, range } = useTable(data, page, rowsPerPage);
    return (
        <>
        <div className="cards-container">
        <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-cus-1 gap-y-cus-1">
            {slice.map(e=>{
              var status_cn;
              if(e.status === 'approved'){status_cn = 'ml-auto capitalize bg-green-100 text-green-500 rounded-lg text-xs p-1 px-2'}
              else if(e.status === 'rejected'){status_cn = 'ml-auto capitalize bg-red-100 text-red-500 rounded-lg text-xs p-1 px-2'}
              else{status_cn = 'ml-auto capitalize bg-amber-100 text-amber-500 rounded-lg text-xs p-1 px-2'}

              var stage;
              if(e.mode.toLowerCase()==='online'){stage = 'Platform'}
              else{stage= 'Location'}
              
              return(
                <div className='bg-whitex rounded txt-darkblue2 shadow-lg' key={e.id}>
                  <div className='p-3'>
                    <div className='flex text-xs'><span><span className='txt-greyed-out'>Date: </span>{e.date}</span><span className={status_cn}>{e.status}</span></div>
                    <div className=' xtext-lg py-2 text-justifyx'>{e.name}</div>
                    <div className='flex txt-greyed-out'><span>Mode:</span><span className='ml-auto capitalize'>{stage}:</span></div>
                    <div className='flex capitalize'><span>{e.mode}</span><span className='ml-auto'>{e.location}</span></div>
                  </div>
                  <div className='w-full bborder border-t-2 flex px-2 text-sm'>
                    <div className='py-2 pr-2'><span className='px-2 txt-greyed-out'>Initiated by:</span>{e.initiated_by}</div>
                    <button className='bg-bluex text-white px-2 py-1 rounded my-1 ml-auto' onClick={handleShowDetails}>View Details</button>
                  </div>
                </div>
              );
              })
            }
          </div>
        </div>
        <CardFooter range={range} slice={slice} setPage={setPage} page={page} />
        </>
    );
};

export default MeetingCards;
