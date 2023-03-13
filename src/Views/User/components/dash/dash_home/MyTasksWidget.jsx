import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export default function MyTasksWidget() {
    // var eventsx = [
    //     {id: 2, name: 'Staff Meeting', date: 23, day: 'Mon', time: '11:20 AM', location: 'Conference Hall', },
    //     {id: 2, name: 'CI/Cd Implementation', date: 24, day: 'Tue', time: '01:34 PM',  location: 'Conference Hall', },
    //     {id: 2, name: 'Velocity Global Check-in', date: 25, day: 'Wed', time: '09:00 AM', location: 'Skype', },
    //     {id: 2, name: 'Staff Meeting', date: 26, day: 'Thurs', time: '09:00 AM', location: 'Conference Hall'}
    //   ]
    var tasks = [
        {id: 1, task_name: 'conduct feasibility study', project_name: 'apo legilative quarters construction', date: 'april 28, 2016', task_status: 'in progress' },
        {id: 2, task_name: 'conduct feasibility study', project_name: 'apo legilative quarters construction', date: 'april 28, 2016', task_status: 'in progress' },
        {id: 3, task_name: 'conduct feasibility study', project_name: 'apo legilative quarters construction', date: 'april 28, 2016', task_status: 'in progress' },
    ]
  return (
    <div className=' xbg-whitex'>
        <div className='schedule my-3 xxtxt-darkblue3 font-bold'>
            My Tasks
        </div>
        {tasks.map(e=>
        { var status_cn;
            if(e.statusx === 'finished'){status_cn = 'capitalize xpass rounded-lg text-xs p-1 px-2'}
            else{status_cn = 'capitalize xwarn rounded-lg text-xs p-1 px-2'}
            
            return(
            <div key = {e.id} className='bg-whitex rounded mb-2 font-face-gm shadow-lg'>
                <div className='p-2 border-b border-blue-900'>
                    <div className='font-bold capitalize'>{e.task_name}</div>
                    <div className='txt-greyed-out capitalize text-xs'>{e.project_name}</div>
                </div>
                <div className=' p-2'>
                    <div className='text-sm txt-greyed-out relative w-full'>
                        <span><FontAwesomeIcon icon={['far','calendar']}/> {e.date}</span>
                        <span className='xpl-24 absolute right-0'><span className={status_cn}>{e.task_status}</span></span>
                    </div>
                </div>
            </div>
            
        )})}
        
    </div>
  )
}
