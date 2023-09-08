


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
            deadline: "",
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

// request
export const updateRequest = (request) => {
    return {
        type: 'UPDATE_REQUEST',
        payload: request
    }
}

export const resetRequest = () => {
    return {
        type: 'RESET_REQUEST',
        payload: {
            name: "",
            description: "",
            response_deadline: "",
            complete_deadline: "",
            tasks: [],
        }
    }
}

export const resetRequests = () => {
    return {
        type: 'RESET_REQUESTS',
        payload: []
    }
}

export const updateRequests = (requests) => {
    return {
        type: 'UPDATE_REQUESTS',
        payload: requests
    }
}

// for comments
export const updateComments = (comments) => {
    return {
        type: 'UPDATE_COMMENTS',
        payload: comments

    }
}

export const updateArchives = (archives) => {
    return {
        type: 'UPDATE_ARCHIVES',
        payload: archives
    }
}

export const resetArchives = () => {
    return {
        type: 'RESET_ARCHIVES',
        payload: []
    }
}

export const updateEstimations = (estimations) => {
    return {
        type: 'UPDATE_ESTIMATIONS',
        payload: estimations
    }
}

export const resetEstimations = () => {
    return {
        type: 'RESET_ESTIMATIONS',
        payload: []
    }
}
