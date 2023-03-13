import { useState } from 'react';

export default function useToken() {
 
    const getUserInfo = () => {
        const userInfoObject = localStorage.getItem('user')
        const userInfo = JSON.parse(userInfoObject);
        console.log('get user info is', userInfo)
        return userInfo;
    }

    
    const [user, setUserInfo] = useState(getUserInfo);
    const saveUserInfo = userInfo => {
        console.log(userInfo)
        localStorage.setItem('user', JSON.stringify(userInfo));
        setUserInfo(userInfo)
    }
    

    return {
        setUserInfo: saveUserInfo,
        user
    }
}