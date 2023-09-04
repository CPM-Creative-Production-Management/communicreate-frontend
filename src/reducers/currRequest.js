const currRequestReducer = (state = {
    name : "",
    description: "",
    complete_deadline: "",
    response_deadline: "",
    tasks: [],
}, action) => {
    switch (action.type) {
        case 'UPDATE_REQUEST':
            return action.payload

        case 'RESET_REQUEST':
            return action.payload

        default:
            return state
    }
}

export default currRequestReducer