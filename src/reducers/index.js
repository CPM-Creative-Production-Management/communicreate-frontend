import currEstimationReducer from "./currEstimation";
import currTaskAddingReducer from "./currTaskAdding";
import userProfileReducer from "./userProfile";
import currRequestReducer from "./currRequest";

import requestsReducer from "./requests";
import archivesReducer from "./archives";
import commentReducer from "./comments";


import { combineReducers } from "redux";

const allReducers = combineReducers({
    currEstimation: currEstimationReducer,
    currTask: currTaskAddingReducer,
    currRequest: currRequestReducer,
    userProfile: userProfileReducer,
    requests: requestsReducer,
    comments: commentReducer,
    archives: archivesReducer,
});

export default allReducers;