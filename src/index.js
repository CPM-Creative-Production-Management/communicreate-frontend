import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {BrowserRouter} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'semantic-ui-css/semantic.min.css'

import {createStore} from 'redux'
import allReducers from "./reducers";
import {Provider} from "react-redux";   // makes the store available to all components in the app

// need to store a currentEstimation object having all the tasks and details
const store = createStore(allReducers,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())


// STORE -> Global State

// ACTION

// REDUCER -> Modifies the store based on ACTION

// DISPATCH -> Sends ACTION to REDUCER


export const base_url = 'https://cpm-backend.onrender.com/'

// export const base_url = 'https://75c0-59-153-103-227.ngrok-free.app/'
// export const base_url = 'http://localhost:3000/'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Provider store={store}>
        <BrowserRouter>
            <App/>
        </BrowserRouter>
    </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
