
const currentDataDefultState = {test: 'test'}
const currentData = (state = currentDataDefultState, action) =>{
    switch (action.type){
        case 'SET_DATA':
            return {...state, ...action.currentData};
        default:
            return state;
    }
}

export default currentData;