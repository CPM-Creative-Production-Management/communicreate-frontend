import counterReducer from "./counter";
import loggedReducer from "./isLogged";
import currEstimationReducer from "./currEstimation";

import { combineReducers } from "redux";

const allReducers = combineReducers({
    counter: counterReducer,
    isLogged: loggedReducer,
    currEstimation: currEstimationReducer,

});

export default allReducers;