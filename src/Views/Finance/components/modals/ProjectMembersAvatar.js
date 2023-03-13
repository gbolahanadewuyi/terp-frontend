import React, {useState, useEffect} from 'react';
import plus_image from '../../images/plus-icon.png'




export default function ProjectMembersAvatar() {

    const [av_images, setav_Images] =useState([
        "https://tuk-cdn.s3.amazonaws.com/assets/components/avatars/a_4_0.png", 
        "https://tuk-cdn.s3.amazonaws.com/assets/components/avatars/a_4_0.png", 
        "https://tuk-cdn.s3.amazonaws.com/assets/components/avatars/a_4_0.png"
    ]);

    return (
        <>
            <div className="px-6 flex items-center flex-no-wrap">
               { av_images.map(avatar_image =>
                   ( <div className="w-12 h-12 bg-cover rounded-md -ml-2">
                        <img src={avatar_image} alt="image_missing" className="h-full w-full overflow-hidden object-cover rounded-full border-2 border-white xdark:border-gray-700 shadow" />
                    </div>)
                )}
                <div className="w-12 h-12 bg-cover rounded-md -ml-2 xsvg-container">
                    <img src={plus_image} alt="image_missing" className="h-full w-full overflow-hidden object-cover rounded-full border-2 border-white xdark:border-gray-700 shadow" />
                    {/* <svg fill="#000000" xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 24 24" width="96px" height="96px"><path d="M 12 2 C 6.4889971 2 2 6.4889971 2 12 C 2 17.511003 6.4889971 22 12 22 C 17.511003 22 22 17.511003 22 12 C 22 6.4889971 17.511003 2 12 2 z M 12 4 C 16.430123 4 20 7.5698774 20 12 C 20 16.430123 16.430123 20 12 20 C 7.5698774 20 4 16.430123 4 12 C 4 7.5698774 7.5698774 4 12 4 z M 11 7 L 11 11 L 7 11 L 7 13 L 11 13 L 11 17 L 13 17 L 13 13 L 17 13 L 17 11 L 13 11 L 13 7 L 11 7 z"/></svg> */}
                </div>
            </div>
        </>
    );
}
