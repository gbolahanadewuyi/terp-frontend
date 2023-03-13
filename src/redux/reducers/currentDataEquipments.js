
const currentDataDefultState = {
    id: 0
   }
const currentDataEquipments = (state = currentDataDefultState, action) =>{
    switch (action.type){
        case 'SET_DATA_EQUIPMENT':
            return {...state, ...action.currentData};
        default:
            return state;
    }
}

export default currentDataEquipments;