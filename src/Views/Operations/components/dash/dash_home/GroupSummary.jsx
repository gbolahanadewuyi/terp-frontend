import React from 'react';
import FolderSVG from '../../../../../assets/icons/dash-home/FolderSVG';
import BidsSVG from '../../../../../assets/icons/dash-home/BidsSVG';
import GroupSummaryMobileCarousel from './GroupSummaryMobileCarousel';
// import TasksSVG from '../../../../icons/dash-home/TasksSVG';

export default function GroupSummary({datasummary}) {
  return (
    <>
    <div className="group-of-three-container || grid grid-cols-4 gap-4 mb-1 hidden lg:grid">
      <div className='group-summary-inner bg-whitex col-span-4 md:col-span-2 lg:col-span-1 rounded p-3 shadow || grid grid-cols-7'>
        <div className='col-span-2 p-3 rounded-lg xwarn svgx'>
          <FolderSVG classx='stroke-current w-full h-full'/>
        </div>
        <div className='col-span-5 group-summary-item'>
          <div className='big-textx'>
           {datasummary?.ongoingProjectsCount}
          </div>
          <div className='text-sm small-textx'>
            Ongoing Projects
          </div>
        </div>
      </div>
      <div className='group-summary-inner bg-whitex col-span-4 md:col-span-2 lg:col-span-1 rounded p-3 shadow || grid grid-cols-7'>
        <div className='col-span-2 p-3 rounded-lg xpass svgx'>
          <FolderSVG classx='stroke-current w-full h-full'/>
        </div>
        <div className='col-span-5 group-summary-item'>
          <div className='big-textx'>
            {datasummary?.completedProjectsCount}
          </div>
          <div className='text-sm small-textx'>
            Completed Projects
          </div>
        </div>
      </div>
      <div className='group-summary-inner bg-whitex col-span-4 md:col-span-2 lg:col-span-1 rounded p-3 shadow || grid grid-cols-7'>
        <div className='col-span-2 p-3 rounded-lg xwarn svgx'>
          <BidsSVG classx='stroke-current w-full h-full'/>
        </div>
        <div className='col-span-5 group-summary-item'>
          <div className='big-textx'>
            {datasummary?.pendingBidsCount}
          </div>
          <div className='text-sm mb-0 pb-0 small-textx'>
            Pending Bids
          </div>
        </div>
      </div>
      <div className='group-summary-inner bg-whitex col-span-4 md:col-span-2 lg:col-span-1 rounded p-3 shadow || grid grid-cols-7'>
        <div className='col-span-2 p-3 rounded-lg xpass svgx'>
          <BidsSVG classx='stroke-current w-full h-full'/>
        </div>
        <div className='col-span-5 group-summary-item'>
          <div className='big-textx'>
           {datasummary?.approvedBidsCount}
          </div>
          <div className='text-sm mb-0 pb-0 small-textx'>
            Approved Bids
          </div>
        </div>
      </div>
    </div>

    <div className='lg:hidden block'>
      <GroupSummaryMobileCarousel datasummary={datasummary}/>
    </div>
    </>
  )
}
