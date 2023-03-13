
const currentDataDefultState = {
        id: 1,
        name: "",
        mode: "",
        location: "",
        status: "",
        initiated_by: "",
        date: ""
    }
const currentDataMeetings = (state = currentDataDefultState, action) =>{
    switch (action.type){
        case 'SET_DATA_MEETING':
            return {...state, ...action.currentData};
        default:
            return state;
    }
}

export default currentDataMeetings;