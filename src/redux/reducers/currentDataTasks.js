
const currentDataDefultState = {
    id: 0,
    task_name: '', 
    project: '', 
    initiator: '', 
    assigned_to: '', 
    due_date: '', 
    statux: ''
}
const currentDataTasks = (state = currentDataDefultState, action) =>{
    switch (action.type){
        case 'SET_DATA_TASK':
            return {...state, ...action.currentData};
        default:
            return state;
    }
}

export default currentDataTasks;