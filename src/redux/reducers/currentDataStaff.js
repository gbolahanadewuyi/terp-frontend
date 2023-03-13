
// const currentDataDefultState = { "id": "", "vendor_name": "Kulas Group", "address": "640 Steensland Center", "contact": "+54 418 881 7772", "email": "hgwin0@pagesperso-orange.fr", "type": "Music" }
const currentDataDefultState = { "role": "", "department": "", "salary": "", }
// const currentDataDefultState = {}

const currentDataStaff = (state = currentDataDefultState, action) => {
    switch (action.type) {
        case 'SET_DATA_STAFF':
            return { ...state, ...action.currentData };
        case 'SET_EDIT_STAFF':
            return { ...state, ...action.currentData };
        default:
            return state;
    }
}

export default currentDataStaff;