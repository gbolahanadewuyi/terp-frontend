
const currentDataDefultState = { 
    id:0,
     name: '',
      client: '', 
      statusx: '', 
      payment_balance: 0, 
      wallet_amount: 0, 
      progress: '',
      expense:[ {id:1, expense: 'Repair of Grinding and Shredding Equipment', amount: "972,231.00", date: '28 Feb 2021', category: "Cleaning & Maintenance"}]
}
const currentDataProjects = (state = currentDataDefultState, action) =>{
    switch (action.type){
        case 'SET_DATA_PROJECT':
            return {...state, ...action.currentData};
        default:
            return state;
    }
}

export default currentDataProjects;