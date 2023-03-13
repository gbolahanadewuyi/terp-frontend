
const currentDataDefultState = {
    "id":6,"vendor_name":"Ratke, Cole and Langosh",
    "address":"77 Twin Pines Plaza",
    "contact":"+1 315 361 0144",
    "email":"rcolegrove5@woothemes.com",
    "type":"Movies"
}

const currentDataVendors = (state = currentDataDefultState, action) =>{
    switch (action.type){
        case 'SET_DATA_VENDOR':
            return {...state, ...action.currentData};
        default:
            return state;
    }
}

export default currentDataVendors;