import React from 'react';
// import approvedBanks from '../../../../tempDb/approvedBanks';
import people from '../../../../../tempDb/people';
import Multiselect from 'multiselect-react-dropdown';


export default function AddTask(props) {
    // var naira_sign = '\u20a6'; z
    // var progress_style = {
    //     width: "90%"
    //   }
    let people_x = [];
    people.map(e=> people_x.push(e.name))
  return( 
    <div className={props.show}>
        <div className="xback-board txt-dark-bluex">
            <div className="modal-inner">
                <div className="w-full" onClick={props.handleShow}>
                        <svg className="xsvg-close float-right fill-current" xfill="#000000" xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 30 30" width="30px" height="30px">    <path d="M 7 4 C 6.744125 4 6.4879687 4.0974687 6.2929688 4.2929688 L 4.2929688 6.2929688 C 3.9019687 6.6839688 3.9019687 7.3170313 4.2929688 7.7070312 L 11.585938 15 L 4.2929688 22.292969 C 3.9019687 22.683969 3.9019687 23.317031 4.2929688 23.707031 L 6.2929688 25.707031 C 6.6839688 26.098031 7.3170313 26.098031 7.7070312 25.707031 L 15 18.414062 L 22.292969 25.707031 C 22.682969 26.098031 23.317031 26.098031 23.707031 25.707031 L 25.707031 23.707031 C 26.098031 23.316031 26.098031 22.682969 25.707031 22.292969 L 18.414062 15 L 25.707031 7.7070312 C 26.098031 7.3170312 26.098031 6.6829688 25.707031 6.2929688 L 23.707031 4.2929688 C 23.316031 3.9019687 22.682969 3.9019687 22.292969 4.2929688 L 15 11.585938 L 7.7070312 4.2929688 C 7.5115312 4.0974687 7.255875 4 7 4 z"/></svg>
                </div>
                        <h1 className=' p-2 pl-0 text-3xl text-left'>Add New Task</h1>
                <form className="grid grid-cols-6 gap-4">
                    <div className="col-span-6 text-left">
                        <label className='text-blue-900' htmlFor="task-name">Task Name</label><br></br>
                        <input type="text" className="shadow appearance-none border rounded w-full py-2 px-3 bg-whitex mt-2 focus:outline-none focus:shadow-outline " placeholder="Enter Task name" id='task-name' name='task-name'/>
                    </div>
                    <div className="col-span-6 text-left">
                        <label className='text-blue-900' htmlFor="scope">Scope</label><br></br>
                        <input type="text" className="shadow appearance-none border rounded w-full py-2 px-3 bg-whitex mt-2 focus:outline-none focus:shadow-outline " placeholder="Enter Task Scope" id='scope' name='scope'/>
                    </div>
                    <div className="md:col-span-3 col-span-6 text-left">
                        <label className='text-blue-900' htmlFor="initiated-by">Initiated By</label>
                        <select type="text" className="shadow border txt-dark-bluex rounded w-full py-2 px-3 txt- bg-gray-200 mt-2 focus:outline-none focus:shadow-outline" id="initiated-by" name='initiated-by'>
                            {people.map(e=>{return <option value={e.name} key={e.id}>{e.name}</option>})} 
                        </select>
                    </div>
                    <div className="md:col-span-3 col-span-6 text-left">
                        <label className='text-blue-900' htmlFor="assigned-to">Assigned To</label>
                        <select type="text" className="shadow border txt-dark-bluex rounded w-full py-2 px-3 txt- bg-gray-200 mt-2 focus:outline-none focus:shadow-outline" id="assigned-to" name='assigned-to'>
                            {people.map(e=>{return <option value={e.name} key={e.id}>{e.name}</option>})} 
                        </select>
                    </div>

                    <div className="col-span-6 text-left">
                        <label className='' htmlFor="people-involveed">People Involved</label>
                        <Multiselect
                            isObject={false}
                            onKeyPressFn={function noRefCheck(){}}
                            onRemove={function noRefCheck(){}}
                            onSearch={function noRefCheck(){}}
                            onSelect={function noRefCheck(){}}
                            options={people_x}
                            className='rounded w-full py-2 mt-2 '
                        />
                    </div>

                    <div className="col-span-6 grid grid-cols-8 gap-4">
                        <div className="col-span-2 text-left">
                            <label htmlFor="task-status">Task Status</label>
                            <select type="text" className="shadow xappearance-none border rounded w-full py-2 px-3 xtext-blue-700 bg-gray-200 mt-2 focus:outline-none focus:shadow-outline" id="username" name="username">
                                <option className='xpass' value="active">Active</option>
                                <option className='xwarn' value="pending">Pending</option>
                                <option className='xfail' value="completed">Completed</option>
                            </select>
                        </div>
                        <div className="col-span-3 text-left">
                            {/* issue ---should include time also */}
                            <label htmlFor="date-created">Date Created</label>
                            <input type="date"className="shadow appearance-none border rounded w-full py-2 px-3 xtext-blue-700 bg-gray-200 mt-2 focus:outline-none focus:shadow-outline" id="date-created" name='date-created'/>
                        </div>
                        <div className="col-span-3 text-left">
                            {/* issue ---should include time also */}
                            <label htmlFor="due-date">Due Date</label>
                            <input type="date"className="shadow appearance-none border rounded w-full py-2 px-3 xtext-blue-700 bg-gray-200 mt-2 focus:outline-none focus:shadow-outline" id="due-date" name='due-date'/>
                        </div>
                        
                       
                    </div>
                     <div className="col-span-6 text-left">
                        <label htmlFor="remarks">Remarks</label>
                        <textarea className="shadow appearance-none border rounded w-full py-2 px-3 xtext-blue-700 bg-gray-200 mt-2 focus:outline-none focus:shadow-outline" id="remarks" name='remarks' placeholder='Enter Task Remarks'></textarea>
                    </div>

                    <input type="submit" className="md:col-start-5 col-end-7 md:col-span-2 col-span-3 shadow appearance-none border rounded w-full py-2 px-3 text-white button-solidx mt-2 focus:outline-none focus:shadow-outline" id='submit-button' value='Create Task'/>
                </form>
            </div>
        </div>
    </div>
  )}