const initialState = {
    Message: '',
    Status: '',
    PostOffice: [],
    isLoading: false,
    ErrorMessage: '',
    errorStatus: false
}


const AddressReducer = (state = initialState, action) => {
    switch(action.type) {
        case 'LIST_ADDRESSES':
        return {...state, Message: action.addresses.Message, Status: action.addresses.Status, PostOffice: action.addresses.PostOffice, errorStatus: false}
        
        case 'ERROR':
            return {...state, ErrorMessage: action.message, errorStatus: true}

        case 'SHOW_LOADING':
            return {...state, isLoading: true}
        
        case 'HIDE_LOADING':
            return {...state, isLoading: false}
        
        case 'HIDE_ERROR':
            return {...state, errorStatus: false}
    }

    return state;
    
}

export default AddressReducer;