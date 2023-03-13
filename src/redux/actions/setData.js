export const setData = (details)=> {
    return {
        type: 'SET_DATA',
        currentData: {
            ...details
        }
    };
}
export const setDataProject = (details)=> {
    return {
        type: 'SET_DATA_PROJECT',
        currentData: {
            ...details
        }
    };
}
export const setDataBid = (details)=> {
    return {
        type: 'SET_DATA_BID',
        currentData: {
            ...details
        }
    };
}
export const setDataCompany = (details)=> {
    return {
        type: 'SET_DATA_COMPANY',
        currentData: {
            ...details
        }
    };
}
export const setDataTask = (details)=> {
    return {
        type: 'SET_DATA_TASK',
        currentData: {
            ...details
        }
    };
}
export const setDataEquipment = (details)=> {
    return {
        type: 'SET_DATA_EQUIPMENT',
        currentData: {
            ...details
        }
    };
}
export const setDataMeeting = (details)=> {
    return {
        type: 'SET_DATA_MEETING',
        currentData: {
            ...details
        }
    };
}
export const setDataStaff = (details)=> {
    return {
        type: 'SET_DATA_STAFF',
        currentData: {
            ...details
        }
    };
}

export const setEditStaff = (details)=> {
    return {
        type: 'SET_EDIT_STAFF',
        currentData: {
            ...details
        }
    };
}


export const setDataVendor = (details)=> {
    return {
        type: 'SET_DATA_VENDOR',
        currentData: {
            ...details
        }
    };
}
export const setDataExpense = (details)=> {
    return {
        type: 'SET_DATA_EXPENSE',
        currentData: {
            ...details
        }
    };
}



// auth page change
export const setAuthSignUp = ()=>{ return {type:'SIGNUP'};};
export const setAuthForgotPass= ()=>{ return {type:'FORGOT_PASSWORD'};};
export const setAuthPasswordReset = ()=>{ return {type:'PASSWORD_RESET'};};
export const setAuthResetConfirmation = ()=>{ return {type:'RESET_CONFIRMATION'};};
export const setAuthLogin = ()=>{ return {type:'LOGIN'};};