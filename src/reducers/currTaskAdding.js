const currTaskAddingReducer = (state = {
    name: "",
    description: "",
    cost: 0,
    Employees: [],
    tags: [],
}, action) => {
    switch (action.type) {
        case 'UPDATE_CURR_TASK':
            return action.payload

        default:
            return state
    }
}

export default currTaskAddingReducer