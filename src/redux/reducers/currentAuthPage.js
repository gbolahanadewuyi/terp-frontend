const currentAuthPage = (state = 'LOGIN', action) =>{
    switch (action.type){
        case 'LOGIN':
            return state ='LOGIN';
        case 'SIGNUP':
            return state ='SIGNUP';
        case 'FORGOT_PASSWORD':
            return state ='FORGOT_PASSWORD';
        case 'PASSWORD_RESET':
            return state ='PASSWORD_RESET';
        case 'RESET_CONFIRMATION':
            return state ='RESET_CONFIRMATION';
        default:
            return state;
    }
}
export default currentAuthPage;