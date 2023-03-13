import React, { useState } from "react";

import useTable from "../../../../hooks/useTable";
// import styles from "./Table.module.css";
import CardFooter from "./CardFooter";
const BidCards = ({ data, rowsPerPage, handleShowDetails }) => {
  const [page, setPage] = useState(1);
  const { slice, range } = useTable(data, page, rowsPerPage);
    return (
        <>
        <div className="cards-container">
            <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-cus-1 gap-y-cus-1">
                {slice.map(e=>{
                    var status_cn;
                    if(e.statusx === 'approved'){status_cn = 'ml-auto capitalize bg-green-100 text-green-500 rounded-lg text-xs p-1 px-2'}
                    else if(e.statusx === 'rejected'){status_cn = 'ml-auto capitalize bg-red-100 text-red-500 rounded-lg text-xs p-1 px-2'}
                    else{status_cn = 'ml-auto capitalize bg-amber-100 text-amber-500 rounded-lg text-xs p-1 px-2'}
                    
                    return(
                        <div className=' bg-whitex rounded txt-darkblue2 shadow-lg' key={e.id}>
                            <div className='p-3'>
                                <div className='flex text-xs'><span>{e.TRF}</span><span className={status_cn}>{e.statusx}</span></div>
                                <div className=' xtext-lg py-2 text-justifyx'>{e.name}</div>
                                <div className='flex txt-greyed-out'><span>Client:</span><span className='ml-auto'>Winning Company:</span></div>
                                <div className='flex'><span>{e.client}</span><span className='ml-auto'>{e.winning_company}</span></div>
                            </div>
                            <div className='w-full bborder border-t-2 flex px-2'>
                                <div className='py-2 pr-2'><span className='px-2 text-sm txt-greyed-out'>Submited</span>{e.date_submitted}</div>
                                <button className='bg-bluex text-white px-1 rounded my-1 ml-auto' onClick={handleShowDetails}>View Details</button>
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

export default BidCards;
