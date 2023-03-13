import React, {useState} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import dummy_user from '../../../../assets/images/dummy.jpg';
import EmailIcon from '../../../../assets/icons/dash-header/EmailIcon';
import SendMail from '../modals/SendEmail';
import MenuIcon from '../../../../assets/icons/dash-sidepanel/MenuIcon';
import HeaderDropdown from './HeaderDropdown';
import user from '../../../../tempDb/user';
// import plus_image from '../../../images/plus-icon.png'


export var userx ={ 
  name:"James Ajebola", 
image: dummy_user,
amountx: 20000,
total_amountx: 20000
}

export default function DashHeader(props) {

  const [showMail, setShowMail] = useState("hidden");
  const [showDropdown, setShowDropdown] = useState("hidden");
  const [dropdown_activated, setDropdownActivated] = useState("");

  const handleShowMail = () => {
    if(showMail === "hidden"){ setShowMail("") }
    else{setShowMail("hidden")};
  }

    function openNav(){
      console.log(document.getElementsByClassName("sidepanel")[0].style.width);
      document.getElementsByClassName("sidepanel")[0].style.width = '240px';
      document.querySelector(".sidepanel div").style.display = "block"
    }
    
    function toggleDropdown(){

      if(showDropdown === "hidden"){ 
        setShowDropdown("");
        setDropdownActivated("bg-gray-300");
      }
      else{
        setShowDropdown("hidden");
        setDropdownActivated("");
    };
    }
  

  return (
    <>
      <SendMail show={showMail} handleShow={handleShowMail}/>
      <div className="headr bg-whitex flex lg:pr-4">
        <div className="my-auto ml-4 lg:hidden" onClick={openNav}><MenuIcon classx="stroke-current txt-bluex"/></div>
        <div className='my-auto text-lg pl-3 font-bold txt-headr hidden md:block'>
          {props.title}
        </div>
        <div className='txt-dark-bluex-v2 ml-auto mr-3 my-auto flex h-full align-middle py-4'>
          <span className='pr-10 relative top-1 hidden md:block'><button onClick={handleShowMail}><EmailIcon classx='fill-current'/></button></span>
          <span className='pr-10 relative top-1 hidden md:block'><FontAwesomeIcon icon={['fas', 'bell']}/></span>
          <span className='inline-flex relative'>
            <span className='pr-2 pl-10 cborder md:border-l-2'>
              {user.name}
            </span>
            <span className="w-8 h-8 bg-cover rounded-md mr-0">
              <img src={user.image} alt='' className="h-full w-full overflow-hidden object-cover rounded-full border-2 border-white" />
            </span>
            <div className={`my-auto ml-2 hover:bg-gray-300 px-1 ${dropdown_activated}`} onClick={toggleDropdown}>
              <FontAwesomeIcon icon={["fas", "ellipsis-v"]} />
            </div>
            <HeaderDropdown handleShowMail={handleShowMail} toggleDropdown={toggleDropdown} showDropdown={showDropdown}/>

          </span>
        </div>

      </div>
    </>
  );
}
