import React from 'react';
import FolderSVG from '../../../../../assets/icons/dash-home/FolderSVG';
import BidsSVG from '../../../../../assets/icons/dash-home/BidsSVG';
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
  
  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3,
      slidesToSlide: 3 // optional, default to 1.
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
      slidesToSlide: 2 // optional, default to 1.
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
      slidesToSlide: 1 // optional, default to 1.
    }
  };

export default function GroupSummaryMobileCarousel() {
  return (
  <Carousel responsive={responsive}>
      <div className='group-summary-inner bg-whitex col-span-4 md:col-span-2 lg:col-span-1 rounded p-3 shadow || grid grid-cols-7'>
        <div className='col-span-2 p-3 rounded-lg xwarn svgx'>
          <FolderSVG classx='stroke-current w-full h-full'/>
        </div>
        <div className='col-span-5 group-summary-item'>
          <div className='big-textx'>
            30
          </div>
          <div className='text-sm small-textx'>
            Ongoing Projects
          </div>
        </div>
      </div>
      <div className='group-summary-inner bg-whitex col-span-4 md:col-span-2 lg:col-span-1 rounded p-3 shadow || grid grid-cols-7 ml-4'>
        <div className='col-span-2 p-3 rounded-lg xpass svgx'>
          <FolderSVG classx='stroke-current w-full h-full'/>
        </div>
        <div className='col-span-5 group-summary-item'>
          <div className='big-textx'>
            108
          </div>
          <div className='text-sm small-textx'>
            Completed Projects
          </div>
        </div>
      </div>
      <div className='group-summary-inner bg-whitex col-span-4 md:col-span-2 lg:col-span-1 rounded p-3 shadow || grid grid-cols-7 ml-4'>
        <div className='col-span-2 p-3 rounded-lg xwarn svgx'>
          <BidsSVG classx='stroke-current w-full h-full'/>
        </div>
        <div className='col-span-5 group-summary-item'>
          <div className='big-textx'>
            10
          </div>
          <div className='text-sm mb-0 pb-0 small-textx'>
            Pending Bids
          </div>
        </div>
      </div>
      <div className='group-summary-inner bg-whitex col-span-4 md:col-span-2 lg:col-span-1 rounded p-3 shadow || grid grid-cols-7 ml-4'>
        <div className='col-span-2 p-3 rounded-lg xpass svgx'>
          <BidsSVG classx='stroke-current w-full h-full'/>
        </div>
        <div className='col-span-5 group-summary-item'>
          <div className='big-textx'>
            52
          </div>
          <div className='text-sm mb-0 pb-0 small-textx'>
            Approved Bids
          </div>
        </div>
      </div>
  </Carousel>
    
  )
}