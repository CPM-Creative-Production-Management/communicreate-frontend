


// for adding estimation
export const updateEstimation = (updatedEstimation) => {
    return {
        type: 'UPDATE_ESTIMATION',
        payload: updatedEstimation
    }
}


// for tasks
export const updateCurrTask = (task) => {
    return {
        type: 'UPDATE_CURR_TASK',
        payload: task
    }
}

// for profile
export const updateCurrProfile = (profile) => {
    return {
        type: 'UPDATE_USER_PROFILE',
        payload: profile
    }
}



export const addTask = (task) => {
    return {
        type: 'ADD',
        payload: task
    }

}

export const updateTask = (index, item) => {
    return {
        type: 'UPDATE',
        index: index,
        item: item
    }

}

export const deleteTask = (index) => {
    return {
        type: 'DELETE',
        index: index
    }
}