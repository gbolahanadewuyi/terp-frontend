import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Logo from '../assets/images/logo.png';
// import LogoDark from '../../images/logo-dark.png';
import CurrentAuth from './CurrentAuth';

// redux
import {useSelector, useDispatch} from 'react-redux'
import {setAuthSignUp} from '../redux/actions/setCurrentAuthPage'


export default function AuthPage({setUserInfo}) {

  //   redux variables
  const currentAuthPage = useSelector(state => state.currentAuthPage);
  const dispatch = useDispatch();

  return( 
 

        <CurrentAuth setUserInfo={setUserInfo}/>
      
  
  );
}
