const estimationsReducer = (state = [], action) => {
    switch (action.type) {
        case 'UPDATE_ESTIMATIONS':
            return action.payload

        case 'RESET_ESTIMATIONS':
            return action.payload

        default:
            return state
    }
}

export default estimationsReducer