import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export default function WeeklySchedule() {
    var eventsx = [
        {id: 2, name: 'Staff Meeting', date: 23, day: 'Mon', time: '11:20 AM', location: 'Conference Hall', },
        {id: 2, name: 'CI/Cd Implementation', date: 24, day: 'Tue', time: '01:34 PM',  location: 'Conference Hall', },
        {id: 2, name: 'Velocity Global Check-in', date: 25, day: 'Wed', time: '09:00 AM', location: 'Skype', },
        {id: 2, name: 'Staff Meeting', date: 26, day: 'Thurs', time: '09:00 AM', location: 'Conference Hall'}
      ]
  return (
    <div className=' xbg-whitex'>
        <div className='schedule my-3 xxtxt-darkblue3 font-bold'>
            Weekly Schedule
        </div>
        {eventsx.map(e=>(
            <div key = {e.id} className='bg-whitex rounded p-2 mb-2 text-green-700 font-face-gm'>
            <div className='inline-block p-2 text-center rounded-lg bg-green-100 text-lg w-16'>
                <div className='font-bold'>{e.date}</div>
                <div>{e.day}</div>
            </div>
            <div className='inline-block ml-3 min-w-[70%]'>
                <div className='text-lg text-left'>
                {e.name}
                </div>
                <div className='text-sm text-left text-gray-400 mt-2 relative'>
                <span><FontAwesomeIcon icon={['fas','map-marker-alt']} className='text-green-700'/> {e.location}</span>
                <span className='xpl-24 absolute right-0'><FontAwesomeIcon icon={['far','clock']} className='text-green-700'/> {e.time}</span>
                </div>
            </div>
            </div>
            
        ))}
        
    </div>
  )
}
