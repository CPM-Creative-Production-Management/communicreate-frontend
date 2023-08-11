const currEstimationReducer = (state = {
    title: "",
    company: "",
    deadline: "1 month",
    cost: 0,
    description: "",
    ReqAgencyId: null,
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