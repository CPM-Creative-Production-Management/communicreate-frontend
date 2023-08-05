const userProfileReducer = (state = {

    "id": 99,
    "type": 99,
    "name": "",
    "address": "",
    "phone": "",
    "email": "",
    "associatedId": null,
    "association": {
        "id": null,
        "name": "",
        "description": "",
        "address": null,
        "phone": null,
        "email": null,
        "website": null,
        "logo": null
    }

}, action) => {
    switch (action.type) {
        case 'UPDATE_USER_PROFILE':
            return action.payload

        default:
            return state
    }


}

export default userProfileReducer