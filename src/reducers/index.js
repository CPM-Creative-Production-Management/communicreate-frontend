import currEstimationReducer from "./currEstimation";
import currTaskAddingReducer from "./currTaskAdding";
import userProfileReducer from "./userProfile";


import { combineReducers } from "redux";

const allReducers = combineReducers({
    currEstimation: currEstimationReducer,
    currTask: currTaskAddingReducer,

    userProfile: userProfileReducer,

});

export default allReducers;