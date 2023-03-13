import React from 'react';
// import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

// redux
import {useDispatch} from 'react-redux';
import {setAuthLogin, setAuthPasswordReset} from '../../redux/actions/setCurrentAuthPage';

export default function ForgotPassword(props) {

  //   redux variables
  const dispatch = useDispatch();

  return( 
 
    <div className={`col-span-3 md:col-span-2 p-5 md:px-28 px-10 my-auto lg:mt-24 ${props.show}`}>
        <h1 className='p-2 pl-0 text-3xl text-left'>Forgot Password ?</h1>
        <h4 className='pl-0 text-left'>No worries, we’ll send you reset instructions</h4>
        <form className='grid grid-cols-2 gap-5 mt-10'>
          <div className="col-span-2 text-left">
              <label className='text-sm' htmlFor="login-email">Email Address</label><br></br>
              <span className='absolute z-10 py-4 pl-3'><FontAwesomeIcon icon={["far", "envelope"]} /></span>
              <input type="email" className="pl-10 appearance-none border rounded w-full py-2 px-3 text-blue-700 bg-gray-100 mt-2 focus:outline-none focus:shadow-outline " placeholder="Enter your email" id='login-email' name='login-email'/>
          </div>
          
          <a className="p-3 bg-blue-500 text-white text-center rounded" href="#" onClick={()=>{dispatch(setAuthPasswordReset())}}>Resend Reset Link</a>
          <a name="signin-btn" id="signin-btn" className="border border-blue-900 text-center p-2" href="#" onClick={()=>{dispatch(setAuthLogin())}} >Go back to Login</a>
        </form>
    </div>
  );
}
