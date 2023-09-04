


// for estimation
export const updateEstimation = (updatedEstimation) => {
    return {
        type: 'UPDATE_ESTIMATION',
        payload: updatedEstimation
    }
}

export const resetCurrEstimation = () => {
    return {
        type: 'RESET_ESTIMATION',
        payload: {
            title: "",
            company: "",
            deadline: "1 month",
            cost: 0,
            description: "",
            tags: [],
            tasks: [],
            RequestTasks: [],
            extraCost: 0
        }
    }
}

// for tasks
export const updateCurrTask = (task) => {
    return {
        type: 'UPDATE_CURR_TASK',
        payload: task
    }
}

export const resetCurrTask = () => {
    return {
        type: 'RESET_CURR_TASK',
        payload: {
            name: "",
            description: "",
            cost: 0,
            Employees: [],
            tags: [],
        }
    }
}

// for profile
export const updateCurrProfile = (profile) => {
    return {
        type: 'UPDATE_USER_PROFILE',
        payload: profile
    }
}

export const updateRequest = (request) => {
    return {
        type: 'UPDATE_REQUEST',
        payload: request
    }
}


export const updateRequests = (requests) => {
    return {
        type: 'UPDATE_REQUESTS',
        payload: requests

// for comments
export const updateComments = (comments) => {
    return {
        type: 'UPDATE_COMMENTS',
        payload: comments

    }
}