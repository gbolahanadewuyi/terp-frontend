import React, { useState } from "react";

import useTable from "../../../../hooks/useTable";
// import styles from "./Table.module.css";
import CardFooter from "./CardFooter";

const BidCards = ({ data, rowsPerPage, handleShowDetails }) => {
  const [page, setPage] = useState(1);
  const { slice, range } = useTable(data, page, rowsPerPage);


//   redux variables
//   const currentData = useSelector(state => state.currentData);
//   const dispatch = useDispatch();
    return (
        <>
        <div className="cards-container">
            <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-cus-1 gap-y-cus-1">
                {slice.map(e=>{
                    var status_cn;
                    if(e.status === 'Won'){status_cn = 'ml-auto capitalize bg-green-100 text-green-500 rounded-lg text-xs p-1 px-2'}
                    else if(e.status === 'Cancelled' || e.status === 'Lost'){status_cn = 'ml-auto capitalize bg-red-100 text-red-500 rounded-lg text-xs p-1 px-2'}
                    else{status_cn = 'ml-auto capitalize bg-amber-100 text-amber-500 rounded-lg text-xs p-1 px-2'}
                    
                    return(
                        <div className=' bg-whitex rounded txt-darkblue2 shadow-lg' key={e?.id}>
                              <div className='p-3'>
                                <div className='flex text-xs'><span>{e?.id}</span><span className={status_cn}>{e.status}</span></div>

                                <div className=' xtext-lg py-2 text-justifyx'>{e?.tender_title}</div><br/>

                                <div className=''><span className="txt-greyed-out">Client:</span> <span>{"  "+ e?.client}</span></div> <br/>

                                <div className=''><span className="txt-greyed-out">Company:</span> <span>{"  "+ e?.winning_company}</span></div> 
                            </div>
                            <div className='w-full bborder border-t-2 flex px-2'>
                                <div className='py-2 pr-2'><span className='px-2 text-sm txt-greyed-out'>Submited</span>{e?.date_submitted}</div>
                                <button className='bg-bluex text-white px-1 rounded my-1 ml-auto' onClick={()=>handleShowDetails(e.id)}>View Details</button>
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
