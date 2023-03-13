import React from 'react'

export default function LoadingScreen() {
  return (
    // <div className='h-screen loader-size grid place-items-center text-center'>
    <div className='h-screenw-screen loader-size grid place-items-center text-center'>
      <div>
        <div className='grid grid-cols-2 gap-2 loader-animation place-items-center h-12 w-12 mx-auto'>
          <div className='bg-bluex h-6 w-6 loader-top-left'></div>
          <div className='bg-bluex h-6 w-6 loader-top-right'></div>
          <div className='bg-bluex h-6 w-6 loader-bottom-left'></div>
          <div className='bg-bluex h-6 w-6 loader-bottom-right'></div>
        </div>
        <div className='pt-24'> 
          Loading... Please wait
        </div>
      </div>
    </div>
  )
}
