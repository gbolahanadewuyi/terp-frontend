
const currentDataDefultState = {
    id: 0,
    name: '', 
    TRF: '', 
    client: '', 
    winning_company: '', 
    statusx: '', 
    date_submitted: '',
    bidding_companies:[''],
    uploaded_files:['']
}
const currentDataBids = (state = currentDataDefultState, action) =>{
    switch (action.type){
        case 'SET_DATA_BID':
            return {...state, ...action.currentData};
        default:
            return state;
    }
}

export default currentDataBids;