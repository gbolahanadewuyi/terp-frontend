import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default function CalenderWidget() {
  return (
    <div className='weekly-calender-widget h-24 rounded p-1'>
        <div className='text-center pb-2'>
            <FontAwesomeIcon icon={['fas', 'angle-left']}/><span className='mx-5'>23 - 28 November 2021</span><FontAwesomeIcon icon={['fas', 'angle-right']}/>
        </div>
        <div className='grid grid-cols-7 gap-3 text-center'>
            <div className='text'>
            <div className='font-light text-gray-500'>M</div>
            <div className='font-bold'>22</div>
            </div>
            <div className='bg-bluex text-white rounded'>
            <div className=''>T</div>
            <div className=''>23</div>
            </div>
            <div>
            <div className='font-light text-gray-500'>W</div>
            <div className='font-bold'>24</div>
            </div>
            <div>
            <div className='font-light text-gray-500'>T</div>
            <div className='font-bold'>25</div>
            </div>
            <div>
            <div className='font-light text-gray-500'>F</div>
            <div className='font-bold'>26</div>
            </div>
            <div>
            <div className='font-light text-gray-500'>S</div>
            <div className='font-bold'>27</div>
            </div>
            <div>
            <div className='font-light text-gray-500'>S</div>
            <div className='font-bold'>28</div>
            </div>
        </div>
    </div>
  )
}
