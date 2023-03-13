import React,{ useState } from 'react';
import PendingBidsTr from './PendingBidsTr';
import OngoingProjectsTr from './OngoingProjectsTr';

export default function HomeTableTab() {
    const [showOngoingProjects, setShowOngoingProjects] = useState("");
    const [showPendingBids, setShowPendingBids] = useState("hidden");
    const [OP, setOP] = useState("cursor-pointer mx-5 pb-2 active");
    const [PB, setPB] = useState("cursor-pointer mx-5 pb-2");


    const switch_to_OngoingProjects = () => {
        if(showOngoingProjects === "hidden"){ 
            setShowOngoingProjects("");
            setShowPendingBids("hidden"); 
            setOP('cursor-pointer mx-5 pb-2 active');
            setPB('cursor-pointer mx-5 pb-2');
        }
    }
    const switch_to_PendingBids = () => {
        if(showPendingBids === "hidden"){ 
            setShowPendingBids(""); 
            setShowOngoingProjects("hidden");
            setOP('cursor-pointer mx-5 pb-2');
            setPB('cursor-pointer mx-5 pb-2 active');
        }
    }


  return (
    <div className='bg-whitex rounded mt-2 overflow-hidden shadow-lg'>
        <div className='ongiong-pending-tab h-14 p-2 xpb-5'>
            <span onClick={switch_to_OngoingProjects} className={OP}>Ongoing Projects</span>
            <span onClick={switch_to_PendingBids} className={PB}>Bids</span>
        </div>
        <OngoingProjectsTr showr={showOngoingProjects}/>
        <PendingBidsTr showr={showPendingBids}/>
    </div>
  )
}
