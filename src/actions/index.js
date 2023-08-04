export const increment = (num) => {
    return {
        type: 'INCREMENT',
        payload: num
    }

}

export const decrement = (num) => {
    return {
        type: 'DECREMENT',
        payload: num
    }

}


// for adding estimation
export const updateEstimation = (updatedEstimation) => {
    return {
        type: 'UPDATE_ESTIMATION',
        payload: updatedEstimation
    }
}


// for tasks


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