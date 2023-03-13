import React from 'react';

// redux
import {useDispatch} from 'react-redux';
import {setAuthLogin} from '../../redux/actions/setCurrentAuthPage';

export default function PasswordResetConfirmation() {
  
  //   redux variables
  const dispatch = useDispatch();

  return( 

      <div className="col-span-3 md:col-span-2 p-5 md:px-28 px-10 my-auto">
          <h1 className='p-2 pl-0 text-3xl text-left'>New Password Set</h1>
          <h4 className='pl-0 text-left mb-10'>Your password has been successfully set</h4>
          
            <a name="login-btn" id="login-btn" className="p-3 bg-blue-500 text-white text-center rounded mt-10 w-full px-10" href="#" role="submit" onClick={()=>{dispatch(setAuthLogin())}}>Go back to Login</a>
            
      </div>
  );
}
