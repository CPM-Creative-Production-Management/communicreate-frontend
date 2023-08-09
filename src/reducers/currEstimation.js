const currEstimationReducer = (state = {
    title: "",
    company: "",
    deadline: "",
    cost: 0,
    description: "",
    tags: [],
    tasks: [],
}, action) => {
    switch (action.type) {

        case 'UPDATE_ESTIMATION':
            return action.payload

        case 'RESET_ESTIMATION':
            return action.payload
        default:

            return state
    }
}

export default currEstimationReducer