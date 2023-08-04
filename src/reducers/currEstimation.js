const currEstimationReducer = (state = {
    "title": "Estimation 1",
    "description": "Estimation 1 description",
    "company": "Company 1",
    "cost": 20000,
    "deadline": "2023-09-24",
    "ReqAgencyId": 3,
    "tasks": [
        {
            "name": "Logo Illustration",
            "description": "A logo with the letter B",
            "cost": 5000,
            "tags": [
                {id: 1, name: 'tag1'},
                {id: 2, name: 'tag2'},
            ],

            "Employees": [
                {
                    "id": 1,
                    "name": "John Bonham",
                    "dob": "1948-05-31",

                    "text": "John Bonham",
                    "image": 'https://react.semantic-ui.com/images/avatar/small/jenny.jpg',

                    "address": "Led Zeppelin Headquarters",
                    "rating": 4,
                    "salary": 670,
                    "AgencyId": 1,
                    "EmployeeTasks": {
                        "createdAt": "2023-07-07T22:17:09.261Z",
                        "updatedAt": "2023-07-07T22:17:09.261Z",
                        "EmployeeId": 1,
                        "TaskId": 7
                    }
                },
            ]
        },
        {
            "name": "Logo Post GFX",
            "description": "Nothing too expensive",
            "cost": 1000,
            "tags": [
                {id: 1, name: 'tag231'},
                {id: 2, name: 'tagd2'},
            ],
            "Employees": [
                {
                    "id": 1,
                    "name": "bf Bonham",

                    "text": "dd Bonham",
                    "image": 'https://react.semantic-ui.com/images/avatar/small/jenny.jpg',

                    "dob": "1948-05-31",
                    "address": "Led Zeppelin Headquarters",
                    "rating": 4,
                    "salary": 670,
                    "AgencyId": 1,
                    "EmployeeTasks": {
                        "createdAt": "2023-07-07T22:17:09.261Z",
                        "updatedAt": "2023-07-07T22:17:09.261Z",
                        "EmployeeId": 1,
                        "TaskId": 7
                    }
                },
            ]
        }
    ]
}, action) => {
    switch (action.type) {

        case 'UPDATE_ESTIMATION':
            return action.payload

        default:
            return state
    }
}

export default currEstimationReducer