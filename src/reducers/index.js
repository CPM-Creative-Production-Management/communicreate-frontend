import currEstimationReducer from "./currEstimation";
import currTaskAddingReducer from "./currTaskAdding";
import userProfileReducer from "./userProfile";
import currRequestReducer from "./currRequest";
import commentReducer from "./comments";

import { combineReducers } from "redux";

const allReducers = combineReducers({
    currEstimation: currEstimationReducer,
    currTask: currTaskAddingReducer,
    currRequest: currRequestReducer,
    userProfile: userProfileReducer,

    comments: commentReducer,

});

export default allReducers;