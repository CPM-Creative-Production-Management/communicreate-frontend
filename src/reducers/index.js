import counterReducer from "./counter";
import loggedReducer from "./isLogged";
import currEstimationReducer from "./currEstimation";
import currTaskAddingReducer from "./currTaskAdding";
import userProfileReducer from "./userProfile";


import { combineReducers } from "redux";

const allReducers = combineReducers({
    counter: counterReducer,
    isLogged: loggedReducer,
    currEstimation: currEstimationReducer,
    currTask: currTaskAddingReducer,

    userProfile: userProfileReducer,

});

export default allReducers;