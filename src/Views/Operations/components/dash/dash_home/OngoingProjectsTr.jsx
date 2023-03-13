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
