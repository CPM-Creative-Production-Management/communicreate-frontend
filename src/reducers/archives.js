const archivesReducer = (state = [], action) => {
    switch (action.type) {
        case 'UPDATE_ARCHIVES':
        return action.payload
    
        case 'RESET_ARCHIVES':
        return action.payload
    
        default:
        return state
    }
}

export default archivesReducer