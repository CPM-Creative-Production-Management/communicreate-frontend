const requestsReducer = (state = [], action) => {
    switch (action.type) {
        case 'UPDATE_REQUESTS':
            // console.log('updating requests')
            return action.payload

        case 'RESET_REQUESTS':
            // console.log('resetting requests')
            return action.payload

        default:
            return state
    }
}

export default requestsReducer