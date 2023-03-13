
const currentDataDefultState = {
    id: 0,
    company_name: "",
    rc: 0,
    email: "",
    address: "",
    contact: "",
    reg_status: ""
   }
const currentDataCompanies = (state = currentDataDefultState, action) =>{
    switch (action.type){
        case 'SET_DATA_COMPANY':
            return {...state, ...action.currentData};
        default:
            return state;
    }
}

export default currentDataCompanies;