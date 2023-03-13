import React from 'react'

export default function OngoingProjects(props) {
    var naira_sign = '\u20a6';    
    // var temp_table = [
    //     {id:1, namex: 'Bids', client: 'Acme International', progress: '45%', amount: 34000, project_status: 'pending', start_date: '28 Feb 2021'},
    //     {id:2, namex: 'Bids', client: 'Acme International', progress: '45%', amount: 34000, project_status: 'completed', start_date: '28 Feb 2021'},
    //     {id:3, namex: 'Bids', client: 'Acme International', progress: '45%', amount: 34000, project_status: 'pending', start_date: '28 Feb 2021'},
    //     {id:4, namex: 'Bids', client: 'Acme International', progress: '45%', amount: 34000, project_status: 'pending', start_date: '28 Feb 2021'},
    //     {id:5, namex: 'Bids', client: 'Acme International', progress: '45%', amount: 34000, project_status: 'not started', start_date: '28 Feb 2021'},
    //     {id:6, namex: 'Bids', client: 'Acme International', progress: '45%', amount: 34000, project_status: 'pending', start_date: '28 Feb 2021'},
    //   ]    
  return (
    <div className={props.showr}>
        {/* <table className="w-full table-auto">
            <tr className='bg-whitex h-14'>
                <td className='text-blue-600 border-b-blue-600'>Ongoing Projects</td>
                <td className='text-gray-700'>Pending Bids</td>
            </tr>
            <tr className='bg-colr h-14 text-gray-400'>
                <td className=' pl-5'>Title</td>
                <td>Client</td>
                <td className='w-24'>Progress</td>
                <td>Contract Sum</td>
            </tr>
            {temp_table.map(e=>{
                    var progress_style = {width: e.progress}
                return(
                <tr className='hover:bg-gray-300 h-12'>
                    <td className='font-bold pl-5'> {e.namex}</td>
                    <td>{e.client}</td>
                    <td className="">
                        {e.progress}
                        <div className='flex w-12'>
                            <div className='h-2 w-full bg-gray-300 mt-3 rounded-lg'>
                                <div className='h-2 button-solidx rounded-lg' style={progress_style}></div>
                            </div>
                            <span className='w-1/12 text-sm pl-2 ml-auto'>{progress_style.width}</span>
                        </div>
                        <div className='flex my-2'>
                            <div className='h-1 w-full bg-gray-300 mt-3'>
                                <div className='h-1 bg-bluex' style={progress_style}></div>
                            </div>
                            <span className='w-2/12 pl-2 ml-auto flex-end'>{progress_style.width}</span>
                        </div>
                    </td>
                    <td className='text-left'>{naira_sign}{e.amount}</td>
                </tr>)
                })
            }
        </table> */}
        <div className="flex flex-col text-sm">
            <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                    <div className="shadow overflow-hidden border-b border-gray-200 xsm:rounded-lg">
                        <table className="min-w-full divide-y divide-gray-200 xtable-auto">
                            <thead className="bg-colr text-sm ">
                                <tr>
                                    <th
                                        scope="col"
                                        className="px-6 py-3 text-left font-medium text-gray-500 xtracking-wider"
                                    >
                                        Title
                                    </th>
                                    <th
                                        scope="col"
                                        className="px-6 py-3 text-left font-medium text-gray-500 tracking-wider"
                                    >
                                        Client
                                    </th>
                                    <th
                                        scope="col"
                                        className="px-3 py-3 text-center font-medium text-gray-500 tracking-wider"
                                    >
                                        Contract Sum
                                    </th>
                                    <th
                                        scope="col"
                                        className="px-6 py-3 text-left font-medium text-gray-500 tracking-wider"
                                    >
                                        Kick Off Date
                                    </th>
                                    {/* <th
                                        scope="col"
                                        className="px-6 py-3 text-left font-medium text-gray-500 tracking-wider"
                                    >
                                        Milestone
                                    </th> */}
                                    <th scope="col" className="relative px-6 py-3 font-medium text-gray-500">
                                        <span className="">Project Status</span>
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="bg-whitex divide-y divide-gray-200">
                                {props?.projects?.map((e) => {
                                // var progress_style = {width: e.progress}
                                var status_style;
                                if(e.status === 'Completed'){status_style = 'px-2 py-1 text-xs text-center rounded xpass capitalize'}
                                else if(e.status === 'Cancelled'){status_style = 'px-2 py-1 text-xs text-center rounded xfail capitalize'}
                                else{status_style = 'px-2 py-1 text-xs text-center rounded xwarn capitalize'}
                                return (
                                <tr key={e.id}>
                                    <td className="px-6 py-4 xwhitespace-nowrap capitalize">
                                            {e.name}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap capitalize">
                                        {e.client}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-center">{naira_sign}{e.contractSum}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        {e.takeoff_date}
                                    </td>
                                    {/* <td className="px-6 py-4 whitespace-nowrap">
                                        {e.percentage_of_completion}
                                    </td> */}
                                    <td className="px-6 py-4 whitespace-nowrap text-sm"><div className={status_style}>{e.status}</div></td>
                                </tr>
                                )})}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}
