


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
            description: "",
            tags: [],
            tasks: [],
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



