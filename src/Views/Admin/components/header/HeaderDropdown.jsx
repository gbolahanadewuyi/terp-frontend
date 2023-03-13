import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import EmailIcon from '../../../../assets/icons/dash-header/EmailIcon';
import DarkmodeToggleMobile from './DarkmodeToggleMobile';

export default function HeaderDropdown(props) {
  return (
    <ul className={`header-dropdown ${props.showDropdown}`}>
        <li className='md:hidden flex' onClick={props.handleShowMail}><EmailIcon classx='fill-current'/>Email</li>
        <li className='md:hidden block'><FontAwesomeIcon icon={['fas', 'bell']}/>Notification</li>
        <li className=''><DarkmodeToggleMobile/></li>
    </ul>
  )
}
